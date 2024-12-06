import { logDebug, logError, logWarn } from 'src/utils/logger'

const processes = new Map<string, unknown>()

export const WOKER_INIT_MESSAGE_ID = '_WORKER_INIT_'

export type BaseMessagePayload = { messageId: string }

export type BaseMessageResponse = {
  type: 'complete' | 'error' | 'inprogress' | 'started'
  payload: unknown
  messageId: string
}

export async function sendToWorker(
  worker: Worker,
  type: string,
  messageId: string,
  payload: unknown,
) {
  return worker.postMessage({
    type: type,
    messageId,
    payload: payload,
  })
}

export function sendToMainThread(
  id: string,
  type: 'inprogress' | 'complete' | 'error' | 'started',
  payload: unknown,
) {
  const process = processes.get(id)
  if (!process && id !== WOKER_INIT_MESSAGE_ID) {
    logWarn('[No process found for message]', id)
    return
  }
  self.postMessage({
    messageId: id,
    type,
    payload,
  } as BaseMessageResponse)
  logDebug('[Message sent to main thread]', { id, type, payload })
}

function handlePayloadFunc<M extends BaseMessagePayload>(handler: (data: M) => Promise<unknown>) {
  return async (data: M) => {
    try {
      const responseData = await handler(data)

      sendToMainThread(data.messageId, 'complete', responseData)
    } catch (e: unknown) {
      logError(e)
      sendToMainThread(data.messageId, 'error', {
        error: e instanceof Error ? e.message : 'An error occurred',
        error_code: 'UNKNOWN_ERROR',
      })
    } finally {
      processes.delete(data.messageId)
    }
  }
}

// Listen for messages from the main thread
export function listenForMessages<M extends BaseMessagePayload>(
  handler: (data: M) => Promise<unknown>,
  options?: { timeout?: number },
) {
  self.addEventListener('message', async (event: MessageEvent<M>) => {
    processes.set(
      event.data.messageId,
      Promise.race([
        handlePayloadFunc(handler)(event.data),
        new Promise((resolve) => setTimeout(() => resolve(true), options?.timeout || 120000)).then(
          () => {
            if (processes.has(event.data.messageId)) {
              sendToMainThread(event.data.messageId, 'error', {
                error: 'Operation timed out',
                error_code: 'TIMEOUT_ERROR',
              })
              processes.delete(event.data.messageId)
            }
          },
        ),
      ]),
    )
    sendToMainThread(event.data.messageId, 'started', 'Started processing')
  })
}

export async function init(func?: () => Promise<void>) {
  if (typeof func === 'function') {
    await func()
  }
  sendToMainThread(WOKER_INIT_MESSAGE_ID, 'complete', 'Worker initialized')
}

export const workerMessagesHandler = <
  T extends { messageId: string; type: string; payload?: unknown },
  M extends Map<
    string,
    { resolve: unknown; reject: unknown; processInfo?: unknown; promise: unknown }
  >,
>(
  event: MessageEvent<T>,
  refProcesses: M,
  callbacks?: {
    onWorkerInit?: (e: MessageEvent<T>) => void
    onComplete?: (e: MessageEvent<T>) => void
    onError?: (e: MessageEvent<T>) => void
    onFinish?: (e: MessageEvent<T>) => void
    onProgress?: (e: MessageEvent<T>) => void
  },
) => {
  const messageId = event.data.messageId
  if (!messageId) {
    return
  }
  const { resolve, reject, processInfo } = refProcesses?.get(messageId) || {}
  if (messageId === WOKER_INIT_MESSAGE_ID) {
    callbacks?.onWorkerInit?.(event)
  } else if (['complete', 'error'].includes(event.data.type)) {
    if (event.data.type === 'complete' && typeof resolve === 'function') {
      resolve?.(event.data.payload as never)
      callbacks?.onComplete?.(event)
    } else if (typeof reject === 'function') {
      reject?.(new Error(JSON.stringify(event.data.payload)))
      callbacks?.onError?.(event)
    }
    refProcesses.delete(messageId)
    callbacks?.onFinish?.(event)
  } else if (event.data.type === 'inprogress') {
    if (
      processInfo &&
      typeof processInfo === 'object' &&
      'data' in processInfo &&
      Array.isArray(processInfo?.data)
    ) {
      processInfo.data.push(event.data.payload)
    }
    callbacks?.onProgress?.(event)
  } else if (event.data.type === 'started') {
    // do nothing
  } else {
    logWarn('[Unknown message type]', event.data)
  }
}
