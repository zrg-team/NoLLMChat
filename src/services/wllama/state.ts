// Wllama State Management
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { BaseMessage } from '@langchain/core/messages'
import { LLMProviderEnum } from 'src/services/database/types'
import type {
  ChatCompletionOptions,
  LLMServiceState,
} from 'src/services/local-llm/types/llm-service'
import { stream as wllamaStreamInner } from './wllama'

export interface WllamaState extends LLMServiceState {
  // Wllama-specific state properties
  isLoaded?: boolean
}

export interface WllamaStateActions {
  // Wllama-specific actions
  setLoaded: (loaded: boolean) => void
}

const defaultWllamaState: WllamaState = {
  ready: true, // Wllama doesn't need complex initialization like WebLLM
  initializing: { loading: false },
  selectedModel: undefined,
  isLoaded: false,

  init: () => {
    // Wllama doesn't need complex initialization
  },

  destroy: () => {
    // Cleanup if needed
  },

  loadModel: async (_modelName: string, _options: { provider: `${LLMProviderEnum}` }) => {
    // Wllama model loading logic - will be implemented properly later
    // For now, just a placeholder
  },

  unLoadModel: () => {
    // Wllama model unloading logic - will be implemented properly later
  },

  chatCompletion: async function* (messages: BaseMessage[], options: ChatCompletionOptions) {
    const { stream = true, response_format, tools } = options

    if (response_format?.type === 'json_object') {
      throw new Error('Structured output not supported in Wllama yet')
    }

    if (tools?.length) {
      throw new Error('Function calling not supported in Wllama yet')
    }

    if (!stream) {
      // Non-streaming not implemented yet
      throw new Error('Non-streaming mode not supported in Wllama yet')
    }

    // Use existing Wllama stream implementation
    let content = ''
    await wllamaStreamInner(messages, {
      onNewToken: (_token, _piece, newToken) => {
        content += newToken
        // For now, just accumulate content
        // TODO: Implement proper streaming response
      },
    })

    // Return accumulated content (this is a simplified implementation)
    yield { content }
  },

  getCurrentModelInfo: async () => {
    // Wllama model info - will be implemented properly later
    return {
      model: undefined,
    }
  },
}

const getWllamaStateActions = (
  set: (fn: (state: WllamaState) => WllamaState) => void,
): WllamaStateActions => ({
  setLoaded: (loaded: boolean) => set((state) => ({ ...state, isLoaded: loaded })),
})

export const useWllamaState = create<WllamaState & WllamaStateActions>()(
  devtools((set, _get) => ({
    ...defaultWllamaState,
    ...getWllamaStateActions(set),
  })),
)
