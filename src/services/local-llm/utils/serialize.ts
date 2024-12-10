import type { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { BaseLanguageModelInput } from '@langchain/core/language_models/base'
import {
  AIMessage,
  BaseMessage,
  BaseMessageFields,
  BaseMessageLike,
  HumanMessage,
  MessageContent,
  MessageContentComplex,
  SystemMessage,
} from '@langchain/core/messages'
import type { ChatCompletionRequest } from '@mlc-ai/web-llm'

const parseLLMInputItemToBridgeJSON = (
  input: Exclude<BaseLanguageModelInput, BaseMessageLike[]> | BaseMessageLike,
) => {
  if (typeof input === 'string') {
    return input
  }
  if (input instanceof HumanMessage) {
    return {
      instanceof: 'HumanMessage',
      item: input,
      content: input.content,
    }
  } else if (input instanceof AIMessage) {
    return {
      instanceof: 'AIMessage',
      item: input,
      content: input.content,
    }
  } else if (input instanceof SystemMessage) {
    return {
      instanceof: 'SystemMessage',
      item: input,
      content: input.content,
    }
  }

  return input
}

export const parseLLMInputToBridgeJSON = (input: BaseLanguageModelInput) => {
  if (!Array.isArray(input)) {
    return parseLLMInputItemToBridgeJSON(input)
  }

  return input.map(parseLLMInputItemToBridgeJSON)
}

// Only text content is supported now
export const filterTextContentFromMessage = (input: MessageContentComplex[]) => {
  return input.reduce((all, c) => {
    if ('text' in c) {
      return `${all} ${c.text}`
    }
    return all
  }, '')
}
export const parseBridgeJSONToLLMInputItem = (
  input: string | MessageContentComplex[] | BaseMessageFields | MessageContent,
): string => {
  if (typeof input === 'string') {
    return input
  } else if (Array.isArray(input)) {
    return filterTextContentFromMessage(input)
  }
  return typeof input.content === 'string'
    ? input.content
    : filterTextContentFromMessage(input.content)
}

export function parseBridgeJSONToLLMInput(
  input: Parameters<ChatWebLLM['invoke']>[0] | Parameters<ChatWebLLM['stream']>[0],
) {
  if (typeof input === 'string' || !Array.isArray(input)) {
    return input
  }

  // ChatWebLLM does not support non-string message content in sessions.
  const messages: (BaseMessage | string)[] = []
  input.map((m) => {
    if (typeof m === 'string') {
      messages.push(m)
    } else if ('instanceof' in m && 'item' in m && 'content' in m) {
      switch (m.instanceof) {
        case 'HumanMessage':
          messages.push(new HumanMessage(parseBridgeJSONToLLMInputItem(m.content)))
          break
        case 'AIMessage':
          messages.push(new AIMessage(parseBridgeJSONToLLMInputItem(m.content)))
          break
        case 'SystemMessage':
          messages.push(new SystemMessage(parseBridgeJSONToLLMInputItem(m.content)))
          break
        default:
          throw new Error('Invalid message type')
      }
    } else if ('role' in m) {
      switch (m.role) {
        case 'ai':
        case 'assistant':
          messages.push(new AIMessage(parseBridgeJSONToLLMInputItem(m)))
          break
        case 'user':
        case 'human':
          messages.push(new HumanMessage(parseBridgeJSONToLLMInputItem(m)))
          break
        case 'system':
          messages.push(new SystemMessage(parseBridgeJSONToLLMInputItem(m)))
          break
        default:
          throw new Error('Invalid message type')
      }
    } else {
      throw new Error(`Invalid message type ${JSON.stringify(m)}`)
    }
  })

  return messages
}

export function parseBridgeJSONToWebLLMInput(
  input: Parameters<ChatWebLLM['invoke']>[0] | Parameters<ChatWebLLM['stream']>[0],
): ChatCompletionRequest['messages'] {
  if (typeof input === 'string' || !Array.isArray(input)) {
    return [
      {
        role: 'user',
        content: typeof input === 'string' ? input : input.toString(),
      },
    ]
  }

  // ChatWebLLM does not support non-string message content in sessions.
  const messages: ChatCompletionRequest['messages'] = []
  input.map((m) => {
    if (typeof m === 'string') {
      messages.push({
        role: 'user',
        content: m,
      })
    } else if ('instanceof' in m && 'item' in m && 'content' in m) {
      switch (m.instanceof) {
        case 'HumanMessage':
          messages.push({
            role: 'user',
            content: parseBridgeJSONToLLMInputItem(m.content) || '',
          })
          break
        case 'AIMessage':
          messages.push({
            role: 'assistant',
            content: parseBridgeJSONToLLMInputItem(m.content) || '',
          })
          break
        case 'SystemMessage':
          messages.push({
            role: 'system',
            content: parseBridgeJSONToLLMInputItem(m.content) || '',
          })
          break
        default:
          throw new Error('Invalid message type')
      }
    } else if ('role' in m) {
      switch (m.role) {
        case 'ai':
        case 'assistant':
          messages.push({
            role: 'assistant',
            content: parseBridgeJSONToLLMInputItem(m) || '',
          })
          break
        case 'user':
        case 'human':
          messages.push({
            role: 'user',
            content: parseBridgeJSONToLLMInputItem(m) || '',
          })
          break
        case 'system':
          messages.push({
            role: 'system',
            content: parseBridgeJSONToLLMInputItem(m) || '',
          })
          break
        default:
          throw new Error('Invalid message type')
      }
    } else {
      throw new Error(`Invalid message type ${JSON.stringify(m)}`)
    }
  })

  return messages
}
