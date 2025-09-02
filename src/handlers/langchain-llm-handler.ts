import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatOpenAI } from '@langchain/openai'
import { ChatGroq } from '@langchain/groq'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { LLM, LLMProviderEnum } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import { decryptSymmetric } from 'src/utils/aes'
import { OpenAISchema, OpenAPITool } from 'src/types/openai'

const llmInvoke = async (
  model: BaseChatModel,
  messages: BaseMessage[],
  {
    schemas,
    onMessageUpdate,
  }: {
    schemas?: OpenAISchema[]
    onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
  },
) => {
  let content = ''
  let lastChunk: BaseMessageChunk | undefined
  if (schemas?.length) {
    // Convert OpenAI schema format to Langchain's expected format
    const schema = schemas[0] // Use first schema for now
    const structuredLLM = model.withStructuredOutput(schema.schema)

    const streamResponse = await structuredLLM.stream(messages)

    for await (const data of streamResponse) {
      content = JSON.stringify(data)
      onMessageUpdate?.({ content: content })
    }
  } else {
    const streamResponse = await model.stream(messages)

    for await (const data of streamResponse) {
      content += `${data.content}`
      lastChunk = data
      onMessageUpdate?.({ content, chunk: data })
    }
  }
  return {
    lastChunk,
    content,
  }
}

/**
 * Non-hook version of langchain LLM handler that can be called anywhere
 */
export const langchainLLMHandler = {
  async stream(
    messages: BaseMessage[],
    info?: {
      schemas?: OpenAISchema[]
      tools?: OpenAPITool[]
      onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
      onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
      provider?: `${LLMProviderEnum}`
      llm?: LLM
      passphrase?: string // Allow passing passphrase directly to avoid UI dependencies
    },
  ) {
    const { schemas, onMessageUpdate, onMessageFinish } = info || {}

    // Get passphrase from parameter or secure session
    let passphrase = info?.passphrase
    if (!passphrase) {
      passphrase = (await secureSession.get('passphrase')) || undefined
      if (!passphrase) {
        throw new Error(
          'Passphrase is required. Either provide it as parameter, ensure it exists in secure session, or provide confirmPassphrase function.',
        )
      }
    }

    const encrypted = info?.llm?.encrypted
    const options = info?.llm?.options || ({} as Record<string, unknown>)
    if (!encrypted?.key || typeof encrypted.key !== 'string') {
      throw new Error('API Key is not found')
    }

    const apiKey = await decryptSymmetric(encrypted.key, passphrase)
    if (!apiKey) {
      throw new Error('API Key is not found')
    }

    let content = ''
    let lastChunk: BaseMessageChunk | undefined

    switch (info?.provider) {
      case LLMProviderEnum.GoogleGenerativeAI:
        {
          const model = new ChatGoogleGenerativeAI({
            apiKey,
            model: info?.llm?.name || 'gemini-1.5-flash',
            temperature: options?.temperature ? +options.temperature : undefined,
            topK: options?.topK ? +options.topK : undefined,
            topP: options?.topP ? +options.topP : undefined,
            stopSequences: options?.stop ? (options.stop as string[]) : undefined,
            maxOutputTokens: options?.maxTokens ? +options.maxTokens : undefined,
          })
          if (encrypted?.enabled_google_search_retrieval) {
            const searchRetrievalTool = {
              googleSearchRetrieval: {
                dynamicRetrievalConfig: {
                  mode: 'MODE_DYNAMIC', // Use Dynamic Retrieval
                  dynamicThreshold: 0.7, // Default for Dynamic Retrieval threshold
                },
              },
            }
            model.bindTools([searchRetrievalTool])
          }
          const result = await llmInvoke(model, messages, {
            schemas,
            onMessageUpdate,
          })
          content = result.content
          lastChunk = result.lastChunk
        }
        break
      case LLMProviderEnum.Groq:
        {
          const model = new ChatGroq({
            apiKey,
            model: info?.llm?.name || '',
            temperature: options?.temperature ? +options.temperature : undefined,
            stopSequences: options?.stop ? (options.stop as string[]) : undefined,
            maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
          })
          const result = await llmInvoke(model, messages, {
            schemas,
            onMessageUpdate,
          })
          content = result.content
          lastChunk = result.lastChunk
        }
        break
      case LLMProviderEnum.OpenAI:
        {
          const model = new ChatOpenAI({
            apiKey,
            model: info?.llm?.name,
            temperature: options?.temperature ? +options.temperature : undefined,
            topP: options?.topP ? +options.topP : undefined,
            stopSequences: options?.stop ? (options.stop as string[]) : undefined,
            maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
          })
          const result = await llmInvoke(model, messages, {
            schemas,
            onMessageUpdate,
          })
          content = result.content
          lastChunk = result.lastChunk
        }
        break
      default:
        throw new Error('Provider is not supported')
    }
    onMessageFinish?.({
      content,
      lastChunk,
    })
    return {
      lastChunk,
      content,
    }
  },
}
