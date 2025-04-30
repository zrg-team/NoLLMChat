import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { Prompt } from 'src/services/database/types'

import { useWorkspaceState } from '../state/workspace'
import { useChatState } from '../state/chat'

export const useUpdatePrompt = () => {
  const [loading, setLoading] = useState(false)
  const currentSessionId = useSessionState(useShallow((state) => state.currentSession?.id))
  const clearGraph = useChatState((state) => state.clearGraph)

  const updatePrompts = useWorkspaceState((state) => state.updatePrompts)

  const updatePrompt = useCallback(
    async (prompt: Prompt, update: Partial<Prompt>) => {
      try {
        if (!currentSessionId) {
          return
        }
        setLoading(true)
        const result = {
          ...prompt,
          ...update,
        }
        const updated = await getRepository('Prompt').update(prompt.id, result)
        if (updated?.affected) {
          updatePrompts({
            [prompt.key!]: result,
          })
          clearGraph()
        }
        return result
      } finally {
        setLoading(false)
      }
    },
    [currentSessionId],
  )

  return {
    loading,
    updatePrompt,
  }
}
