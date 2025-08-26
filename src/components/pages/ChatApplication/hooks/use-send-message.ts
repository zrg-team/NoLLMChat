import { useCallback, useState } from 'react'
import { PromptTemplate } from '@langchain/core/prompts'
import { MessageNodeProps } from 'src/components/flows/Nodes/chat/MessageNode/type'
import { FlowNodePlaceholderTypeEnum, LLMStatusEnum, Schema } from 'src/services/database/types'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import { Message } from 'ai/react'
import { llmHandler } from 'src/handlers'
import { useConfirmPassphrase } from 'src/hooks/mutations/use-confirm-passphrase'
import { useChatApplicationData } from './use-chat-application-data'
import { embeddingHandler } from 'src/handlers/embedding-handler'

type CreateMessageOption = {
  schema?: Schema
  onMessageUpdate: (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => void
  onResponseMessageCreate: (message?: string) => void
  onInjectedMessages: (messages: BaseMessage[]) => void
}
export const useSendMessage = (chatApplicationData: ReturnType<typeof useChatApplicationData>) => {
  const [loading] = useState(false)
  const { confirmPassphrase } = useConfirmPassphrase()

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
              await confirmPassphrase()
              const documents = await embeddingHandler.similaritySearchWithScore(
                chatApplicationData?.mainEmbeddingInfo?.embedding,
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
    [chatApplicationData?.mainEmbeddingInfo?.embedding, confirmPassphrase],
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

      await confirmPassphrase()
      const response = await llmHandler.stream(
        chatApplicationData.mainLLMInfo.llm.provider,
        [...injectedMessages, ...formatedMessages],
        {
          schemas: schema ? [schema] : undefined,
          llm: chatApplicationData.mainLLMInfo.llm,
          onMessageUpdate: ({ content }) => {
            onMessageUpdate?.({
              nodeData: {
                loading: true,
                content: content,
              },
            })
          },
        },
      )

      onMessageUpdate?.({
        nodeData: {
          content: response?.content,
        },
      })
      return response?.content
    },
    [handlePlaceholders, confirmPassphrase, chatApplicationData.mainLLMInfo],
  )

  return {
    loading,
    sendMessage,
  }
}
