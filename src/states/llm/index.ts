import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { LLMStateActions, getLLMStateActions } from './actions'
import { defaultLLMState, LLMState } from './state'

export const useLLMState = create<LLMState & LLMStateActions>()(
  devtools((set, get) => ({
    ...defaultLLMState,
    ...getLLMStateActions(set, get),
  })),
)
