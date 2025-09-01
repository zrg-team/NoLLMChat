// Local LLM Services - Clean OpenAI-compatible API
// Only exports OpenAI-compatible interface, no internal details

import { webLLMAPI } from '../webllm'
import { wllamaAPI } from '../wllama'

// Clean OpenAI-compatible API
export const webLLM = webLLMAPI
export const wllama = wllamaAPI

// Service factory - returns provider API
export function createLLM(provider: 'webllm' | 'wllama') {
  switch (provider) {
    case 'webllm':
      return webLLMAPI
    case 'wllama':
      return wllamaAPI
    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}

// OpenAI-compatible types only
export type {
  ChatCompletionOptions,
  ChatCompletionResponse,
  ChatCompletionStreamChunk,
  ChatCompletionMessage,
} from './types/openai-compatible'

// Legacy compatibility (for existing code)
export { useWebLLMState as useLocalLLMState } from '../webllm'
