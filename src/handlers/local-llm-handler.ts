import { AIMessage, BaseMessage, BaseMessageChunk } from '@langchain/core/messages'
import type { LLM, Schema, SchemaItem } from 'src/services/database/types'
import { logWarn } from 'src/utils/logger'
import { handleStream } from '../services/local-llm/utils/stream'
import { useLocalLLMState } from '../services/local-llm/state'
import { stream as wllamaStreamInner } from '../services/local-llm/wllama'

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
  const state = useLocalLLMState.getState()
  switch (provider) {
    case 'WebLLM':
      return state.getCurrentModelInfo()
    default:
      return undefined
  }
}

/**
 * Unload model for a provider
 */
const unLoadModel = async (provider: string) => {
  const state = useLocalLLMState.getState()
  switch (provider) {
    case 'WebLLM':
      return state.unLoadModel()
    default:
      return undefined
  }
}

/**
 * WebLLM stream handler
 */
const webLLMStream = async (messages: BaseMessage[], info?: StreamType) => {
  const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}
  const state = useLocalLLMState.getState()

  let streamResponse: ReturnType<typeof state.stream> | ReturnType<typeof state.structuredStream>
  if (!info?.llm) {
    throw new Error('LLM is not found')
  }

  const modelInfo = await getCurrentModelInfo(info?.llm?.provider)
  if (!modelInfo) {
    throw new Error('Model is not found')
  }

  if (schemas?.length) {
    if (schemas && schemas?.length > 1) {
      // Not supported
      logWarn('Multiple schemas are not supported. Only the first schema will be used.')
    }
    streamResponse = state.structuredStream(schemas?.[0]?.schema_items || [], messages, {
      provider: info?.llm?.provider,
    })
  } else if (tools?.length) {
    streamResponse = state.toolsCallingStream(tools, messages, {
      provider: info?.llm?.provider,
    })
  } else {
    streamResponse = state.stream(messages, {
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
}

/**
 * Wllama stream handler
 */
const wllamaStream = async (messages: BaseMessage[], info?: StreamType) => {
  let content = ''
  let lastChunk: BaseMessage | undefined
  const { tools, schemas, onMessageUpdate, onMessageFinish } = info || {}
  if (!info?.llm) {
    throw new Error('LLM is not found')
  }

  const modelInfo = await getCurrentModelInfo(info?.llm?.provider)
  if (modelInfo) {
    await unLoadModel(info?.llm?.provider)
  }

  if (schemas?.length) {
    if (schemas && schemas?.length > 1) {
      // Not supported
      logWarn('Multiple schemas are not supported. Only the first schema will be used.')
    }
    throw new Error('Structured stream is not supported')
  } else if (tools?.length) {
    throw new Error('Tools calling stream is not supported')
  } else {
    const response = await wllamaStreamInner(messages, {
      onNewToken: (_token, _piece, newToken) => {
        content += newToken
        onMessageUpdate?.({
          content: content,
          chunk: new AIMessage(newToken),
        })
      },
    })
    content = `${response.content}`
    lastChunk = response
  }
  onMessageFinish?.({
    content,
    lastChunk,
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
  async stream(messages: BaseMessage[], info?: StreamType) {
    switch (info?.llm?.provider) {
      case 'WebLLM':
        return webLLMStream(messages, info)
      case 'Wllama':
        return wllamaStream(messages, info)
      default:
        throw new Error('Local LLM provider is not supported')
    }
  },
}
