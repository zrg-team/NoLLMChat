import type { BaseChatModel } from '@langchain/core/language_models/chat_models'

export async function* fakeStreaming<
  T extends ReturnType<BaseChatModel['stream']>,
  M extends Map<string, { processInfo: unknown }>,
>(
  promise: T,
  itemKey: string,
  refProcesses: M,
  options?: { interval?: number; lastChunkOnly?: boolean },
) {
  while (true) {
    const process = refProcesses.get(itemKey)
    if (process) {
      const { processInfo } = process
      if (
        processInfo &&
        typeof processInfo === 'object' &&
        'data' in processInfo &&
        'lastIndex' in processInfo &&
        Array.isArray(processInfo.data)
      ) {
        if (options?.lastChunkOnly) {
          // Yield only the last chunk
          const lastChunk = processInfo.data[processInfo.data.length - 1]
          const currentIndex = +`${processInfo.lastIndex}`
          if (lastChunk && currentIndex < processInfo.data.length - 1) {
            processInfo.lastIndex = processInfo.data.length - 1
            yield lastChunk
          }
        } else {
          // Yield each new individual chunk
          const currentIndex = +`${processInfo.lastIndex}`
          const newChunks = processInfo.data.slice(currentIndex)
          if (newChunks?.length) {
            processInfo.lastIndex = processInfo.data.length
            // Yield each chunk individually instead of as an array
            for (const chunk of newChunks) {
              yield chunk
            }
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, options?.interval || 50)) // Faster polling for real-time streaming
    } else {
      break
    }
  }
  const response = await promise
  yield response

  return response
}
