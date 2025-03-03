import type { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { SchemaItem } from 'src/services/database/types'
import type { BaseMessagePayload } from 'src/utils/worker-base'

export const JSON_MODE = {
  STRUCTURED_STREAM: true,
  TOOLS_CALLING_STREAM: true,
}

export type MessagePayload = (
  | {
      type: 'load'
      provider: 'webllm' | 'wllama'
      payload: ConstructorParameters<typeof ChatWebLLM>
    }
  | {
      type: 'get-current-model-info'
      provider: 'webllm' | 'wllama'
      payload: []
    }
  | {
      type: 'invoke'
      provider: 'webllm' | 'wllama'
      payload: Parameters<ChatWebLLM['invoke']>
    }
  | {
      type: 'stream'
      provider: 'webllm' | 'wllama'
      payload: Parameters<ChatWebLLM['stream']>
    }
  | {
      type: 'structured-stream'
      provider: 'webllm' | 'wllama'
      payload: [SchemaItem[], ...Parameters<ChatWebLLM['stream']>]
    }
  | {
      type: 'tools-calling-stream'
      provider: 'webllm' | 'wllama'
      payload: [
        { name: string; description: string; schemaItems: SchemaItem[] }[],
        ...Parameters<ChatWebLLM['stream']>,
      ]
    }
) &
  BaseMessagePayload
