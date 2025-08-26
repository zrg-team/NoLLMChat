import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { localLLMHandler } from './local-llm-handler'
import { langchainLLMHandler } from './langchain-llm-handler'

/**
 * Main LLM handler that combines both local and langchain LLM handlers
 * This is a non-hook version that can be called anywhere in the application
 */
export const llmHandler = {
  async stream(
    provider: `${LLMProviderEnum}`,
    messages: BaseMessage[],
    info?: {
      schemas?: Schema[]
      tools?: {
        name: string
        description: string
        schemaItems: SchemaItem[]
      }[]
      onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk | BaseMessage }) => void
      onMessageFinish?: (data: {
        content: string
        lastChunk?: BaseMessageChunk | BaseMessage
      }) => void
      llm?: LLM
      passphrase?: string // For langchain LLMs that require API key decryption
    },
  ) {
    switch (provider) {
      case LLMProviderEnum.WebLLM:
      case LLMProviderEnum.Wllama:
        return localLLMHandler.stream(messages, info)
      case LLMProviderEnum.GoogleGenerativeAI:
      case LLMProviderEnum.Groq:
      case LLMProviderEnum.OpenAI:
        return langchainLLMHandler.stream(messages, {
          ...info,
          provider,
        })
      default:
        throw new Error(`Provider ${provider} is not supported`)
    }
  },
}

export default llmHandler
