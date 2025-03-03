import type { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { BaseLanguageModelInput } from '@langchain/core/language_models/base'
import {
  AIMessage,
  BaseMessageFields,
  BaseMessageLike,
  HumanMessage,
  MessageContent,
  MessageContentComplex,
  SystemMessage,
} from '@langchain/core/messages'
import type { WllamaChatMessage } from '@wllama/wllama'

const parseLLMInputItemToBridgeJSON = (
  input: Exclude<BaseLanguageModelInput, BaseMessageLike[]> | BaseMessageLike,
): WllamaChatMessage => {
  if (typeof input === 'string') {
    return {
      role: 'assistant' as const,
      content: `${input}`,
    }
  }
  if (input instanceof HumanMessage) {
    return {
      role: 'user' as const,
      content: `${input.content}`,
    }
  } else if (input instanceof AIMessage) {
    return {
      role: 'assistant' as const,
      content: `${input.content}`,
    }
  } else if (input instanceof SystemMessage) {
    return {
      role: 'system' as const,
      content: `${input.content}`,
    }
  }

  throw new Error('Invalid message type')
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
): WllamaChatMessage[] {
  if (typeof input === 'string' || !Array.isArray(input)) {
    return [
      {
        role: 'user',
        content: typeof input === 'string' ? input : input.toString(),
      },
    ]
  }

  // ChatWebLLM does not support non-string message content in sessions.
  const messages: WllamaChatMessage[] = []
  input.map((m) => {
    if (typeof m === 'string') {
      messages.push({
        role: 'assistant',
        content: m,
      })
    } else if (m instanceof HumanMessage) {
      messages.push({
        role: 'user',
        content: parseBridgeJSONToLLMInputItem(m.content),
      })
    } else if (m instanceof AIMessage) {
      messages.push({
        role: 'assistant',
        content: parseBridgeJSONToLLMInputItem(m.content),
      })
    } else if (m instanceof SystemMessage) {
      messages.push({
        role: 'system',
        content: parseBridgeJSONToLLMInputItem(m.content),
      })
    } else {
      throw new Error(`Invalid message type ${JSON.stringify(m)}`)
    }
  })

  return messages
}
