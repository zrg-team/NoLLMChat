import { Session, SessionStatusEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'

import { SessionState } from './state'

export interface SessionStateActions {
  init: () => Promise<void>
  setCurrentSession: (session: Session) => void
}

export const getSessionStateActions = (
  set: SetState<SessionState>,
  get: GetState<SessionState>,
): SessionStateActions => {
  return {
    setCurrentSession: (session) => {
      set({ currentSession: session })
    },
    init: async () => {
      try {
        if (get().ready) return
        const sessions = await getRepository('Session').find({
          where: { status: SessionStatusEnum.Started },
          take: 7,
        })
        if (sessions?.length) {
          const newestSession = sessions?.reduce((newest, item) => {
            if (newest?.id && item?.updated_at && newest?.id < item?.id) {
              return item
            }
            return newest
          }, sessions[0])

          set({ currentSession: newestSession, sessions, ready: true })
        } else {
          const newSession = await getRepository('Session').save({
            name: 'Default',
            status: SessionStatusEnum.Started,
          })
          if (newSession) {
            set({ currentSession: newSession, sessions: [newSession], ready: true })
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
