import { HumanMessage } from '@langchain/core/messages'
import { Connection, Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  Schema,
  Thread,
} from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm/state'
import { useFlowState } from 'src/states/flow'
import { buildHistories } from 'src/utils/build-message-history'

export const useCreateMessage = () => {
  const { t } = useTranslation('create_new_message')
  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const structuredStream = useLocalLLMState((state) => state.structuredStream)
  const stream = useLocalLLMState((state) => state.stream)

  const prepareThreadConnections = useCallback(
    (thread: Thread, connectedNodes: Node[], connections: Connection[]) => {
      const threadNode = connectedNodes?.find((node) => {
        if (typeof node.data.entity === 'object' && node.data.entity && 'id' in node.data.entity) {
          return node.type === FlowNodeTypeEnum.Thread && node.data.entity.id === thread.id
        }
        return false
      })
      const threadConnections = connections?.filter(
        (connection) => connection.target === threadNode?.id,
      )
      const threadPromptNodes = (connectedNodes || []).filter(
        (node) =>
          node?.type === FlowNodeTypeEnum.Prompt &&
          threadConnections?.some((c) => c.source === node.id),
      )
      const threadPromptNodeResult: { node: Node; connectedNodes?: Node[] }[] = []
      if (threadPromptNodes?.length) {
        threadPromptNodes.forEach((threadPromptNode) => {
          const promptConnection = connections?.find(
            (connection) => connection.target === threadPromptNode.id,
          )
          const csvDataNode = connectedNodes?.find(
            (node) =>
              node.type === FlowNodeTypeEnum.CSVData && promptConnection?.source === node.id,
          )
          threadPromptNodeResult.push({
            node: threadPromptNode,
            connectedNodes: csvDataNode ? [csvDataNode] : [],
          })
        })
      }

      const schemaNode = connectedNodes?.find((node) => node.type === FlowNodeTypeEnum.Schema)

      return {
        threadNode,
        schemaNode,
        threadPromptNodes: threadPromptNodeResult,
      }
    },
    [],
  )

  const prepareThreadHistory = useCallback(
    (connectedNodes: Node[], threadPromptNodes: { node: Node; connectedNodes?: Node[] }[]) => {
      const messageNodes =
        connectedNodes
          ?.filter((node) => node.type === FlowNodeTypeEnum.Message)
          .map((node) => ({ node: node, connectedNodes: [] as Node[] }))
          .reverse() || []

      threadPromptNodes.forEach(async (threadPromptNode) => {
        if (threadPromptNode) {
          messageNodes.unshift({
            node: threadPromptNode.node,
            connectedNodes: threadPromptNode.connectedNodes || [],
          })
        }
      })
      return buildHistories(messageNodes)
    },
    [],
  )

  const createMessage = useCallback(
    async (
      source: Node,
      thread: Thread,
      input: string,
      options: {
        onMessageUpdate: (info: { id?: string; content: string; finish?: boolean }) => void
        connectedNodes?: Node[]
        connections?: Connection[]
      },
    ) => {
      if (!source || !thread) {
        throw new Error('Source or thread is not found')
      }
      const { threadNode, schemaNode, threadPromptNodes } = prepareThreadConnections(
        thread,
        options.connectedNodes || [],
        options.connections || [],
      )
      if (!threadNode) {
        throw new Error('Thread node is not found')
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
              content: t('initial_ai_message'),
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
            const schema = schemaNode?.data?.entity as Schema

            const histories = prepareThreadHistory(options.connectedNodes || [], threadPromptNodes)
            const streamResponse = schema?.schema_items?.length
              ? structuredStream?.(schema.schema_items, [...histories, new HumanMessage(input)])
              : stream?.([...histories, new HumanMessage(input)])
            if (!stream) {
              throw new Error('Stream is not supported')
            }
            let content = ''
            let response = ''
            const chunks: string[] = []
            for await (const chunk of streamResponse) {
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
          await getRepository('Message').update(`${aiMessageId}`, {
            status: MessageStatusEnum.Failed,
            content: t('errors.ai_message_content_failed'),
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [
      prepareThreadConnections,
      prepareThreadHistory,
      createOrUpdateFlowNode,
      createOrUpdateFlowEdge,
      t,
      structuredStream,
      stream,
    ],
  )

  return {
    loading,
    createMessage,
  }
}
