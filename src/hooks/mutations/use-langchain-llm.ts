import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatOpenAI } from '@langchain/openai'
import { ChatGroq } from '@langchain/groq'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import secureSession from 'src/utils/secure-session'
import { decryptSymmetric } from 'src/utils/aes'
import { convertToZodSchema } from 'src/utils/schema-format'
import { useConfirmPassphrase } from './use-confirm-passphrase'

const llmInvoke = async (
  model: BaseChatModel,
  messages: BaseMessage[],
  {
    schemas,
    onMessageUpdate,
  }: {
    schemas?: Schema[]
    onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
  },
) => {
  let content = ''
  let lastChunk: BaseMessageChunk | undefined
  if (schemas?.length) {
    const schemaItems = schemas
      .filter((item) => item.schema_items?.length)
      .flatMap((schema) => schema.schema_items) as SchemaItem[]
    const structuredLLM = model.withStructuredOutput(convertToZodSchema(schemaItems))

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

export const useLangchainLLM = () => {
  const { confirmPassphrase } = useConfirmPassphrase()

  const stream = useCallback(
    async (
      messages: BaseMessage[],
      info?: {
        schemas?: Schema[]
        tools?: {
          name: string
          description: string
          schemaItems: SchemaItem[]
        }[]
        onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
        onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
        provider?: `${LLMProviderEnum}`
        llm?: LLM
      },
    ) => {
      const { schemas, onMessageUpdate, onMessageFinish } = info || {}
      await confirmPassphrase()
      const encrypted = info?.llm?.encrypted
      const options = info?.llm?.options || ({} as Record<string, unknown>)
      if (!encrypted?.key || typeof encrypted.key !== 'string') {
        throw new Error('API Key is not found')
      }
      const passphrase = await secureSession.get('passphrase')
      if (!passphrase) {
        throw new Error('Passphrase is not found')
      }
      const apiKey = await decryptSymmetric(encrypted.key, passphrase!)
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
              model: info?.llm?.name,
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
              model: info?.llm?.name,
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
    [confirmPassphrase],
  )

  return {
    stream,
  }
}
