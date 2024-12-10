import { useCallback } from 'react'
import { Node, Connection } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

  const connectionHandler = useCallback(
    async ({
      edgeId,
      source,
      target,
      connection,
    }: {
      edgeId: string
      source: Node
      target: Node
      connection: Connection
    }) => {
      try {
        if (source?.type === FlowNodeTypeEnum.LLM && target?.type === FlowNodeTypeEnum.EditorApp) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          return
        }

        return {
          deleteEdgeId: edgeId,
        }
      } catch {
        return {
          deleteEdgeId: edgeId,
        }
      }
    },
    [createOrUpdateFlowEdge],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
