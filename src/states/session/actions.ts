import { Session, SessionStatusEnum, SessionTypeEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'
import { useAppState } from 'src/states/app'
import secureSession from 'src/utils/secure-session'
import type { FindManyOptions } from 'src/services/database/typeorm-wrapper'

import { SessionState } from './state'

export interface SessionStateActions {
  getSessions: (condition?: {
    where: FindManyOptions<Session>['where']
    page?: number
  }) => Promise<void>
  setCurrentSession: (session: Session | string | undefined) => Promise<Session | undefined>
  setToDefaultSession: (type?: `${SessionTypeEnum}`) => Promise<Session | undefined>
  deleteSession: (id: string) => Promise<void>
  createSession: (session: Partial<Session>) => Promise<Session>
}

export const getSessionStateActions = (
  set: SetState<SessionState>,
  get: GetState<SessionState & SessionStateActions>,
): SessionStateActions => {
  return {
    setToDefaultSession: async (type?: `${SessionTypeEnum}`) => {
      const sessions = get().sessions
      if (!sessions?.length) {
        const session = await getRepository('Session').find({
          where: { status: SessionStatusEnum.Started, type: type || SessionTypeEnum.Whiteboard },
          order: { updated_at: 'DESC' },
          take: 1,
        })
        return get().setCurrentSession(session?.[0])
      }
      return get().setCurrentSession(sessions?.[0])
    },
    setCurrentSession: async (session) => {
      const currentSession = get().currentSession
      if (
        !session ||
        (typeof session === 'string' && currentSession?.id === session) ||
        (typeof session === 'object' &&
          currentSession?.id === session.id &&
          currentSession.passphrase === session.passphrase &&
          currentSession.metadata === session.metadata)
      ) {
        return currentSession
      }
      await secureSession.reload()
      set({ currentSession: undefined })
      if (typeof session === 'string' || !session) {
        session = session || useAppState.getState().selectedSessionId

        if (session === currentSession?.id && currentSession) {
          session = currentSession
        } else {
          let selectedSession = await getRepository('Session').findOne({
            where: { id: session },
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

      const mainNode = await getRepository('FlowNode').findOne({
        where: { id: session.main_node_id },
      })
      session.main_node = mainNode

      let isExist = false
      if (session.type === SessionTypeEnum.StandaloneApp) {
        const applications = get().applications.map((item) => {
          if (item.id === session.id) {
            isExist = true
            return session
          }
          return item
        })
        set({
          currentSession: session,
          applications: isExist ? applications : [session, ...get().applications],
        })
      } else {
        const sessions = get().sessions.map((item) => {
          if (item.id === session.id) {
            isExist = true
            return session
          }
          return item
        })
        set({
          currentSession: session,
          sessions: isExist ? sessions : [session, ...get().sessions],
        })
      }
      return session
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
          relations: ['main_node'],
          skip: condition?.page ? (condition.page - 1) * 20 : 0,
        })
        if (sessions?.length) {
          set({
            sessions,
          })
        }
      } catch {
        set({ error: 'No session' })
      }
    },
  }
}
