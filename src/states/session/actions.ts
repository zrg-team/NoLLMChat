import { Session, SessionStatusEnum, SessionTypeEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'
import { useAppState } from 'src/states/app'
import secureSession from 'src/utils/secure-session'
import type { FindManyOptions } from 'src/services/database/typeorm-wrapper'

import { SessionState } from './state'
import { logError } from 'src/utils/logger'

export interface SessionStateActions {
  getSessions: (condition?: {
    where: FindManyOptions<Session>['where']
    page?: number
  }) => Promise<void>
  setCurrentSession: (session: Session | string | undefined) => Promise<Session | undefined>
  deleteSession: (id: string) => Promise<void>
  createSession: (session: Partial<Session>) => Promise<Session>
}

export const getSessionStateActions = (
  set: SetState<SessionState>,
  get: GetState<SessionState & SessionStateActions>,
): SessionStateActions => {
  return {
    setCurrentSession: async (session) => {
      try {
        if (!session) {
          set({ currentSession: undefined })
          return undefined
        }
        const currentSession = get().currentSession
        if (
          (typeof session === 'string' && currentSession?.id === session) ||
          (typeof session === 'object' &&
            currentSession?.id === session.id &&
            currentSession.passphrase === session.passphrase)
        ) {
          return currentSession
        }
        set({ loadingCurrentSession: true })
        await secureSession.reload()
        set({ currentSession: undefined })
        if (typeof session === 'string' || !session) {
          const sessionId = session || useAppState.getState().selectedSessionId

          if (sessionId === currentSession?.id && currentSession) {
            session = currentSession
          } else {
            let selectedSession = await getRepository('Session').findOne({
              where: { id: sessionId },
            })
            if (!selectedSession) {
              selectedSession = (await getRepository('Session').findOne({
                order: { updated_at: 'DESC' },
              })) as Session
            }
            session = selectedSession
          }
        }
        useAppState.setState({ selectedSessionId: session.id })

        set({
          currentSession: session,
          loadingCurrentSession: false,
        })
        return session
      } catch (error) {
        logError(`[setCurrentSession] Error when set current session`, error)
        set({ loadingCurrentSession: false })
        return undefined
      }
    },
    createSession: async (data) => {
      const session = await getRepository('Session').save({
        ...data,
        name: `${data.name}`,
        status: SessionStatusEnum.Started,
        type: SessionTypeEnum.Whiteboard,
      })
      if (!session) {
        throw new Error('Failed create.')
      }
      set({ sessions: [session, ...get().sessions] })
      return session
    },
    deleteSession: async (id) => {
      const session = await getRepository('Session').findOne({
        where: { id },
      })
      if (!session) {
        throw new Error('Failed delete.')
      }
      const updated = await getRepository('Session').delete(id)
      if (!updated) {
        throw new Error('Failed delete.')
      }

      const sessions = get().sessions
      const applications = get().applications
      if (session?.type === SessionTypeEnum.Whiteboard) {
        const newSessions = sessions.filter((s) => s.id !== id)
        set({
          sessions: newSessions,
          ...(session?.id === id ? { currentSession: newSessions?.[0] || applications?.[0] } : {}),
        })
      } else {
        const newApplications = applications.filter((s) => s.id !== id)
        set({
          applications: newApplications,
          ...(session?.id === id ? { currentSession: newApplications?.[0] || sessions?.[0] } : {}),
        })
      }
    },
    getSessions: async (condition) => {
      try {
        const sessions = await getRepository('Session').find({
          where: condition?.where || { status: SessionStatusEnum.Started },
          order: { updated_at: 'DESC' },
          take: 20,
          skip: condition?.page ? (condition.page - 1) * 20 : 0,
        })
        if (sessions?.length) {
          set({
            sessions,
          })
        }
      } catch (error) {
        logError(`[getSessions] Error when get sessions`, error)
        set({ error: 'No session' })
      }
    },
  }
}
