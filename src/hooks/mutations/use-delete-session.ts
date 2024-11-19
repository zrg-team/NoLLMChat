import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'

export const useDeleteSession = () => {
  const [loading, setLoading] = useState(false)
  const deleteSessionFunc = useSessionState((state) => state.deleteSession)

  const deleteSession = useCallback(
    async (id: string) => {
      try {
        setLoading(true)

        await deleteSessionFunc(id)
        await Promise.all([
          getRepository('FlowEdge')
            .find({
              select: ['id'],
              where: { session_id: id },
            })
            .then((edges) => {
              return Promise.all(edges.map((edge) => getRepository('FlowEdge').delete(edge.id)))
            }),
          getRepository('FlowNode')
            .find({
              select: ['id'],
              where: { session_id: id },
            })
            .then((nodes) => {
              return Promise.all(nodes.map((node) => getRepository('FlowNode').delete(node.id)))
            }),
        ])
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
