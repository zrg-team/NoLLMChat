export interface AppState {
  language?: string
  theme?: 'dark' | 'light' | 'system'
  selectedSessionId?: string
}

export const defaultAppState: AppState = {
  language: undefined,
  theme: 'light',
  selectedSessionId: undefined,
}
