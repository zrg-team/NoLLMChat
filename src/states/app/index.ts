import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { AppStateActions, getAppStateActions } from './actions'
import { AppState, defaultAppState } from './state'

export const useAppState = create<AppState & AppStateActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultAppState,
        ...getAppStateActions(set, get),
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
