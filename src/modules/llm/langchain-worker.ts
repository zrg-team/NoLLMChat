import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'

import { init, listenForMessages, respond, type BaseMessagePayload } from 'src/utils/worker-base'

let model: ChatWebLLM

type MessagePayload = (
  | {
      type: 'load'
      payload: ConstructorParameters<typeof ChatWebLLM>
    }
  | {
      type: 'invoke'
      payload: Parameters<ChatWebLLM['invoke']>
    }
  | {
      type: 'stream'
      payload: Parameters<ChatWebLLM['stream']>
    }
) &
  BaseMessagePayload

function parseInvokeData(
  input: Parameters<ChatWebLLM['invoke']>[0] | Parameters<ChatWebLLM['stream']>[0],
) {
  // ChatWebLLM does not support non-string message content in sessions.
  return Array.isArray(input)
    ? input.map((m) => {
        if (typeof m === 'string') {
          return m
        } else if ('role' in m) {
          switch (m.role) {
            case 'ai':
            case 'assistant':
              return new AIMessage(
                typeof m.content === 'string'
                  ? m.content
                  : {
                      content: m.content.reduce((all, c) => {
                        if ('text' in c) {
                          return `${all} ${c.text}`
                        }
                        return all
                      }, ''),
                    },
              )
            case 'user':
            case 'human':
              return new HumanMessage(
                typeof m.content === 'string'
                  ? m.content
                  : {
                      content: m.content.reduce((all, c) => {
                        if ('text' in c) {
                          return `${all} ${c.text}`
                        }
                        return all
                      }, ''),
                    },
              )
            case 'system':
              return new SystemMessage(
                typeof m.content === 'string'
                  ? m.content
                  : {
                      content: m.content.reduce((all, c) => {
                        if ('text' in c) {
                          return `${all} ${c.text}`
                        }
                        return all
                      }, ''),
                    },
              )
            default:
              throw new Error('Invalid message type')
          }
        } else {
          throw new Error('Invalid message type')
        }
      })
    : typeof input === 'string'
      ? input
      : input
}
async function handlePayload(data: MessagePayload) {
  switch (data.type) {
    case 'load': {
      model = new ChatWebLLM(...data.payload)
      return model.initialize((progress) => {
        respond(data.messageId, 'inprogress', progress)
      })
    }
    case 'invoke': {
      const [input, ...rest] = data.payload
      return model.invoke(parseInvokeData(input), ...rest)
    }
    case 'stream': {
      let content = ''
      const [input, ...rest] = data.payload
      const stream = await model.stream(parseInvokeData(input), ...rest)

      for await (const chunk of stream) {
        if (chunk) {
          content += `${chunk.content}`
          respond(data.messageId, 'inprogress', chunk)
        }
      }
      return content
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload)

init()
