import { useCallback, useState } from 'react'
import { Session } from 'src/services/database/types'
import { useAppState } from 'src/states/app'
import { useSessionState } from 'src/states/session'

export const useCreateSession = () => {
  const [loading, setLoading] = useState(false)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)
  const createSessionFuncion = useSessionState((state) => state.createSession)
  const setSelectedSessionId = useAppState((state) => state.setSelectedSessionId)

  const createSession = useCallback(
    async (data: Partial<Session>) => {
      try {
        setLoading(true)

        const session = await createSessionFuncion(data)
        setCurrentSession(session)
        setSelectedSessionId(session.id)
      } finally {
        setLoading(false)
      }
    },
    [createSessionFuncion, setCurrentSession, setSelectedSessionId],
  )

  return {
    loading,
    createSession,
  }
}
