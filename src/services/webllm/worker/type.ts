import type { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { BaseMessagePayload } from 'src/utils/worker-base'

export const JSON_MODE = {
  STRUCTURED_STREAM: true,
  TOOLS_CALLING_STREAM: true,
}

export type MessagePayload = (
  | {
      type: 'load'
      payload: ConstructorParameters<typeof ChatWebLLM>
    }
  | {
      type: 'unload'
      payload: []
    }
  | {
      type: 'get-current-model-info'
      payload: []
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
      payload: [Record<string, unknown>, ...Parameters<ChatWebLLM['stream']>]
    }
  | {
      type: 'tools-calling-stream'
      payload: [
        { name: string; description: string; schema: Record<string, unknown> }[],
        ...Parameters<ChatWebLLM['stream']>,
      ]
    }
) &
  BaseMessagePayload
