import { useCallback, useState } from 'react'
import { useSessionState } from 'src/states/session'

export const useDeleteSession = () => {
  const [loading, setLoading] = useState(false)
  const deleteSessionFunc = useSessionState((state) => state.deleteSession)

  const deleteSession = useCallback(
    async (id: string) => {
      try {
        setLoading(true)

        await deleteSessionFunc(id)
      } finally {
        setLoading(false)
      }
    },
    [deleteSessionFunc],
  )

  return {
    loading,
    deleteSession,
  }
}
