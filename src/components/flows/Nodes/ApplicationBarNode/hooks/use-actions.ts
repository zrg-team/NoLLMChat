import { useCallback, useState } from 'react'
import { useInternalNode } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'

import { DEFAULT_NODE_SIZE } from '../constants'

export const useActions = (id: string) => {
  const node = useInternalNode(id)
  const currentSession = useSessionState((state) => state.currentSession)
  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createNode = useCallback(
    async (nodeType: FlowNodeTypeEnum) => {
      try {
        setLoading(true)
        if (node && currentSession?.id) {
          const initialX = node.position?.x || 0
          const initialY = (node.position?.y || 0) + (node.measured?.height || 0)

          const nodeData = await getRepository('FlowNodeData').save({
            data: {},
            session_id: currentSession.id,
          })

          if (!nodeData) {
            throw new Error('Failed to save node data')
          }

          const newNode = await createOrUpdateFlowNode({
            node_type: nodeType,
            data: {},
            source_id: nodeData.id,
            source_type: 'FlowNodeData',
            x: initialX,
            y: initialY + 20,
            ...(DEFAULT_NODE_SIZE[nodeType] || {}),
          })
          if (!newNode) {
            throw new Error('Failed to save node')
          }
        }
      } finally {
        setLoading(false)
      }
    },
    [createOrUpdateFlowNode, currentSession?.id, node],
  )

  return {
    loading,
    createNode,
  }
}
