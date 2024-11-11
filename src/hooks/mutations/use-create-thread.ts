import { useState, useCallback } from 'react'
import { Node } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import { FlowNodeTypeEnum, LLM, Schema } from 'src/services/database/types'
import { ThreadStatusEnum } from 'src/services/database/types/thread'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateThread = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)

  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const createThread = useCallback(
    async (
      source: Node,
      options?: {
        connectedNodes?: Node[]
      },
    ) => {
      setLoading(true)
      try {
        const llm = source.data?.entity as LLM
        if (!llm || !sessionId) {
          throw new Error('LLM or Session not found')
        }
        const schema = (await options?.connectedNodes?.find(
          (node) => node.type === FlowNodeTypeEnum.Schema,
        )?.data?.entity) as Schema
        const initialX = source.position.x
        const initialY = source.position.y + (source.measured?.height || 0)
        const thread = await getRepository('Thread').save({
          initial_llm_id: llm.id,
          title: `New thread with ${llm.name}`,
          status: ThreadStatusEnum.Started,
          messages: [],
          session_id: sessionId,
          schema_id: schema?.id,
        })
        const flowNode = await createOrUpdateFlowNode({
          source_id: thread.id,
          source_type: 'Thread',
          node_type: FlowNodeTypeEnum.Thread,
          x: initialX,
          y: initialY + 60,
        })
        if (!flowNode) {
          throw new Error('Failed to create thread node')
        }
        // Create connection from source to threadNode
        const flowEdge = await createOrUpdateFlowEdge({
          source: source.id,
          target: flowNode.id,
        })

        return {
          thread,
          flowNode,
          flowEdge,
        }
      } finally {
        setLoading(false)
      }
    },
    [createOrUpdateFlowEdge, createOrUpdateFlowNode, sessionId],
  )

  return {
    loading,
    createThread,
  }
}
