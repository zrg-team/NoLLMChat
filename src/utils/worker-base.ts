const processes = new Map<string, unknown>()

export const WOKER_INIT_MESSAGE_ID = '_WORKER_INIT_'

export type BaseMessagePayload = { messageId: string }

export type BaseMessageResponse = {
  type: 'complete' | 'error' | 'inprogress' | 'started'
  payload: unknown
  messageId: string
}

export function respond(
  id: string,
  type: 'inprogress' | 'complete' | 'error' | 'started',
  payload: unknown,
) {
  const process = processes.get(id)
  if (!process && id !== WOKER_INIT_MESSAGE_ID) {
    console.warn('No process found for message', id)
    return
  }
  self.postMessage({
    messageId: id,
    type,
    payload,
  } as BaseMessageResponse)
}

function handlePayloadFunc<M extends BaseMessagePayload>(handler: (data: M) => Promise<unknown>) {
  return async (data: M) => {
    try {
      const responseData = await handler(data)

      respond(data.messageId, 'complete', responseData)
    } catch (e: unknown) {
      console.warn(e)
      respond(data.messageId, 'error', {
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
        new Promise((resolve) => setTimeout(() => resolve(true), options?.timeout || 60000)).then(
          () => {
            if (processes.has(event.data.messageId)) {
              respond(event.data.messageId, 'error', {
                error: 'Operation timed out',
                error_code: 'TIMEOUT_ERROR',
              })
              processes.delete(event.data.messageId)
            }
          },
        ),
      ]),
    )
    respond(event.data.messageId, 'started', 'Started processing')
  })
}

export async function init(func?: () => Promise<void>) {
  if (typeof func === 'function') {
    await func()
  }
  respond(WOKER_INIT_MESSAGE_ID, 'complete', 'Worker initialized')
}

export async function sendMessage(
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
