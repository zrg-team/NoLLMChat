import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { Node } from '@xyflow/react'
import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  Message,
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  Thread,
} from 'src/services/database/types'
import { LocalLLMContext } from 'src/services/llm/provider'
import { useFlowState } from 'src/states/flow'

export const useCreateNewMessage = () => {
  const { t } = useTranslation('create-new-message')
  const [loading, setLoading] = useState(false)
  const llmContext = useContext(LocalLLMContext)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

  const buildHistories = useCallback((nodes: Node[]) => {
    const histories: BaseMessage[] = []
    nodes.forEach((node) => {
      if (!node.data?.entity) {
        return
      }
      if (node.type === FlowNodeTypeEnum.Message) {
        const message = node.data.entity as Message
        switch (message.role) {
          case 'human':
            histories.push(new HumanMessage(message.content))
            break
          case 'ai':
            histories.push(new AIMessage(message.content))
            break
        }
      } else if (node.type === FlowNodeTypeEnum.Prompt) {
        const prompt = node.data.entity as Prompt
        switch (prompt.role) {
          case 'human':
            histories.push(new HumanMessage(prompt.content))
            break
          case 'system':
            histories.push(new SystemMessage(prompt.content))
            break
          default:
            histories.push(new AIMessage(prompt.content))
            break
        }
      }
    })
    return histories
  }, [])

  const createMessage = useCallback(
    async (
      source: Node,
      thread: Thread,
      input: string,
      options: {
        onMessageUpdate: (info: { id?: string; content: string; finish?: boolean }) => void
        connectedNodes?: Node[]
      },
    ) => {
      if (!source || !thread) {
        return
      }
      let aiMessageId: string | undefined
      let aiMessageNodeId: string | undefined
      try {
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)
        const humanMessage = await getRepository('Message').save({
          thread_id: thread.id,
          content: input,
          role: MessageRoleEnum.Human,
          status: MessageStatusEnum.Started,
          llm_id: thread.initial_llm_id,
        })
        if (!humanMessage) {
          throw new Error('Failed to save message')
        }
        await Promise.all([
          (async () => {
            const humanMessageNode = await createOrUpdateFlowNode({
              source_id: humanMessage.id,
              source_type: 'Message',
              node_type: FlowNodeTypeEnum.Message,
              x: initialX,
              y: initialY,
            })
            if (!humanMessageNode) {
              throw new Error('Failed to save human message node')
            }
            await createOrUpdateFlowEdge({
              source: source.id,
              target: humanMessageNode.id,
            })
            const aiMessage = await getRepository('Message').save({
              thread_id: thread.id,
              content: t('initial-ai-message'),
              role: MessageRoleEnum.AI,
              status: MessageStatusEnum.Started,
              llm_id: thread.initial_llm_id,
              parent_message_id: humanMessage.id,
            })
            if (!aiMessage) {
              throw new Error('Failed to save message')
            }
            aiMessageId = aiMessage.id
            const aiMessageNode = await createOrUpdateFlowNode({
              source_id: aiMessage.id,
              source_type: 'Message',
              node_type: FlowNodeTypeEnum.Message,
              x: initialX,
              y: initialY + 120,
            })
            if (!aiMessageNode) {
              throw new Error('Failed to save ai message node')
            }
            aiMessageNodeId = aiMessageNode.id
            await createOrUpdateFlowEdge({
              source: humanMessageNode.id,
              target: aiMessageNode.id,
            })
          })(),
          (async () => {
            const histories = buildHistories(options?.connectedNodes || [])
            const stream = llmContext.stream?.([...histories, new HumanMessage(input)])
            if (!stream) {
              throw new Error('Stream is not supported')
            }
            let content = ''
            let response = ''
            const chunks: string[] = []
            for await (const chunk of stream) {
              if (chunk && Array.isArray(chunk)) {
                chunks.push(...chunk.map((c) => c.content))
                if (chunks?.length) {
                  response = chunks.join('')
                  options.onMessageUpdate?.({
                    id: aiMessageNodeId,
                    content: response,
                  })
                }
                content = chunks.join('')
              } else if (typeof chunk === 'string') {
                options.onMessageUpdate?.({
                  id: aiMessageNodeId,
                  content: response,
                })
                content = chunk
              }
            }
            options.onMessageUpdate?.({
              id: aiMessageNodeId,
              content,
              finish: true,
            })
            if (aiMessageId) {
              await getRepository('Message').update(aiMessageId, {
                content: content,
              })
            }
            return content
          })(),
        ])
      } catch {
        if (aiMessageId) {
          await getRepository('Message').update(aiMessageId, {
            status: MessageStatusEnum.Failed,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [createOrUpdateFlowNode, createOrUpdateFlowEdge, t, buildHistories, llmContext],
  )

  return {
    loading,
    createMessage,
  }
}
