import { ChatWebLLM } from '@langchain/community/chat_models/webllm'

import { init, listenForMessages, respond, type BaseMessagePayload } from 'src/utils/worker-base'

import { parseBridgeJSONToLLMInput } from './utils/serialize'

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
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload)

init()
