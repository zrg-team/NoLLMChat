// WebLLM Clean API Implementation
// Pure OpenAI-compatible interface without state exposure

import type { BaseMessage } from '@langchain/core/messages'
import type {
  WebLLMAPI,
  ChatCompletionOptions,
  ChatCompletionResponse,
  ChatCompletionStreamChunk,
} from '../local-llm/types/openai-compatible'
import { useWebLLMState } from './state'

class WebLLMAPIImpl implements WebLLMAPI {
  private getState() {
    return useWebLLMState.getState()
  }

  async loadModel(modelName: string): Promise<void> {
    const state = this.getState()
    await state.loadModel(modelName, { provider: 'WebLLM' })
  }

  async unloadModel(): Promise<void> {
    const state = this.getState()
    state.unLoadModel()
  }

  async getCurrentModel(): Promise<string | undefined> {
    const state = this.getState()
    const info = await state.getCurrentModelInfo()
    return info?.model
  }

  chatCompletion(
    messages: BaseMessage[],
    options: ChatCompletionOptions = {},
  ): Promise<ChatCompletionResponse> | AsyncGenerator<ChatCompletionStreamChunk> {
    const state = this.getState()
    const { stream = true, response_format, tools, ...rest } = options

    // Build OpenAI-compatible options for internal state
    const internalOptions: Parameters<typeof state.chatCompletion>[1] = {
      provider: 'WebLLM',
      stream,
      ...rest,
    }

    // Add response_format for structured output
    if (response_format?.type === 'json_object') {
      internalOptions.response_format = response_format
    }

    // Add tools for function calling
    if (tools?.length) {
      internalOptions.tools = tools
    }

    if (stream) {
      // Return async generator for streaming
      const generator = state.chatCompletion(messages, internalOptions) as AsyncGenerator<{
        content?: string
      }>
      return this.streamResponse(generator)
    } else {
      // Return promise for non-streaming
      return this.nonStreamResponse(state, messages, internalOptions)
    }
  }

  private async nonStreamResponse(
    state: ReturnType<typeof this.getState>,
    messages: BaseMessage[],
    internalOptions: Parameters<typeof state.chatCompletion>[1],
  ): Promise<ChatCompletionResponse> {
    const result = (await state.chatCompletion(messages, {
      ...internalOptions,
      stream: false,
    })) as { content?: string }
    return {
      content: result?.content || '',
      usage: {
        // TODO: Add token usage tracking
      },
    }
  }

  private async *streamResponse(
    generator: AsyncGenerator<{ content?: string }>,
  ): AsyncGenerator<ChatCompletionStreamChunk> {
    for await (const chunk of generator) {
      yield {
        content: chunk?.content || '',
        chunk,
      }
    }
  }
}

// Export singleton instance
export const webLLMAPI = new WebLLMAPIImpl()

// Default export
export default webLLMAPI
