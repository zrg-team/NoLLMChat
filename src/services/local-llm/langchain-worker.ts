import { ChatWebLLM } from '@langchain/community/chat_models/webllm'

import { SchemaItem } from 'src/services/database/types'
import { init, listenForMessages, respond, type BaseMessagePayload } from 'src/utils/worker-base'
import { ChatCompletionTool, MLCEngine } from '@mlc-ai/web-llm'
import { BaseMessage } from '@langchain/core/messages'

import { parseBridgeJSONToLLMInput, parseBridgeJSONToWebLLMInput } from './utils/serialize'
import { manualFunctionCalling } from './utils/manual-function-calling'
import { manualStructuredResponse } from './utils/manual-structured-response'
import { convertToJSON } from 'src/utils/schema-format'

let model: ChatWebLLM
let engine: MLCEngine

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
  | {
      type: 'structured-stream'
      payload: [SchemaItem[], ...Parameters<ChatWebLLM['stream']>]
    }
  | {
      type: 'tool-stream'
      payload: [SchemaItem[], ...Parameters<ChatWebLLM['stream']>]
    }
) &
  BaseMessagePayload

async function handlePayload(data: MessagePayload) {
  switch (data.type) {
    case 'load': {
      model = new ChatWebLLM(...data.payload)
      return model.initialize((progress) => {
        if ('engine' in model) {
          // @ts-expect-error engine is protected in the model
          engine = model.engine as MLCEngine
        }
        respond(data.messageId, 'inprogress', progress)
      })
    }
    case 'invoke': {
      const [input, ...rest] = data.payload
      return model.invoke(parseBridgeJSONToLLMInput(input), ...rest)
    }
    case 'stream': {
      let content = ''
      const [input, ...rest] = data.payload
      const stream = await model.stream(parseBridgeJSONToLLMInput(input), ...rest)

      for await (const chunk of stream) {
        if (chunk) {
          content += `${chunk.content}`
          respond(data.messageId, 'inprogress', chunk)
        }
      }
      return content
    }
    case 'tool-stream': {
      let content = ''
      const [, input] = data.payload
      const tools: Array<ChatCompletionTool> = [
        {
          type: 'function',
          function: {
            name: 'get_current_weather',
            description: 'Get the current weather in a given location',
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city and state, e.g. San Francisco, CA',
                },
              },
              required: ['location'],
            },
          },
        },
      ]

      const messages = parseBridgeJSONToWebLLMInput(input)

      content = await manualFunctionCalling({
        engine,
        messages,
        tools,
        stream: true,
        onChunk: (chunk: BaseMessage) => {
          respond(data.messageId, 'inprogress', chunk)
        },
      })
      respond(data.messageId, 'inprogress', content)
      return content
    }
    case 'structured-stream': {
      let content = ''
      const [json, input] = data.payload
      const format = convertToJSON(json)
      console.log('format', format)

      const messages = parseBridgeJSONToWebLLMInput(input)

      content = await manualStructuredResponse({
        engine,
        messages,
        format,
        stream: true,
        onChunk: (chunk: BaseMessage) => {
          respond(data.messageId, 'inprogress', chunk)
        },
      })
      respond(data.messageId, 'inprogress', content)
      return content
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload)

init()
