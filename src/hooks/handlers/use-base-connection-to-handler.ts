import { useCallback, useEffect, useState } from 'react'
import { Node, Connection, useHandleConnections, useReactFlow } from '@xyflow/react'

import { filterUserConnections } from 'src/utils/flow'

export const useBaseConnectionToHandler = (
  id: string,
  handlerFunction: (input: {
    id: string
    edgeId: string
    source: Node
    target: Node
    connection: Connection
  }) => Promise<{ deleteEdgeId: string | string[] } | undefined>,
) => {
  const [handling, setHandling] = useState(false)
  const [newTargetConnection, setNewTargetConnection] = useState<Connection[]>([])
  const { deleteElements, getNode } = useReactFlow()

  useHandleConnections({
    type: 'target',
    nodeId: id,
    onConnect: (newConnections) => {
      if (newConnections?.length) {
        setNewTargetConnection((pre) => [...pre, ...filterUserConnections(newConnections)])
      }
    },
  })

  const connectionHandler = useCallback(
    async (edgeId: string, source: Node, target: Node, connection: Connection) => {
      try {
        const result = await handlerFunction({
          id,
          edgeId,
          source,
          target,
          connection,
        })

        return result
      } catch {
        return {
          deleteEdgeId: edgeId,
        }
      }
    },
    [handlerFunction, id],
  )

  useEffect(() => {
    if (!newTargetConnection?.length || handling) {
      return
    }
    const handle = async () => {
      try {
        setHandling(true)
        const handlingConnections = [...newTargetConnection]
        setNewTargetConnection([])
        const removeEdgeIds: string[] = []
        const target = getNode(id)
        await Promise.all(
          handlingConnections.map(async (connection) => {
            const edgeId = 'edgeId' in connection ? connection.edgeId : undefined
            const source = getNode(connection.source)
            if (!source || !target) {
              return
            }

            const response = await connectionHandler(`${edgeId}`, source, target, connection)

            if (response?.deleteEdgeId) {
              removeEdgeIds.push(
                ...(Array.isArray(response.deleteEdgeId)
                  ? response.deleteEdgeId
                  : [response.deleteEdgeId]),
              )
            }
          }),
        )
        if (removeEdgeIds?.length) {
          await deleteElements({
            edges: removeEdgeIds.map((id) => ({ id })),
          })
        }
      } finally {
        setHandling(false)
      }
    }
    handle()
  }, [deleteElements, getNode, id, handling, connectionHandler, newTargetConnection])
}
