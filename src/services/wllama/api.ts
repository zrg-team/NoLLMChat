// Wllama Clean API Implementation
// Pure OpenAI-compatible interface without state exposure

import type { BaseMessage } from '@langchain/core/messages'
import type {
  WllamaAPI,
  ChatCompletionOptions,
  ChatCompletionResponse,
  ChatCompletionStreamChunk,
} from '../local-llm/types/openai-compatible'
import { stream as wllamaStreamInner, loadModelFromHF, unload } from './wllama'
import { AIMessage } from '@langchain/core/messages'

class WllamaAPIImpl implements WllamaAPI {
  private currentModel?: string

  async loadModel(modelName: string): Promise<void> {
    // Use the correct loadModelFromHF signature
    await loadModelFromHF(modelName, { provider: 'Wllama' })
    this.currentModel = modelName
  }

  async unloadModel(): Promise<void> {
    await unload()
    this.currentModel = undefined
  }

  getCurrentModel(): string | undefined {
    return this.currentModel
  }

  chatCompletion(
    messages: BaseMessage[],
    options: ChatCompletionOptions = {},
  ): Promise<ChatCompletionResponse> | AsyncGenerator<ChatCompletionStreamChunk> {
    const { stream = true, response_format, tools } = options

    // Check for unsupported features
    if (response_format?.type === 'json_object') {
      throw new Error('Structured output not supported in Wllama yet')
    }

    if (tools?.length) {
      throw new Error('Function calling not supported in Wllama yet')
    }

    if (stream) {
      // Return async generator for streaming
      return this.streamResponse(messages)
    } else {
      // Non-streaming mode - return promise
      return this.nonStreamResponse(messages)
    }
  }

  private async nonStreamResponse(messages: BaseMessage[]): Promise<ChatCompletionResponse> {
    let content = ''
    await wllamaStreamInner(messages, {
      onNewToken: (_token, _piece, newToken) => {
        content += newToken
      },
    })

    return {
      content,
      usage: {
        // TODO: Add token usage tracking
      },
    }
  }

  private async *streamResponse(
    messages: BaseMessage[],
  ): AsyncGenerator<ChatCompletionStreamChunk> {
    let content = ''

    await wllamaStreamInner(messages, {
      onNewToken: async (_token, _piece, newToken) => {
        content += newToken
        // Note: This is a simplified implementation
        // In a real streaming scenario, we'd need to properly handle the async nature
      },
    })

    // For now, yield the accumulated content
    // TODO: Implement proper streaming with real-time token emission
    yield {
      content,
      chunk: new AIMessage(content),
    }
  }
}

// Export singleton instance
export const wllamaAPI = new WllamaAPIImpl()

// Default export
export default wllamaAPI
