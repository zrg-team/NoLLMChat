export interface AppState {
  language?: string
  theme?: 'dark' | 'light' | 'system'
}

export const defaultAppState: AppState = {
  language: undefined,
  theme: undefined,
}
