// OpenAI-Compatible Local LLM API
// Clean interface without state management exposure

import type { BaseMessage } from '@langchain/core/messages'

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionOptions {
  // Core OpenAI parameters
  model?: string
  stream?: boolean
  temperature?: number
  max_tokens?: number

  // Structured output (OpenAI compatible)
  response_format?: {
    type: 'json_object'
    schema: Record<string, unknown>
  }

  // Function calling (OpenAI compatible)
  tools?: {
    type: 'function'
    function: {
      name: string
      description: string
      parameters: Record<string, unknown>
    }
  }[]

  // Additional options
  [key: string]: unknown
}

export interface ChatCompletionResponse {
  content: string
  usage?: {
    prompt_tokens?: number
    completion_tokens?: number
    total_tokens?: number
  }
  tool_calls?: Array<{
    name: string
    args: Record<string, unknown>
  }>
}

export interface ChatCompletionStreamChunk {
  content: string
  chunk: unknown
}

// Clean API interface - no state management exposed
export interface LocalLLMAPI {
  chatCompletion: (
    messages: BaseMessage[],
    options?: ChatCompletionOptions,
  ) => Promise<ChatCompletionResponse> | AsyncGenerator<ChatCompletionStreamChunk>
}

// Provider-specific APIs
export interface WebLLMAPI extends LocalLLMAPI {
  loadModel: (modelName: string) => Promise<void>
  unloadModel: () => Promise<void>
  getCurrentModel: () => Promise<string | undefined>
}

export interface WllamaAPI extends LocalLLMAPI {
  loadModel: (modelName: string) => Promise<void>
  unloadModel: () => Promise<void>
}
