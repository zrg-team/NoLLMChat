import { Session, SessionStatusEnum, SessionTypeEnum } from 'src/services/database/types'
import { SetState, GetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'
import { useAppState } from 'src/states/app'

import { SessionState } from './state'

export interface SessionStateActions {
  getLatestApplications: () => Promise<void>
  getLatestSessions: () => Promise<void>
  setCurrentSession: (session: Session | string | undefined) => Promise<Session>
  deleteSession: (id: string) => Promise<void>
  createSession: (session: Partial<Session>) => Promise<Session>
  init: () => void
}

export const getSessionStateActions = (
  set: SetState<SessionState>,
  get: GetState<SessionState & SessionStateActions>,
): SessionStateActions => {
  return {
    setCurrentSession: async (session) => {
      if (typeof session === 'string' || !session) {
        session = session || useAppState.getState().selectedSessionId
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
      useAppState.setState({ selectedSessionId: session.id })
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
      const session = await getRepository('Session').delete(id)
      if (!session) {
        throw new Error('Failed delete.')
      }
      const currentSession = get().currentSession
      const sessions = get().sessions
      const applications = get().applications
      if (currentSession?.type === SessionTypeEnum.Whiteboard) {
        const newSessions = sessions.filter((s) => s.id !== id)
        set({
          sessions: newSessions,
          ...(currentSession?.id === id
            ? { currentSession: newSessions?.[0] || applications?.[0] }
            : {}),
        })
      } else {
        const newApplications = applications.filter((s) => s.id !== id)
        set({
          applications: newApplications,
          ...(currentSession?.id === id
            ? { currentSession: newApplications?.[0] || sessions?.[0] }
            : {}),
        })
      }
    },
    init: () => {
      get().getLatestApplications()
      get().getLatestSessions()
    },
    getLatestApplications: async () => {
      try {
        const applications = await getRepository('Session').find({
          where: { type: SessionTypeEnum.StandaloneApp },
          order: { updated_at: 'DESC' },
          take: 7,
        })
        set({ applications })
      } catch {
        set({ error: 'No application' })
      }
    },
    getLatestSessions: async () => {
      try {
        if (get().ready) return

        const sessions = await getRepository('Session').find({
          where: { status: SessionStatusEnum.Started, type: SessionTypeEnum.Whiteboard },
          order: { updated_at: 'DESC' },
          take: 7,
        })
        if (sessions?.length) {
          set({
            sessions,
            ready: true,
          })
        } else {
          const newSession = await getRepository('Session').save({
            name: 'Default',
            status: SessionStatusEnum.Started,
            type: SessionTypeEnum.Whiteboard,
          })
          if (newSession) {
            useAppState.setState({ selectedSessionId: newSession.id })
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
