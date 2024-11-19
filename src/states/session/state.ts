import type { Session } from 'src/services/database/types'

export interface SessionState {
  currentSession?: Session
  sessions: Session[]
  ready: boolean
  error?: string
}

export const defaultSessionState: SessionState = {
  currentSession: undefined,
  ready: false,
  error: undefined,
  sessions: [],
}
