import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  PromptTypeEnum,
  Thread,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreatePrompt = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createPrompt = useCallback(
    async (
      source: Node,
      options: {
        content: string
        prefix?: string
        type?: `${PromptTypeEnum}`
        role?: `${MessageRoleEnum}`
        thread?: Thread
      },
    ) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const prompt = await getRepository('Prompt').save({
          content: options.content,
          prefix: options.prefix,
          role: options.role || MessageRoleEnum.System,
          status: MessageStatusEnum.Started,
          session_id: sessionId,
          type: options.type || PromptTypeEnum.Chat,
        })
        if (!prompt) {
          throw new Error('Failed to save prompt')
        }
        const promptNode = await createOrUpdateFlowNode({
          source_id: prompt.id,
          source_type: 'Prompt',
          node_type: FlowNodeTypeEnum.Prompt,
          x: initialX,
          y: initialY + 20,
        })
        if (!promptNode) {
          throw new Error('Failed to save prompt node')
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode],
  )

  return {
    loading,
    createPrompt,
  }
}
