import { useCallback, useState } from 'react'
import { PromptTemplate } from '@langchain/core/prompts'
import { MessageNodeProps } from 'src/components/flows/Nodes/MessageNode/type'
import { FlowNodePlaceholderTypeEnum, LLMStatusEnum, Schema } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { Message } from 'ai/react'
import { useLLM } from 'src/hooks/mutations/use-llm'
import { useChatApplicationData } from './use-chat-application-data'

type CreateMessageOption = {
  schema?: Schema
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
  onResponseMessageCreate: (message?: string) => void
  onInjectedMessages: (messages: BaseMessage[]) => void
}
export const useSendMessage = (chatApplicationData: ReturnType<typeof useChatApplicationData>) => {
  const [loading] = useState(false)
  const similaritySearchWithScore = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const { stream } = useLLM()

  const handlePlaceholders = useCallback(
    async (
      content: string,
      retriverInfo: ReturnType<typeof useChatApplicationData>['retriverInfo'],
    ): Promise<BaseMessage[]> => {
      if (!retriverInfo?.length) {
        return []
      }
      const injectedMessages: BaseMessage[] = []
      await Promise.all(
        retriverInfo.map(async (item) => {
          const placeholderRecord = item.placeholderEntity
          if (!placeholderRecord) {
            return
          }
          switch (placeholderRecord.placeholder_type) {
            case FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER: {
              if (
                !item.promptNode ||
                !item.promptEntity ||
                !item.vectorDatabaseNode ||
                !item.vectorDatabaseEntity
              ) {
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
                  database: {
                    databaseId: item.vectorDatabaseEntity.id,
                  },
                },
                content,
                k,
              )
              if (!documents) {
                return []
              }
              const template = new PromptTemplate({
                template: item.promptEntity.content,
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
      {
        retriverInfo,
      }: {
        retriverInfo?: ReturnType<typeof useChatApplicationData>['retriverInfo']
      },
      { schema, onMessageUpdate, onResponseMessageCreate, onInjectedMessages }: CreateMessageOption,
    ) => {
      if (
        !chatApplicationData.mainLLMInfo?.llm ||
        chatApplicationData.mainLLMInfo?.status !== LLMStatusEnum.Loaded
      ) {
        throw new Error('LLM not found')
      }

      const injectedMessages: BaseMessage[] = []

      if (retriverInfo?.length) {
        injectedMessages.push(...(await handlePlaceholders(message, retriverInfo)))
        onInjectedMessages?.(injectedMessages)
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

      onResponseMessageCreate?.()

      const { content } = await stream(
        chatApplicationData.mainLLMInfo.llm.provider,
        formatedMessages,
        {
          schemas: schema ? [schema] : undefined,
          onMessageUpdate: ({ content }) => {
            onMessageUpdate?.({
              nodeData: {
                loading: true,
                content: content,
              },
            })
          },
          llm: chatApplicationData.mainLLMInfo.llm,
        },
      )

      onMessageUpdate?.({
        nodeData: {
          content,
        },
      })
      return content
    },
    [handlePlaceholders, stream, chatApplicationData.mainLLMInfo],
  )

  return {
    loading,
    sendMessage,
  }
}
