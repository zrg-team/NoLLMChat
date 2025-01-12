import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import { sessionMemory } from 'src/utils/session-memory'

export const useLangchainLLM = () => {
  const stream = useCallback(
    async (
      messages: BaseMessage[],
      info?: {
        schemas?: Schema[]
        tools?: {
          name: string
          description: string
          schemaItems: SchemaItem[]
        }[]
        onMessageUpdate?: (data: { content: string; chunk: BaseMessageChunk }) => void
        onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
        provider?: `${LLMProviderEnum}`
        sessionMemoryKey?: string
      },
    ) => {
      if (!info?.sessionMemoryKey || !sessionMemory?.[info?.sessionMemoryKey]) {
        throw new Error('API key is not found')
      }
      switch (info.provider) {
        case LLMProviderEnum.OpenAI:
          {
            const model = new ChatOpenAI({
              apiKey: sessionMemory?.openaikey,
            })
            const streamResponse = await model.stream(messages)

            let content = ''
            let lastChunk: BaseMessageChunk | undefined
            for await (const data of streamResponse) {
              content += `${data.content}`
              lastChunk = data
              info?.onMessageUpdate?.({ content: `${data.content}`, chunk: data })
            }

            info?.onMessageFinish?.({
              content,
              lastChunk,
            })
            return {
              lastChunk,
              content,
            }
          }
          break
        default:
          throw new Error('Provider is not supported')
      }
    },
    [],
  )

  return {
    stream,
  }
}
