import { useCallback } from 'react'
import type { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import type { Schema, SchemaItem, ToolDefinition } from 'src/services/database/types'
import { FlowNodeTypeEnum } from 'src/services/database/types/flow-node'
import { prepareThreadConnections } from 'src/utils/thread-conversation-traveling'

import { handleStream } from '../utils/stream'
import { useLocalLLMState } from '../state'

export const useLocalLLM = () => {
  const toolsCallingStream = useLocalLLMState((state) => state.toolsCallingStream)
  const structuredStream = useLocalLLMState((state) => state.structuredStream)
  const stream = useLocalLLMState((state) => state.stream)

  const llmStream = useCallback(
    async (
      messages: BaseMessage[],
      {
        tools,
        schemas,
        onMessageUpdate,
        onMessageFinish,
      }: {
        schemas?: ReturnType<typeof prepareThreadConnections>['schemas']
        tools?: ReturnType<typeof prepareThreadConnections>['tools']
        onMessageUpdate?: (data: { content: string; chunk: BaseMessageChunk }) => void
        onMessageFinish?: (data: { content: string; lastChunk?: BaseMessageChunk }) => void
      },
    ) => {
      if (schemas && schemas?.length > 1) {
        // Not supported
      }

      let streamResponse: ReturnType<typeof stream> | ReturnType<typeof structuredStream>
      if (schemas?.length) {
        const schema = schemas?.[0]?.node?.data?.entity as Schema
        if (!schema?.schema_items?.length) {
          throw new Error('Schema is not found')
        }
        streamResponse = structuredStream(schema.schema_items, messages)
      } else if (tools?.length) {
        streamResponse = toolsCallingStream(
          tools.reduce(
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
