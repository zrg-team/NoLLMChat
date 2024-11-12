import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { FlowNodeTypeEnum, ToolDefinition } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateTool = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

  const createTool = useCallback(
    async (
      source: Node,
      data: Partial<ToolDefinition>,
      options?: {
        schemaNode?: Node
      },
    ) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        if (!data.name || !data.description) {
          throw new Error('Name is required')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const tool = await getRepository('ToolDefinition').save({
          ...data,
          name: `${data.name}`,
          description: `${data.description}`,
          session_id: sessionId,
        })
        if (!tool) {
          throw new Error('Failed create tool.')
        }
        const toolNode = await createOrUpdateFlowNode({
          source_id: tool.id,
          source_type: 'ToolDefinition',
          node_type: FlowNodeTypeEnum.ToolDefinition,
          x: initialX,
          y: initialY + 20,
        })
        if (!toolNode) {
          throw new Error('Failed to save node')
        }
        if (options?.schemaNode) {
          await createOrUpdateFlowEdge({
            source: options.schemaNode.id,
            target: toolNode.id,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode, createOrUpdateFlowEdge],
  )

  return {
    loading,
    createTool,
  }
}
