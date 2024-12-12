import { useCallback, useRef } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'

export const useUpdateEditorContent = () => {
  const currentSession = useSessionState((state) => state.currentSession)
  const refDebounce = useRef<number | null>(null)

  const updateEditorContent = useCallback(
    async (value: unknown[]) => {
      if (!currentSession?.main_node_id) return

      clearTimeout(refDebounce.current!)
      refDebounce.current = setTimeout(async () => {
        if (!currentSession?.main_node_id) return

        await getRepository('FlowNode').update(currentSession.main_node_id, {
          data: value,
        })
      }, 150) as unknown as number
    },
    [currentSession],
  )

  return {
    updateEditorContent,
  }
}
