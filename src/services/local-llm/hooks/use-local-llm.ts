/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react'
import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import { LLM, LLMProviderEnum, Schema, SchemaItem } from 'src/services/database/types'
import { logWarn } from 'src/utils/logger'

import { handleStream } from '../utils/stream'
import { useLocalLLMState } from '../state'
import { useLocalLLMInfo } from './use-local-llm-info'

type StreamType = {
  schemas?: Schema[]
  tools?: {
    name: string
    description: string
    schemaItems: SchemaItem[]
  }[]
  onMessageUpdate?: (data: { content: string; chunk: BaseMessageChunk | BaseMessage }) => void
  onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk | BaseMessage }) => void
  llm?: LLM
}
export const useLocalLLM = () => {
  const toolsCallingStream = useLocalLLMState((state) => state.toolsCallingStream)
  const structuredStream = useLocalLLMState((state) => state.structuredStream)
  const stream = useLocalLLMState((state) => state.stream)
  const { getCurrentModelInfo } = useLocalLLMInfo()

  const webLLMStream = useCallback(
    async (messages: BaseMessage[], info?: StreamType) => {
      const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}
      let streamResponse: ReturnType<typeof stream> | ReturnType<typeof structuredStream>
      if (!info?.llm) {
        throw new Error('LLM is not found')
      }

      const modelInfo = await getCurrentModelInfo?.(info?.llm?.provider)
      if (!modelInfo) {
        throw new Error('Model is not found')
      }

      if (schemas?.length) {
        if (schemas && schemas?.length > 1) {
          // Not supported
          logWarn('Multiple schemas are not supported. Only the first schema will be used.')
        }
        streamResponse = structuredStream(schemas?.[0]?.schema_items || [], messages, {
          provider: info?.llm?.provider,
        })
      } else if (tools?.length) {
        streamResponse = toolsCallingStream(tools, messages, {
          provider: info?.llm?.provider,
        })
      } else {
        streamResponse = stream(messages, {
          provider: info?.llm?.provider,
        })
      }

      if (!streamResponse) {
        throw new Error('Stream is not supported')
      }

      const { lastChunk, content } = await handleStream(streamResponse, onMessageUpdate)
      onMessageFinish?.({
        content,
        lastChunk,
      })
      return {
        lastChunk,
        content,
      }
    },
    [getCurrentModelInfo, stream, structuredStream, toolsCallingStream],
  )

  const getLLM = useCallback(
    (provider: `${LLMProviderEnum}`, _llm?: LLM) => {
      switch (provider) {
        case LLMProviderEnum.WebLLM:
        case LLMProviderEnum.Wllama:
          return undefined
      }
    },
    [webLLMStream],
  )

  const llmStream = useCallback(
    async (messages: BaseMessage[], info?: StreamType) => {
      switch (info?.llm?.provider) {
        case LLMProviderEnum.WebLLM:
          return webLLMStream(messages, info)
        default:
          return
      }
    },
    [webLLMStream],
  )

  return {
    getLLM,
    stream: llmStream,
  }
}
