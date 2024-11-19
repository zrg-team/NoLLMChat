import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AppStateActions, getAppStateActions } from './actions'
import { AppState, defaultAppState } from './state'

export const useAppState = create<AppState & AppStateActions>()(
  devtools((set, get) => ({
    ...defaultAppState,
    ...getAppStateActions(set, get),
  })),
)
