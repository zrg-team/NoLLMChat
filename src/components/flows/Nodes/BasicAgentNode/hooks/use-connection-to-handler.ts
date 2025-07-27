import { useCallback } from 'react'
import { Node, useReactFlow } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'
import { useFlowState } from 'src/states/flow'

export const useConnectionToHandler = (id: string) => {
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const { getHandleConnections, getNode } = useReactFlow()

  const connectionHandler = useCallback(
    async ({ edgeId, source, target }: { edgeId: string; source: Node; target: Node }) => {
      try {
        // Define allowed source node types for BasicAgent
        const allowedSourceTypes = [
          FlowNodeTypeEnum.Prompt,
          FlowNodeTypeEnum.ToolDefinition,
          FlowNodeTypeEnum.MCP,
          FlowNodeTypeEnum.LLM,
          FlowNodeTypeEnum.Thread,
        ]

        // Check if source type is allowed
        if (!allowedSourceTypes.includes(source?.type as FlowNodeTypeEnum)) {
          return {
            deleteEdgeId: edgeId,
          }
        }

        // Special handling for LLM connections (limit: 1)
        if (source?.type === FlowNodeTypeEnum.LLM) {
          // Get existing connections to this BasicAgent node
          const existingConnections = getHandleConnections({
            type: 'target',
            nodeId: id,
          })

          // Check if there's already an LLM connected by checking the source node IDs
          // and filtering out the current connection being made
          const existingLLMConnections = existingConnections.filter((conn) => {
            // Skip the current connection being made
            if (conn.source === source.id) {
              return false
            }
            // Get the actual source node and check if it's an LLM
            const sourceNode = getNode(conn.source)
            return sourceNode?.type === FlowNodeTypeEnum.LLM
          })

          // If there's already an LLM connection, reject this new one
          if (existingLLMConnections.length > 0) {
            return {
              deleteEdgeId: edgeId,
            }
          }
        }

        // For allowed connections (Prompt, Tool, MCP - no limit, LLM - limit 1), create the edge
        await createOrUpdateFlowEdge({
          source: source.id,
          target: target.id,
        })

        return // Success - keep the connection
      } catch {
        return {
          deleteEdgeId: edgeId,
        }
      }
    },
    [createOrUpdateFlowEdge, getHandleConnections, getNode, id],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
