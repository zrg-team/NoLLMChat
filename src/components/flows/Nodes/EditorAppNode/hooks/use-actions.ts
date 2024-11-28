import { useCallback, useState } from 'react'
import { useInternalNode } from '@xyflow/react'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useActions = (id: string) => {
  const node = useInternalNode(id)
  const currentSession = useSessionState((state) => state.currentSession)
  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const updateEditorContent = useCallback(async () => {
    try {
      setLoading(true)
    } finally {
      setLoading(false)
    }
  }, [createOrUpdateFlowNode, currentSession?.id, node])

  return {
    loading,
    updateEditorContent,
  }
}
