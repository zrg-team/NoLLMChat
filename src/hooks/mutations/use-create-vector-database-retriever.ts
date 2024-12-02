import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  PromptTypeEnum,
  VectorDatabase,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateVectorDatabaseRetriever = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

  const createVectorDatabaseRetriever = useCallback(
    async ({
      prompt,
      source,
      metadata,
    }: {
      source: Node
      prompt?: Partial<Prompt>
      metadata?: Record<string, unknown>
    }) => {
      try {
        const vectorDatabase = source?.data?.entity as VectorDatabase
        if (!vectorDatabase || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const systempPrompt = await getRepository('Prompt').save({
          ...prompt,
          status: prompt?.status || MessageStatusEnum.Started,
          role: prompt?.role || MessageRoleEnum.System,
          type: prompt?.type || PromptTypeEnum.Chat,
          content: prompt?.content || '{context}',
          session_id: sessionId,
        })
        if (!systempPrompt) {
          throw new Error('Failed to save prompt')
        }
        const systemPromptNode = await createOrUpdateFlowNode({
          source_id: systempPrompt.id,
          source_type: 'Prompt',
          node_type: FlowNodeTypeEnum.Prompt,
          x: initialX,
          y: initialY + 20,
        })
        if (!systemPromptNode) {
          throw new Error('Failed to save prompt node')
        }
        const retriever = await getRepository('FlowNodePlaceholder').save({
          placeholder: `Retriever for ${vectorDatabase.name}`,
          placeholder_type: FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER,
          session_id: sessionId,
          metadata,
        })
        if (!retriever) {
          throw new Error('Failed to save node placeholder')
        }
        const retrieverNode = await createOrUpdateFlowNode({
          source_id: retriever.id,
          source_type: 'FlowNodePlaceholder',
          node_type: FlowNodeTypeEnum.PlaceHolder,
          x: initialX,
          y: initialY + 40,
        })
        if (!retrieverNode) {
          throw new Error('Failed to save node placeholder node')
        }
        await createOrUpdateFlowEdge({
          source: systemPromptNode.id,
          target: retrieverNode.id,
        })
        await createOrUpdateFlowEdge({
          source: source.id,
          target: retrieverNode.id,
        })
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode, createOrUpdateFlowEdge],
  )

  return {
    loading,
    createVectorDatabaseRetriever,
  }
}
