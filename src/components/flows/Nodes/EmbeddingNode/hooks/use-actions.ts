import { useCallback, useEffect } from 'react'
import { useInternalNode, useNodes } from '@xyflow/react'
import { FlowNodePlaceholderTypeEnum, FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { SYSTEM_NODE_IDS } from 'src/constants/nodes'

export const useActions = (id: string) => {
  const currentSessionId = useSessionState((state) => state.currentSession?.id)
  const node = useInternalNode(id)
  const nodes = useNodes()

  const updateNodes = useFlowState((state) => state.updateNodes)

  const changeLLMOptions = useCallback(
    async (options: Record<string, unknown>) => {
      if (node && currentSessionId) {
        let flowNode =
          id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL
            ? await getRepository('FlowNode').findOne({
                where: { id },
              })
            : undefined
        if (!flowNode) {
          const flowNodePlaceholder = await getRepository('FlowNodePlaceholder').save({
            placeholder_type: FlowNodePlaceholderTypeEnum.DEFAULT_EMBEDDING_MODEL,
            data: options,
            session_id: currentSessionId,
          })
          flowNode = await getRepository('FlowNode').save({
            node_type: FlowNodeTypeEnum.DefaultEmbeddingModel,
            session_id: currentSessionId,
            source_type: 'FlowNodePlaceholder',
            source_id: flowNodePlaceholder.id,
            x: node.position.x,
            y: node.position.y,
          })
        } else {
          await getRepository('FlowNodePlaceholder').update(flowNode.source_id, { data: options })
        }
      }
    },
    [currentSessionId, id, node],
  )

  useEffect(() => {
    if (id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL) return

    const embeddingNode = nodes.find(
      (n) =>
        n.type === FlowNodeTypeEnum.DefaultEmbeddingModel &&
        n.id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL,
    )
    if (embeddingNode) {
      updateNodes([{ id, type: 'remove' as const }])
    }
  }, [id, nodes, updateNodes])

  return {
    changeLLMOptions,
  }
}
