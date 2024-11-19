import { Session, SessionStatusEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'

import { SessionState } from './state'

export interface SessionStateActions {
  getLatestSessions: () => Promise<void>
  setCurrentSession: (session: Session) => void
  deleteSession: (id: string) => Promise<void>
  createSession: (session: Partial<Session>) => Promise<Session>
}

export const getSessionStateActions = (
  set: SetState<SessionState>,
  get: GetState<SessionState>,
): SessionStateActions => {
  return {
    setCurrentSession: (session) => {
      set({ currentSession: session })
    },
    createSession: async (data) => {
      const session = await getRepository('Session').save({
        ...data,
        name: `${data.name}`,
        status: SessionStatusEnum.Started,
      })
      if (!session) {
        throw new Error('Failed create.')
      }
      set({ sessions: [session, ...get().sessions] })
      return session
    },
    deleteSession: async (id) => {
      const session = await getRepository('Session').delete(id)
      if (!session?.affected) {
        throw new Error('Failed delete.')
      }
      const currentSession = get().currentSession
      const newSessions = get().sessions.filter((s) => s.id !== id)
      set({
        sessions: newSessions,
        ...(currentSession?.id === id ? { currentSession: newSessions?.[0] } : {}),
      })
    },
    getLatestSessions: async () => {
      try {
        if (get().ready) return
        const sessions = await getRepository('Session').find({
          where: { status: SessionStatusEnum.Started },
          order: { updated_at: 'DESC' },
          take: 7,
        })
        if (sessions?.length) {
          const newestSession = sessions?.[0]

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
