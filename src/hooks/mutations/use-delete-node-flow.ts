import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { useFlowState } from 'src/states/flow'

export const useDeleteNodeFlow = () => {
  const [loading, setLoading] = useState(false)
  const updateNode = useFlowState((state) => state.updateNodes)
  const updateEdges = useFlowState((state) => state.updateEdges)

  const deleteNodeFlow = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await getRepository('FlowNode').delete(id)
        const edges = await getRepository('FlowEdge').find({
          where: [{ source: id }, { target: id }],
        })
        await Promise.all(edges.map((edge) => getRepository('FlowEdge').delete(edge.id)))
        await updateNode([{ id, type: 'remove' as const }])
        await updateEdges(edges.map((edge) => ({ id: edge.id, type: 'remove' as const })))
        return true
      } catch {
        return false
      } finally {
        setLoading(false)
      }
    },
    [updateEdges, updateNode],
  )

  return {
    loading,
    deleteNodeFlow,
  }
}
