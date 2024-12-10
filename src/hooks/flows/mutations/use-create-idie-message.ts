import { Node } from '@xyflow/react'
import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  Thread,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'

export const useCreateIdieMessage = () => {
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

  const createIdieMessage = useCallback(
    async (
      source: Node,
      thread: Thread,
      input: string,
      options?: {
        promptNode?: Node
      },
    ) => {
      if (!source || !thread) {
        return
      }
      const prompt = options?.promptNode?.data?.entity as Prompt
      // This is node thead replaced with message node
      const initialX = source.position?.x || 0
      const initialY = (source.position?.y || 0) + (source.measured?.height || 0)
      const newMessage = await getRepository('Message').save({
        thread_id: thread.id,
        content: input,
        role: prompt?.role || MessageRoleEnum.Human,
        status: MessageStatusEnum.Started,
        llm_id: thread.initial_llm_id,
      })
      if (!newMessage) {
        throw new Error('Failed to save message')
      }
      const newMessageNode = await createOrUpdateFlowNode({
        source_id: newMessage.id,
        source_type: 'Message',
        node_type: FlowNodeTypeEnum.Message,
        x: initialX,
        y: initialY,
      })
      if (!newMessageNode) {
        throw new Error('Failed to save message node')
      }
      const edgeToNewMessage = await createOrUpdateFlowEdge({
        source: source.id,
        target: newMessageNode.id,
      })
      let edgeToPrompt
      if (options?.promptNode) {
        edgeToPrompt = await createOrUpdateFlowEdge({
          source: options?.promptNode.id,
          target: newMessageNode.id,
        })
      }
      return {
        message: newMessage,
        edgeToPrompt,
        messageNode: newMessageNode,
        messageEdge: edgeToNewMessage,
      }
    },
    [createOrUpdateFlowNode, createOrUpdateFlowEdge],
  )

  return {
    createIdieMessage,
  }
}
