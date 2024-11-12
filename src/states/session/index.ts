import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SessionStateActions, getSessionStateActions } from './actions'
import { SessionState, defaultSessionState } from './state'

export const useSessionState = create<SessionState & SessionStateActions>()(
  devtools((set, get) => ({
    ...defaultSessionState,
    ...getSessionStateActions(set, get),
  })),
)
