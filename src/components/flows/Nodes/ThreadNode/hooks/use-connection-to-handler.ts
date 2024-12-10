import { useCallback } from 'react'
import { Node, Connection } from '@xyflow/react'
import {
  FlowNodePlaceholder,
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
  Schema,
  Thread,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'
import { getRepository } from 'src/services/database'

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
        if (source?.type === FlowNodeTypeEnum.Prompt && target?.type === FlowNodeTypeEnum.Thread) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          return
        } else if (
          source?.type === FlowNodeTypeEnum.LLM &&
          target?.type === FlowNodeTypeEnum.Thread
        ) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          return
        } else if (
          source?.type === FlowNodeTypeEnum.Schema &&
          target?.type === FlowNodeTypeEnum.Thread
        ) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          const thread = target.data.entity as Thread
          const schema = target.data.entity as Schema
          await getRepository('Thread').update(thread.id, {
            schema_id: schema.id,
          })
          return
        } else if (
          source?.type === FlowNodeTypeEnum.ToolDefinition &&
          target?.type === FlowNodeTypeEnum.Thread
        ) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          return
        } else if (
          source?.type === FlowNodeTypeEnum.VectorDatabase &&
          target?.type === FlowNodeTypeEnum.Thread
        ) {
          await createOrUpdateFlowEdge({
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
          })
          return
        } else if (
          source?.type === FlowNodeTypeEnum.PlaceHolder &&
          target?.type === FlowNodeTypeEnum.Thread
        ) {
          const sourceEntity = source.data.entity as FlowNodePlaceholder
          if (
            sourceEntity.placeholder_type === FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER
          ) {
            await createOrUpdateFlowEdge({
              source: connection.source,
              target: connection.target,
              sourceHandle: connection.sourceHandle,
              targetHandle: connection.targetHandle,
            })
            return
          }
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
