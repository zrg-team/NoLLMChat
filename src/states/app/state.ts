export interface AppState {
  language?: string
  theme?: string
}

export const defaultAppState: AppState = {
  language: undefined,
  theme: undefined,
}
