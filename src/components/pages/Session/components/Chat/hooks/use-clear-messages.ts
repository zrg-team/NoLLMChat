import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import { useChatState } from 'src/components/pages/Session/state/chat'

export const useClearMessages = () => {
  const currentSessionId = useSessionState(useShallow((state) => state.currentSession?.id))
  const setMessages = useChatState(useShallow((state) => state.setMessages))

  const clearMessages = useCallback(async () => {
    if (!currentSessionId) {
      return
    }

    const records = await getRepository('Message').find({
      where: {
        session_id: currentSessionId,
      },
    })

    await Promise.all(
      records.map(async (record) => {
        await getRepository('Message').delete(record.id)
      }),
    )

    setMessages([])
  }, [currentSessionId])

  return { clearMessages }
}
