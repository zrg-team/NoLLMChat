import { HumanMessage } from '@langchain/core/messages'
import { Connection, Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageNodeData } from 'src/components/flows/Nodes/MessageNode/type'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  MessageRoleEnum,
  MessageStatusEnum,
  Schema,
  SchemaItem,
  Thread,
  ToolDefinition,
} from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'
import { useFlowState } from 'src/states/flow'
import { buildHistories } from 'src/utils/build-message-history'

type CreateMessageOption = {
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeData> }) => void
  connectedNodes?: Node[]
  connections?: Connection[]
}
export const useCreateMessage = () => {
  const { t } = useTranslation('create_new_message')
  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const toolsCallingStream = useLocalLLMState((state) => state.toolsCallingStream)
  const structuredStream = useLocalLLMState((state) => state.structuredStream)
  const getCurrentModelInfo = useLocalLLMState((state) => state.getCurrentModelInfo)
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
      // Prompt connection
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
          if (threadPromptNode) {
            threadPromptNodeResult.push({
              node: threadPromptNode,
              connectedNodes: csvDataNode ? [csvDataNode] : [],
            })
          }
        })
      }
      // Tool connection
      const toolIds: string[] = []
      const threadToolsNodes = (connectedNodes || []).filter((node) => {
        const tool =
          !toolIds.includes(node.id) &&
          node?.type === FlowNodeTypeEnum.ToolDefinition &&
          threadConnections?.some((c) => c.source === node.id)
        if (tool) {
          toolIds.push(node.id)
        }
        return tool
      })
      const threadToolNodeResult: { node: Node; connectedNodes?: Node[] }[] = []
      if (threadToolsNodes?.length) {
        threadToolsNodes.forEach((threadToolNode) => {
          const toolConnection = connections?.find(
            (connection) => connection.target === threadToolNode.id,
          )
          const toolSchema = connectedNodes?.find(
            (node) => node.type === FlowNodeTypeEnum.Schema && toolConnection?.source === node.id,
          )
          if (toolSchema && toolConnection) {
            threadToolNodeResult.push({
              node: threadToolNode,
              connectedNodes: toolSchema ? [toolSchema] : [],
            })
          }
        })
      }
      // Schema connection
      const schemaNode = connectedNodes?.find((node) => node.type === FlowNodeTypeEnum.Schema)

      return {
        threadNode,
        schemaNode,
        threadPromptNodes: threadPromptNodeResult,
        threadToolNodes: threadToolNodeResult,
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

  const insertMessages = useCallback(
    async ({
      content,
      threadId,
      sourceId,
      initialX,
      initialY,
      initialLLMId,
    }: {
      content: string
      threadId: string
      sourceId: string
      initialX: number
      initialY: number
      initialLLMId: string
    }) => {
      const humanMessage = await getRepository('Message').save({
        thread_id: threadId,
        content,
        role: MessageRoleEnum.Human,
        status: MessageStatusEnum.Started,
        llm_id: initialLLMId,
      })
      if (!humanMessage) {
        throw new Error('Failed to save message')
      }

      const humanMessageNode = await createOrUpdateFlowNode({
        source_id: humanMessage.id,
        source_type: 'Message',
        node_type: FlowNodeTypeEnum.Message,
        x: initialX,
        y: initialY + 80,
      })
      if (!humanMessageNode) {
        throw new Error('Failed to save human message node')
      }
      await createOrUpdateFlowEdge({
        source: sourceId,
        target: humanMessageNode.id,
      })
      const aiMessage = await getRepository('Message').save({
        thread_id: threadId,
        content: t('initial_ai_message'),
        role: MessageRoleEnum.AI,
        status: MessageStatusEnum.Inprogress,
        llm_id: initialLLMId,
        parent_message_id: humanMessage.id,
      })
      if (!aiMessage) {
        throw new Error('Failed to save message')
      }
      const aiMessageNode = await createOrUpdateFlowNode({
        source_id: aiMessage.id,
        source_type: 'Message',
        node_type: FlowNodeTypeEnum.Message,
        x: initialX,
        y: initialY + 250,
      })
      if (!aiMessageNode) {
        throw new Error('Failed to save ai message node')
      }
      await createOrUpdateFlowEdge({
        source: humanMessageNode.id,
        target: aiMessageNode.id,
      })

      return {
        aiMessage,
        humanMessage,
        aiMessageNode,
        humanMessageNode,
      }
    },
    [createOrUpdateFlowEdge, createOrUpdateFlowNode, t],
  )

  const invokeMessage = useCallback(
    async (
      messagesInfo: Awaited<ReturnType<typeof insertMessages>>,
      threadConnection: ReturnType<typeof prepareThreadConnections>,
      { onMessageUpdate, connectedNodes }: CreateMessageOption,
    ) => {
      const { schemaNode, threadPromptNodes, threadToolNodes } = threadConnection
      const histories = prepareThreadHistory(connectedNodes || [], threadPromptNodes)

      const schema = schemaNode?.data?.entity as Schema

      let streamResponse: ReturnType<typeof stream> | ReturnType<typeof structuredStream>
      const messages = [...histories, new HumanMessage(messagesInfo.humanMessage.content)]
      if (threadToolNodes?.length) {
        streamResponse = toolsCallingStream(
          threadToolNodes.reduce(
            (all: { name: string; description: string; schemaItems: SchemaItem[] }[], item) => {
              const toolEntity = item.node.data?.entity as ToolDefinition
              const toolSchemaEnity = item?.connectedNodes?.find(
                (node) => node.type === FlowNodeTypeEnum.Schema,
              )?.data?.entity as Schema
              if (toolEntity && toolSchemaEnity?.schema_items?.length) {
                all.push({
                  name: toolEntity.name,
                  description: toolEntity.description,
                  schemaItems: toolSchemaEnity.schema_items,
                })
              }
              return all
            },
            [],
          ),
          messages,
        )
      } else if (schema?.schema_items?.length) {
        streamResponse = structuredStream(schema.schema_items, messages)
      } else {
        streamResponse = stream(messages)
      }

      if (!streamResponse) {
        throw new Error('Stream is not supported')
      }

      let content = ''
      let response = ''
      let lastChunk
      const chunks: string[] = []
      for await (const chunk of streamResponse) {
        if (!chunk) {
          continue
        }
        if (Array.isArray(chunk)) {
          chunks.push(...chunk.map((c) => c.content))
          if (chunks?.length) {
            response = chunks.join('')
            onMessageUpdate?.({
              id: messagesInfo.aiMessageNode.id,
              nodeData: {
                loading: true,
                content: response,
              },
            })
          }
        } else {
          content =
            typeof chunk === 'object' && 'content' in chunk ? `${chunk.content}` : `${chunk}`

          onMessageUpdate?.({
            id: messagesInfo.aiMessageNode.id,
            nodeData: {
              loading: true,
              content,
            },
          })
        }
        lastChunk = chunk
      }

      messagesInfo.aiMessage.content = content
      messagesInfo.aiMessage.metadata = JSON.stringify({
        message: lastChunk,
      })
      onMessageUpdate?.({
        id: messagesInfo.aiMessageNode.id,
        nodeData: {
          content,
          loading: false,
          entity: messagesInfo.aiMessage,
        },
      })
      if (messagesInfo.aiMessage.id) {
        await getRepository('Message').update(messagesInfo.aiMessage.id, {
          content: content,
          metadata: JSON.stringify({
            message: lastChunk,
          }),
        })
      }
      return content
    },
    [prepareThreadHistory, stream, structuredStream, toolsCallingStream],
  )

  const createMessage = useCallback(
    async (source: Node, thread: Thread, content: string, options: CreateMessageOption) => {
      if (!source || !thread) {
        throw new Error('Source or thread is not found')
      }
      const modelInfo = await getCurrentModelInfo()
      if (!modelInfo) {
        throw new Error('Model is not loaded yet')
      }
      const threadConnections = prepareThreadConnections(
        thread,
        options.connectedNodes || [],
        options.connections || [],
      )
      if (!threadConnections?.threadNode) {
        throw new Error('Thread node is not found')
      }

      let messagesInfo: Awaited<ReturnType<typeof insertMessages>> | undefined
      try {
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        messagesInfo = await insertMessages({
          content,
          initialX,
          initialY,
          sourceId: source.id,
          threadId: thread.id,
          initialLLMId: thread.initial_llm_id,
        })
        await invokeMessage(messagesInfo, threadConnections, options)
        await getRepository('Message').update(`${messagesInfo.aiMessage.id}`, {
          status: MessageStatusEnum.Success,
        })
        messagesInfo.aiMessage.status = MessageStatusEnum.Success
        options.onMessageUpdate({
          id: messagesInfo.aiMessageNode.id,
          nodeData: {
            entity: messagesInfo.aiMessage,
            loading: false,
          },
        })
      } catch {
        if (messagesInfo?.aiMessage) {
          await getRepository('Message').update(`${messagesInfo.aiMessage.id}`, {
            status: MessageStatusEnum.Failed,
            content: t('errors.ai_message_content_failed'),
          })
        }
        if (messagesInfo?.aiMessageNode.id) {
          options?.onMessageUpdate({
            id: messagesInfo.aiMessageNode.id,
            nodeData: {
              content: t('errors.ai_message_content_failed'),
              loading: false,
            },
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [getCurrentModelInfo, prepareThreadConnections, insertMessages, invokeMessage, t],
  )

  return {
    loading,
    createMessage,
  }
}
