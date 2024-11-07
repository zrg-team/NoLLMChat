import { SetState, GetState } from 'src/utils/zustand'

import { LLMState } from './state'

export interface LLMStateActions {
  init: () => Promise<void>
  setInitializing: (initializing: Partial<LLMState['initializing']>) => void
  setSelectedModel: (selectedModel: string) => void
}

export const getLLMStateActions = (
  set: SetState<LLMState & LLMStateActions>,
  get: GetState<LLMState & LLMStateActions>,
): LLMStateActions => {
  return {
    setInitializing: (initializing) => {
      const currentInitializing = get().initializing
      set({ initializing: { ...currentInitializing, ...initializing } })
    },
    setSelectedModel: (selectedModel) => {
      set({ selectedModel })
    },
    init: async () => {
      try {
        caches
          .open('webllm/config')
          .then(async (cache) => {
            return cache.keys()
          })
          .then((requests) => {
            set({ cachedLLMURLs: requests.map((request) => request.url) })
          })
      } catch (error) {
        console.warn('Failed to fetch cached LLMs:', error)
      }
    },
  }
}
