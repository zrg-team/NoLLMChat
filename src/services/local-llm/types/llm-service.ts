// Unified Local LLM Service Interface
// Both WebLLM and Wllama services must implement this interface

import type { BaseMessage } from '@langchain/core/messages'
import type { LLMProviderEnum } from 'src/services/database/types'

export interface ChatCompletionOptions {
  provider: `${LLMProviderEnum}`
  stream?: boolean
  response_format?: {
    type: 'json_object'
    schema: Record<string, unknown>
  }
  tools?: {
    type: 'function'
    function: {
      name: string
      description: string
      parameters: Record<string, unknown>
    }
  }[]
  [key: string]: unknown
}

export interface LLMServiceState {
  ready: boolean
  initializing: {
    worker?: boolean
    init?: boolean
    loading?: boolean
  }
  selectedModel?: string

  // Core methods - all services must implement these
  init: () => void
  destroy: () => void
  loadModel: (modelName: string, options: { provider: `${LLMProviderEnum}` }) => Promise<void>
  unLoadModel: () => void
  chatCompletion: (
    messages: BaseMessage[],
    options: ChatCompletionOptions,
  ) => AsyncGenerator<unknown> | Promise<unknown>
  getCurrentModelInfo?: () => Promise<{
    model?: string
    [key: string]: unknown
  }>
}

export interface LLMService {
  useState: () => LLMServiceState
  getState: () => LLMServiceState
}
