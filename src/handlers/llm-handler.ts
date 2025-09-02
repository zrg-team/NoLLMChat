import { LLM, LLMProviderEnum } from 'src/services/database/types'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { localLLMHandler } from './local-llm-handler'
import { langchainLLMHandler } from './langchain-llm-handler'
import { OpenAISchema, OpenAPITool } from 'src/types/openai'
import { useWebLLMState } from 'src/services/webllm'
import { loadModelFromHF } from 'src/services/wllama/wllama'
import type { InitProgressReport } from '@mlc-ai/web-llm'

/**
 * Main LLM handler that combines both local and langchain LLM handlers
 * This is a non-hook version that can be called anywhere in the application
 */
export const llmHandler = {
  /**
   * Load a model for the given provider
   */
  async loadModel(
    provider: `${LLMProviderEnum}`,
    modelName: string,
    options?: {
      provider?: `${LLMProviderEnum}`
      callback?: (initProgress: InitProgressReport) => void
    },
  ): Promise<void> {
    switch (provider) {
      case LLMProviderEnum.WebLLM: {
        const webLLMState = useWebLLMState.getState()
        return await webLLMState.loadModel(modelName, {
          provider,
          callback: options?.callback,
        })
      }
      case LLMProviderEnum.Wllama:
        return await loadModelFromHF(modelName, {
          provider,
          callback: options?.callback,
        })
      default:
        throw new Error(`Load model not supported for provider: ${provider}`)
    }
  },
  async stream(
    provider: `${LLMProviderEnum}`,
    messages: BaseMessage[],
    info?: {
      schemas?: OpenAISchema[]
      tools?: OpenAPITool[]
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
