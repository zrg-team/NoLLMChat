import { SessionStatusEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'

import { SessionState } from './state'

export interface SessionStateActions {
  init: () => Promise<void>
}

export const getSessionStateActions = (
  set: SetState<SessionState & SessionStateActions>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _get: GetState<SessionState & SessionStateActions>,
): SessionStateActions => {
  return {
    init: async () => {
      try {
        const session = await getRepository('Session').findOne({
          where: { status: SessionStatusEnum.Started },
        })
        if (session) {
          set({ currentSession: session, ready: true })
        } else {
          const newSession = await getRepository('Session').save({
            name: 'Default Session',
            status: SessionStatusEnum.Started,
          })
          if (newSession) {
            set({ currentSession: newSession, ready: true })
          } else {
            throw new Error('No session')
          }
        }
      } catch {
        set({ error: 'No session' })
      }
    },
  }
}
