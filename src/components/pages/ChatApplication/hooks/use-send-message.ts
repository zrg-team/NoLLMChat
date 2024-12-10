import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { PromptTemplate } from '@langchain/core/prompts'
import { MessageNodeProps } from 'src/components/flows/Nodes/MessageNode/type'
import {
  FlowNodePlaceholder,
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
  Prompt,
  VectorDatabase,
} from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { prepareThreadConnections } from 'src/utils/thread-conversation-traveling'
import { useLocalLLM } from 'src/services/local-llm/hooks/use-local-llm'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { getStorageDataSource } from 'src/utils/vector-storage'
import { Message } from 'ai/react'

type CreateMessageOption = {
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
}
export const useSendMessage = () => {
  const [loading] = useState(false)
  const similaritySearchWithScore = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )

  const { stream } = useLocalLLM()

  const handlePlaceholders = useCallback(
    async (
      content: string,
      threadConnection: ReturnType<typeof prepareThreadConnections> | undefined,
    ): Promise<BaseMessage[]> => {
      const { placeholders } = threadConnection || {}
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
              const dataSource = undefined
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
                  dataSourceId: dataSource,
                  dataSourceType: getStorageDataSource(dataSource),
                },
                content,
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
    [similaritySearchWithScore],
  )

  const sendMessage = useCallback(
    async (
      message: string,
      messages: Message[],
      threadConnection: ReturnType<typeof prepareThreadConnections> | undefined,
      _threadConversionNodes: Node[],
      { onMessageUpdate }: CreateMessageOption,
    ) => {
      const { tools, schemas, placeholders } = threadConnection || {}

      const injectedMessages: BaseMessage[] = []

      if (placeholders?.length) {
        injectedMessages.push(...(await handlePlaceholders(message, threadConnection)))
      }

      const formatedMessages = messages.map((message) => {
        if (message.role === 'system') {
          return new SystemMessage(message.content)
        }
        if (message.role === 'user') {
          return new HumanMessage(message.content)
        }
        return new AIMessage(message.content)
      })

      const { content } = await stream(formatedMessages, {
        tools,
        schemas,
        onMessageUpdate: ({ content }) => {
          onMessageUpdate?.({
            nodeData: {
              loading: true,
              content: content,
            },
          })
        },
      })

      onMessageUpdate?.({
        nodeData: {
          content,
        },
      })
      return content
    },
    [handlePlaceholders, stream],
  )

  return {
    loading,
    sendMessage,
  }
}
