import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LocalLLMStateActions, getLocalLLMStateActions } from './actions'
import { defaultLocalLLMState, LocalLLMState } from './state'

export const useLocalLLMState = create<LocalLLMState & LocalLLMStateActions>()(
  devtools((set, get) => ({
    ...defaultLocalLLMState,
    ...getLocalLLMStateActions(set, get),
  })),
)
