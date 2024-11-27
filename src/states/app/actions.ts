import { SetState, GetState } from 'src/utils/zustand'

import { AppState } from './state'

export interface AppStateActions {
  setLanguage: (language: string) => void
  setTheme: (theme: AppState['theme']) => void
  setSelectedSessionId: (selectedSessionId: string) => void
}

export const getAppStateActions = (
  set: SetState<AppState>,
  get: GetState<AppState>,
): AppStateActions => {
  return {
    setLanguage: (language) => {
      const currentLanguage = get().language
      if (currentLanguage === language) return
      set({ language })
    },
    setTheme: (theme) => {
      const currentTheme = get().theme
      if (currentTheme === theme) return
      set({ theme })
    },
    setSelectedSessionId: (selectedSessionId) => {
      const currentSelectedSessionId = get().selectedSessionId
      if (currentSelectedSessionId === selectedSessionId) return
      set({ selectedSessionId })
    },
  }
}
