import { useCallback, useState } from 'react'
import { Session } from 'src/services/database/types'
import { useSessionState } from 'src/states/session'

export const useCreateSession = () => {
  const [loading, setLoading] = useState(false)
  const createSessionFuncion = useSessionState((state) => state.createSession)

  const createSession = useCallback(
    async (data: Partial<Session>) => {
      try {
        setLoading(true)

        const session = await createSessionFuncion(data)
        return session
      } finally {
        setLoading(false)
      }
    },
    [createSessionFuncion],
  )

  return {
    loading,
    createSession,
  }
}
