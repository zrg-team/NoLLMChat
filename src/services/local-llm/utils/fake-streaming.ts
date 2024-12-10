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
        const newData = options?.lastChunkOnly
          ? processInfo.data[processInfo.data.length - 1]
          : processInfo.data.slice(+`${processInfo.lastIndex}`)

        if (newData && (!Array.isArray(newData) || newData?.length)) {
          processInfo.lastIndex = options?.lastChunkOnly
            ? processInfo.data.length - 1
            : processInfo.data.length > 0
              ? processInfo.data.length
              : 0
          yield newData
        }
      }
      await new Promise((resolve) => setTimeout(resolve, options?.interval || 150)) // Polling interval
    } else {
      break
    }
  }
  const response = await promise
  yield response

  return response
}
