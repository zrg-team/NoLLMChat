import { useCallback, useEffect, useRef, useState } from 'react'
import { getRepository } from 'src/services/database/database'
import { FlowNode } from 'src/services/database/types'
import { useSessionState } from 'src/states/session'

export const useUpdateEditorContent = () => {
  const currentSession = useSessionState((state) => state.currentSession)
  const refDebounce = useRef<number | null>(null)
  const [flowNode, setFlowNode] = useState<FlowNode>()

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

  useEffect(() => {
    if (!currentSession?.main_node_id) return

    getRepository('FlowNode')
      .findOne({
        where: { id: currentSession.main_node_id },
      })
      .then((node) => {
        setFlowNode(node)
      })
  }, [currentSession])

  return {
    flowNode,
    updateEditorContent,
  }
}
