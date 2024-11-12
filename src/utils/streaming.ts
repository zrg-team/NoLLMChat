export async function* streamingPromise<T>(
  promise: Promise<T>,
  itemKey: string,
  refProcesses: Map<
    string,
    [
      unknown,
      unknown,
      {
        type: string
        data: unknown[]
        lastIndex: number
      },
    ]
  >,
  options?: { interval?: number; lastChunkOnly?: boolean },
) {
  while (true) {
    const process = refProcesses.get(itemKey)
    if (process) {
      const [, , processInfo] = process
      const newData = options?.lastChunkOnly
        ? processInfo.data[processInfo.data.length - 1]
        : processInfo.data.slice(processInfo.lastIndex)
      if (newData) {
        processInfo.lastIndex = options?.lastChunkOnly
          ? processInfo.data.length - 1
          : processInfo.data.length > 0
            ? processInfo.data.length
            : 0
        yield newData
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
