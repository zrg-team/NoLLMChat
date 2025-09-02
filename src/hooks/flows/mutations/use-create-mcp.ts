import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database/database'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateMcp = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createMcp = useCallback(
    async (
      source: Node,
      options: {
        key?: string
        url?: string
      },
    ) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        if (!options.key || !options.url) {
          throw new Error('MCP data is missing')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const mcp = await getRepository('Mcp').save({
          key: options.key,
          url: options.url,
          session_id: sessionId,
        })
        if (!mcp) {
          throw new Error('Failed to save MCP')
        }
        const mcpNode = await createOrUpdateFlowNode({
          source_id: mcp.id,
          source_type: 'Mcp',
          node_type: FlowNodeTypeEnum.MCP,
          x: initialX,
          y: initialY + 20,
        })
        if (!mcpNode) {
          throw new Error('Failed to save MCP node')
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode],
  )

  return {
    loading,
    createMcp,
  }
}
