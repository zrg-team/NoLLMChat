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
    let fullContent = ''
    const newChunks: { content: string; chunk: AIMessage }[] = []
    let resolve: (() => void) | null = null

    // Stream tokens in real-time
    const promise = wllamaStreamInner(messages, {
      onNewToken: (_token, _piece, newToken) => {
        fullContent += newToken
        newChunks.push({
          content: fullContent,
          chunk: new AIMessage(newToken), // Send only the new token as chunk
        })
        // Trigger the next chunk to be yielded
        if (resolve) {
          resolve()
          resolve = null
        }
      },
    })

    let chunkIndex = 0

    // Yield chunks as they become available
    while (true) {
      if (chunkIndex < newChunks.length) {
        yield newChunks[chunkIndex]
        chunkIndex++
      } else {
        // Wait for more chunks or completion
        const isComplete = await Promise.race([
          promise.then(() => true),
          new Promise<boolean>((res) => {
            resolve = () => res(false)
          }),
        ])

        if (isComplete) {
          // Yield any remaining chunks
          while (chunkIndex < newChunks.length) {
            yield newChunks[chunkIndex]
            chunkIndex++
          }
          break
        }
      }
    }
  }
}

// Export singleton instance
export const wllamaAPI = new WllamaAPIImpl()

// Default export
export default wllamaAPI
