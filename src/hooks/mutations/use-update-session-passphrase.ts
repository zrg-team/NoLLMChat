import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { encryptSymmetric, generatePassphrase } from 'src/utils/aes'

export const useUpdateSessionPassphrase = () => {
  const [loading, setLoading] = useState(false)
  const currentSession = useSessionState((state) => state.currentSession)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)

  const updateSessionPassphrase = useCallback(
    async (passkey: string) => {
      if (!currentSession || !passkey) {
        return
      }
      try {
        setLoading(true)

        const passphrase = await generatePassphrase()
        const encrypted = await encryptSymmetric(passphrase, passkey)
        await getRepository('Session').update(currentSession.id, {
          passphrase: encrypted,
        })
        const session = await getRepository('Session').findOne({ where: { id: currentSession.id } })
        if (session) {
          setCurrentSession(session)
        }
        return {
          passphrase,
          encrypted,
        }
      } finally {
        setLoading(false)
      }
    },
    [currentSession, setCurrentSession],
  )

  return {
    loading,
    updateSessionPassphrase,
  }
}
