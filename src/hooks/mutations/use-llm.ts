import { useCallback } from 'react'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import { useLocalLLM } from 'src/services/local-llm'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'

import { useLangchainLLM } from './use-langchain-llm'

export const useLLM = () => {
  const localLLM = useLocalLLM()
  const langchainLLM = useLangchainLLM()

  const stream = useCallback(
    (
      provider: `${LLMProviderEnum}`,
      messages: BaseMessage[],
      info?: {
        schemas?: Schema[]
        tools?: {
          name: string
          description: string
          schemaItems: SchemaItem[]
        }[]
        onMessageUpdate?: (data: { content: string; chunk?: BaseMessageChunk }) => void
        onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
        llm?: LLM
      },
    ) => {
      switch (provider) {
        case LLMProviderEnum.WebLLM:
          return localLLM.stream(messages, info)
        case LLMProviderEnum.OpenAI:
          return langchainLLM.stream(messages, {
            ...info,
            provider,
          })
        default:
          throw new Error('Provider is not supported')
      }
    },
    [langchainLLM, localLLM],
  )

  return {
    stream,
  }
}
