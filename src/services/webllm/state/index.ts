import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { WebLLMStateActions, getWebLLMStateActions } from './actions'
import { defaultWebLLMState, WebLLMState } from './state'

export type { WebLLMState, WebLLMStateActions }

export const useWebLLMState = create<WebLLMState & WebLLMStateActions>()(
  devtools((set, get) => ({
    ...defaultWebLLMState,
    ...getWebLLMStateActions(set, get),
  })),
)
