import { BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import type { LLM, Schema, SchemaItem } from 'src/services/database/types'
import { logWarn } from 'src/utils/logger'
import { webLLM, wllama, type ChatCompletionOptions } from '../services/local-llm'
import { convertToZodSchema } from 'src/utils/schema-format'
import { zodToJsonSchema } from 'zod-to-json-schema'

/**
 * Type guard to check if an object is async iterable
 */
function isAsyncIterable(obj: unknown): obj is AsyncIterable<unknown> {
  return obj != null && typeof obj === 'object' && Symbol.asyncIterator in obj
}

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

/**
 * Get current model info for a provider
 */
const getCurrentModelInfo = async (provider: string) => {
  switch (provider) {
    case 'WebLLM':
      return await webLLM.getCurrentModel()
    case 'Wllama':
      return wllama.getCurrentModel()
    default:
      return undefined
  }
}

/**
 * Unload model for a provider
 */
const unLoadModel = async (provider: string) => {
  switch (provider) {
    case 'WebLLM':
      return await webLLM.unloadModel()
    case 'Wllama':
      return await wllama.unloadModel()
    default:
      return undefined
  }
}

/**
 * WebLLM chat completion handler
 */
const webLLMChatCompletion = async (messages: BaseMessage[], info?: StreamType) => {
  const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}

  if (!info?.llm) {
    throw new Error('LLM is not found')
  }

  const modelInfo = await getCurrentModelInfo(info?.llm?.provider)
  if (!modelInfo) {
    throw new Error('Model is not found')
  }

  // Build OpenAI-compatible options
  const options: ChatCompletionOptions = {
    stream: true,
  }

  // Add response_format for structured output
  if (schemas?.length) {
    if (schemas && schemas?.length > 1) {
      logWarn('Multiple schemas are not supported. Only the first schema will be used.')
    }
    const schemaItems = schemas?.[0]?.schema_items || []
    const zodSchema = convertToZodSchema(schemaItems)
    const jsonSchema = zodToJsonSchema(zodSchema, 'my').definitions?.my || {}
    options.response_format = {
      type: 'json_object',
      schema: jsonSchema,
    }
  }

  // Add tools for function calling
  if (tools?.length) {
    options.tools = tools.map((tool) => {
      const zodSchema = convertToZodSchema(tool.schemaItems)
      const jsonSchema = zodToJsonSchema(zodSchema, 'my').definitions?.my || {}
      return {
        type: 'function',
        function: {
          name: tool.name,
          description: tool.description,
          parameters: jsonSchema,
        },
      }
    })
  }

  const streamResponse = await webLLM.chatCompletion(messages, options)

  if (!streamResponse) {
    throw new Error('Chat completion is not supported')
  }

  // Handle streaming response
  let content = ''
  let lastChunk: BaseMessageChunk | BaseMessage | unknown

  if (streamResponse && isAsyncIterable(streamResponse)) {
    for await (const chunk of streamResponse as AsyncIterable<{
      content?: string
      chunk?: unknown
    }>) {
      content += chunk.content || ''
      lastChunk = chunk.chunk || chunk
      onMessageUpdate?.({
        content,
        chunk: lastChunk as BaseMessageChunk | BaseMessage,
      })
    }
  } else {
    // Non-streaming response
    const response = streamResponse as { content?: string }
    content = response.content || ''
    lastChunk = response
  }

  onMessageFinish?.({
    content,
    lastChunk: lastChunk as BaseMessageChunk | BaseMessage,
  })
  return {
    lastChunk,
    content,
  }
}

/**
 * Wllama chat completion handler
 */
const wllamaChatCompletion = async (messages: BaseMessage[], info?: StreamType) => {
  const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}

  if (!info?.llm) {
    throw new Error('LLM is not found')
  }

  const modelInfo = await getCurrentModelInfo(info?.llm?.provider)
  if (modelInfo) {
    await unLoadModel(info?.llm?.provider)
  }

  // Build OpenAI-compatible options
  const options: ChatCompletionOptions = {
    stream: true,
  }

  // Check for unsupported features
  if (schemas?.length) {
    if (schemas && schemas?.length > 1) {
      logWarn('Multiple schemas are not supported. Only the first schema will be used.')
    }
    throw new Error('Structured output is not supported in Wllama yet')
  }

  if (tools?.length) {
    throw new Error('Function calling is not supported in Wllama yet')
  }

  const streamResponse = await wllama.chatCompletion(messages, options)

  if (!streamResponse) {
    throw new Error('Chat completion is not supported')
  }

  // Handle streaming response
  let content = ''
  let lastChunk: BaseMessageChunk | BaseMessage | unknown

  if (streamResponse && isAsyncIterable(streamResponse)) {
    for await (const chunk of streamResponse as AsyncIterable<{
      content?: string
      chunk?: unknown
    }>) {
      content += chunk.content || ''
      lastChunk = chunk.chunk || chunk
      onMessageUpdate?.({
        content,
        chunk: lastChunk as BaseMessageChunk | BaseMessage,
      })
    }
  } else {
    // Non-streaming response
    const response = streamResponse as { content?: string }
    content = response.content || ''
    lastChunk = response
  }

  onMessageFinish?.({
    content,
    lastChunk: lastChunk as BaseMessageChunk | BaseMessage,
  })
  return {
    lastChunk,
    content,
  }
}

/**
 * Non-hook version of local LLM handler that can be called anywhere
 */
export const localLLMHandler = {
  async chatCompletion(messages: BaseMessage[], info?: StreamType) {
    switch (info?.llm?.provider) {
      case 'WebLLM':
        return webLLMChatCompletion(messages, info)
      case 'Wllama':
        return wllamaChatCompletion(messages, info)
      default:
        throw new Error('Local LLM provider is not supported')
    }
  },

  // Legacy stream method for backward compatibility
  async stream(messages: BaseMessage[], info?: StreamType) {
    return this.chatCompletion(messages, info)
  },
}
