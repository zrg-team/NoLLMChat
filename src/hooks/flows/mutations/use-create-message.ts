import { Node, useReactFlow } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PromptTemplate } from '@langchain/core/prompts'
import { MessageNodeProps } from 'src/components/flows/Nodes/MessageNode/type'
import { getRepository } from 'src/services/database'
import {
  CSVData,
  FlowNodePlaceholder,
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
  JSONData,
  JSONLData,
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  Thread,
  VectorDatabase,
} from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { useLocalLLMState } from 'src/services/local-llm'
import { useFlowState } from 'src/states/flow'
import {
  prepareThreadConnections,
  threadConversationTraveling,
} from 'src/utils/thread-conversation-traveling'
import { useLocalLLM } from 'src/services/local-llm/hooks/use-local-llm'
import { prepareThreadHistory } from 'src/utils/build-message-history'
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages'
import { getStorageDataSource } from 'src/utils/vector-storage'
import { DefaultNodeData } from 'src/utils/flow-node'

type CreateMessageOption = {
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
}
export const useCreateMessage = ({
  getNode,
  getHandleConnections,
}: Pick<
  ReturnType<typeof useReactFlow<Node<DefaultNodeData>>>,
  'getNode' | 'getHandleConnections'
>) => {
  const { t } = useTranslation('create_new_message')
  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const similaritySearchWithScore = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const getCurrentModelInfo = useLocalLLMState((state) => state.getCurrentModelInfo)

  const { stream } = useLocalLLM()

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

  const handlePlaceholders = useCallback(
    async (
      messagesInfo: Awaited<ReturnType<typeof insertMessages>>,
      threadConnection: ReturnType<typeof prepareThreadConnections>,
    ): Promise<BaseMessage[]> => {
      const { placeholders } = threadConnection
      if (!placeholders?.length) {
        return []
      }
      const injectedMessages: BaseMessage[] = []
      await Promise.all(
        placeholders.map(async (item) => {
          const placeholderRecord = item.node.data?.entity as FlowNodePlaceholder
          if (!placeholderRecord) {
            return
          }
          switch (placeholderRecord.placeholder_type) {
            case FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER: {
              const vectorNode = item.connectedNodes?.find(
                (node) => node.type === FlowNodeTypeEnum.VectorDatabase,
              )
              const vector = vectorNode?.data?.entity as VectorDatabase
              const prompt = item.connectedNodes?.find(
                (node) => node.type === FlowNodeTypeEnum.Prompt,
              )?.data?.entity as Prompt
              if (!prompt || !vector || !vectorNode) {
                return
              }
              const connections = getHandleConnections({
                nodeId: vectorNode.id,
                type: 'target',
              })
              const dataSourceNode = connections
                .map((connection) => getNode(connection.source))
                .find(
                  (node) =>
                    node?.type &&
                    [FlowNodeTypeEnum.JSONLData, FlowNodeTypeEnum.CSVData].includes(
                      node?.type as FlowNodeTypeEnum,
                    ),
                )
              const dataSource = dataSourceNode?.data?.entity as CSVData | JSONData | JSONLData
              if (!dataSource) {
                return
              }
              const k = placeholderRecord.metadata?.k ? +placeholderRecord.metadata?.k : 1
              let minimalScore = placeholderRecord.metadata?.minimalScore
                ? +placeholderRecord.metadata?.minimalScore
                : undefined
              if (minimalScore && minimalScore > 1) {
                minimalScore = minimalScore / 100
              }
              const documents = await similaritySearchWithScore(
                {
                  databaseId: vector.id,
                  dataSourceId: dataSource.id,
                  dataSourceType: getStorageDataSource(dataSource),
                },
                messagesInfo.humanMessage.content,
                k,
              )
              if (!documents) {
                return []
              }
              const template = new PromptTemplate({
                template: prompt.content,
                inputVariables: ['context'],
              })
              injectedMessages.push(
                new AIMessage(
                  await template.format({
                    context: !minimalScore
                      ? documents.map(([doc]) => doc.pageContent).join('\n')
                      : documents
                          .filter(([, score]) => score >= minimalScore)
                          .map(([doc]) => doc.pageContent)
                          .join('\n'),
                  }),
                ),
              )
            }
          }
        }),
      )
      return injectedMessages
    },
    [getHandleConnections, getNode, similaritySearchWithScore],
  )

  const invokeMessage = useCallback(
    async (
      messagesInfo: Awaited<ReturnType<typeof insertMessages>>,
      threadConnection: ReturnType<typeof prepareThreadConnections>,
      threadConversionNodes: Node[],
      { onMessageUpdate }: CreateMessageOption,
    ) => {
      const { prompts, tools, schemas, placeholders } = threadConnection

      const injectedMessages: BaseMessage[] = []

      if (placeholders?.length) {
        injectedMessages.push(...(await handlePlaceholders(messagesInfo, threadConnection)))
      }

      const { history: MessageHistory, systems } = prepareThreadHistory(
        threadConversionNodes,
        prompts,
      )
      const messages = [
        ...systems,
        ...injectedMessages,
        ...MessageHistory,
        new HumanMessage(messagesInfo.humanMessage.content),
      ]

      const { lastChunk, content } = await stream(messages, {
        tools,
        schemas,
        onMessageUpdate: ({ content }) => {
          onMessageUpdate?.({
            id: messagesInfo.aiMessageNode.id,
            nodeData: {
              loading: true,
              content: content,
            },
          })
        },
      })

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
    [handlePlaceholders, stream],
  )

  const createMessage = useCallback(
    async (source: Node, content: string, options: CreateMessageOption) => {
      const { nodes: threadConversionNodes } = threadConversationTraveling(
        [source.id],
        [],
        [],
        [],
        {
          getNode,
          getHandleConnections,
        },
      )
      const threadNode = threadConversionNodes.find((node) => node.type === FlowNodeTypeEnum.Thread)
      const thread = threadNode?.data.entity as Thread
      if (!source || !thread || !threadNode) {
        throw new Error('Source or thread is not found')
      }
      const modelInfo = await getCurrentModelInfo()
      if (!modelInfo) {
        throw new Error('Model is not loaded yet')
      }
      const threadConnections = prepareThreadConnections(threadNode, {
        getNode,
        getHandleConnections,
      })
      if (!threadConnections?.thread) {
        throw new Error('Thread node is not found')
      }

      let messagesInfo: Awaited<ReturnType<typeof insertMessages>> | undefined
      try {
        setLoading(true)
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
        await invokeMessage(messagesInfo, threadConnections, threadConversionNodes, options)
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
        return true
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
    [getCurrentModelInfo, getHandleConnections, getNode, insertMessages, invokeMessage, t],
  )

  return {
    loading,
    createMessage,
  }
}
