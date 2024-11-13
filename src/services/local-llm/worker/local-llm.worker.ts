import { ChatWebLLM } from '@langchain/community/chat_models/webllm'

import { SchemaItem } from 'src/services/database/types'
import {
  init,
  listenForMessages,
  sendToMainThread,
  type BaseMessagePayload,
} from 'src/utils/worker-base'
import { ChatCompletionTool, MLCEngine } from '@mlc-ai/web-llm'
import { BaseMessage } from '@langchain/core/messages'
import { convertToJSON } from 'src/utils/schema-format'

import {
  convertToChatCompletionTool,
  manualFunctionCalling,
} from '../utils/manual-function-calling'
import { parseBridgeJSONToLLMInput, parseBridgeJSONToWebLLMInput } from '../utils/serialize'
import { manualStructuredResponse } from '../utils/manual-structured-response'

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
      type: 'tools-calling-stream'
      payload: [
        { name: string; description: string; schemaItems: SchemaItem[] }[],
        ...Parameters<ChatWebLLM['stream']>,
      ]
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
        sendToMainThread(data.messageId, 'inprogress', progress)
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
          sendToMainThread(data.messageId, 'inprogress', chunk)
        }
      }
      return content
    }
    case 'tools-calling-stream': {
      // Lanchain not yet supported tool call for WebLLM
      const [toolJSON, input] = data.payload
      const tools: Array<ChatCompletionTool> = toolJSON.map((item) => {
        return convertToChatCompletionTool(item.name, item.description, item.schemaItems)
      })

      const messages = parseBridgeJSONToWebLLMInput(input)

      const content = await manualFunctionCalling({
        engine,
        messages,
        tools,
        stream: true,
        onChunk: (chunk: BaseMessage) => {
          sendToMainThread(data.messageId, 'inprogress', chunk)
        },
      })
      return content
    }
    case 'structured-stream': {
      // Lanchain not yet supported structured response for WebLLM
      const [json, input] = data.payload
      const format = convertToJSON(json)

      const messages = parseBridgeJSONToWebLLMInput(input)

      const content = await manualStructuredResponse({
        engine,
        messages,
        format,
        stream: true,
        onChunk: (chunk: BaseMessage) => {
          sendToMainThread(data.messageId, 'inprogress', chunk)
        },
      })
      return content
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload, { timeout: 10000000 })

init()
