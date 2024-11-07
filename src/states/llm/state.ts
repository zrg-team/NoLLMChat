export interface LLMState {
  ready: boolean
  initializing: { worker: boolean; init: boolean; loading: boolean }
  cachedLLMURLs: string[]
  selectedModel: string
}

export const defaultLLMState: LLMState = {
  cachedLLMURLs: [],
  ready: false,
  initializing: { worker: true, init: true, loading: false },
  selectedModel: '',
}
