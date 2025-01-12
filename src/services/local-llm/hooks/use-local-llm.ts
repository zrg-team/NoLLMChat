import { useCallback } from 'react'
import type { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import type { Schema, SchemaItem } from 'src/services/database/types'
import { logWarn } from 'src/utils/logger'

import { handleStream } from '../utils/stream'
import { useLocalLLMState } from '../state'

export const useLocalLLM = () => {
  const toolsCallingStream = useLocalLLMState((state) => state.toolsCallingStream)
  const structuredStream = useLocalLLMState((state) => state.structuredStream)
  const stream = useLocalLLMState((state) => state.stream)

  const llmStream = useCallback(
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
      },
    ) => {
      const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}
      let streamResponse: ReturnType<typeof stream> | ReturnType<typeof structuredStream>
      if (schemas?.length) {
        if (schemas && schemas?.length > 1) {
          // Not supported
          logWarn('Multiple schemas are not supported. Only the first schema will be used.')
        }
        streamResponse = structuredStream(schemas?.[0]?.schema_items || [], messages)
      } else if (tools?.length) {
        streamResponse = toolsCallingStream(tools, messages)
      } else {
        streamResponse = stream(messages)
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
    [stream, structuredStream, toolsCallingStream],
  )
  return {
    stream: llmStream,
  }
}
