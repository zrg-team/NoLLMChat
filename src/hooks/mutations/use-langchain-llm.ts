import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { BaseChatModel, BaseChatModelParams } from '@langchain/core/language_models/chat_models'
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

  const getLLM = useCallback(
    async (provider?: `${LLMProviderEnum}`, llm?: LLM, config?: BaseChatModelParams) => {
      await confirmPassphrase()
      const encrypted = llm?.encrypted
      const options = llm?.options || ({} as Record<string, unknown>)
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
      switch (provider) {
        case LLMProviderEnum.GoogleGenerativeAI:
          return new ChatGoogleGenerativeAI({
            apiKey,
            model: llm?.name,
            temperature: llm?.options?.temperature ? +llm.options.temperature : undefined,
            topK: llm?.options?.topK ? +llm.options.topK : undefined,
            topP: llm?.options?.topP ? +llm.options.topP : undefined,
            stopSequences: llm?.options?.stop ? (llm.options.stop as string[]) : undefined,
            maxOutputTokens: llm?.options?.maxTokens ? +llm.options.maxTokens : undefined,
            streaming: true,
            ...config,
          })
        case LLMProviderEnum.Groq: {
          return new ChatGroq({
            apiKey,
            model: llm?.name,
            temperature: options?.temperature ? +options.temperature : undefined,
            stopSequences: options?.stop ? (options.stop as string[]) : undefined,
            maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
            streaming: true,
            ...config,
          })
        }
        case LLMProviderEnum.OpenAI: {
          return new ChatOpenAI({
            apiKey,
            model: llm?.name,
            temperature: options?.temperature ? +options.temperature : undefined,
            topP: options?.topP ? +options.topP : undefined,
            stopSequences: options?.stop ? (options.stop as string[]) : undefined,
            maxTokens: options?.maxTokens ? +options.maxTokens : undefined,
            streaming: true,
            ...config,
          })
        }
        default:
          throw new Error('Provider is not supported')
      }
    },
    [],
  )

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
      const model = await getLLM(info?.provider, info?.llm)

      let content = ''

      const result = await llmInvoke(model, messages, {
        schemas: info?.schemas,
        onMessageUpdate: info?.onMessageUpdate,
      })
      content = result.content
      const lastChunk = result.lastChunk
      info?.onMessageFinish?.({
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
    getLLM,
    stream,
  }
}
