import { SetState, GetState } from 'src/utils/zustand'

import { LocalLLMState } from './state'
import { WOKER_INIT_MESSAGE_ID } from 'src/utils/worker-base'
import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import { InitProgressReport } from '@mlc-ai/web-llm'
import { nanoid } from 'nanoid'
import { parseLLMInputToBridgeJSON } from 'src/services/local-llm/utils/serialize'
import { SchemaItem } from 'src/services/database/types'

export interface LocalLLMStateActions {
  init: () => void
  setInitializing: (initializing: Partial<LocalLLMState['initializing']>) => void
  setSelectedModel: (selectedModel: string) => void
  setInitProgressCallback: (callback: (initProgress: InitProgressReport) => void) => () => void
  loadModel: (modelName: string) => Promise<void>
  invoke: (...args: Parameters<ChatWebLLM['invoke']>) => ReturnType<ChatWebLLM['invoke']>
  stream: (
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<unknown, Awaited<ReturnType<ChatWebLLM['stream']>>, unknown>
  structuredStream: (
    schemaItems: SchemaItem[],
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<unknown, Awaited<ReturnType<ChatWebLLM['stream']>>, unknown>
}

const getHandleMessages = (get: GetState<LocalLLMState>, set: SetState<LocalLLMState>) => {
  return (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
    const messageId = event.data.messageId
    if (!messageId) {
      return
    }
    const refProcesses = get().refProcesses
    const [resolve, reject, processInfo] = refProcesses?.get(messageId) || []
    if (messageId === WOKER_INIT_MESSAGE_ID) {
      set({ ready: true })
    } else if (['complete', 'error'].includes(event.data.type)) {
      if (event.data.type === 'complete') {
        resolve?.(event.data.payload as never)
      } else {
        reject?.(new Error(JSON.stringify(event.data.payload)))
      }
      refProcesses.delete(messageId)
    } else if (event.data.type === 'inprogress') {
      if (processInfo?.data) {
        processInfo.data.push(event.data.payload)
      }
    } else if (event.data.type === 'started') {
      // do nothing
    } else {
      console.warn('Unknown message type', event.data)
    }
  }
}

async function* load(
  options: {
    messageId: string
    worker?: Worker
    refProcesses: LocalLLMState['refProcesses']
  },
  ...args: ConstructorParameters<typeof ChatWebLLM>
) {
  const worker = options.worker
  const refProcesses = options.refProcesses
  if (!worker) {
    throw new Error('Worker not initialized')
  }

  worker.postMessage({
    messageId: options.messageId,
    type: 'load',
    payload: args,
  })
  const promise = new Promise((resolve, reject) => {
    refProcesses.set(options.messageId, [resolve, reject, { type: 'load', data: [], lastIndex: 0 }])
  })

  while (true) {
    const process = refProcesses.get(options.messageId)
    if (process) {
      const [, , processInfo] = process
      const newData = processInfo.data[processInfo.data.length - 1]
      if (newData) {
        yield newData
        processInfo.lastIndex = processInfo.data.length - 1
      }
      await new Promise((resolve) => setTimeout(resolve, 500)) // Polling interval
    } else {
      yield promise.then(() => {})
      break
    }
  }

  return promise
}

export const getLocalLLMStateActions = (
  set: SetState<LocalLLMState>,
  get: GetState<LocalLLMState>,
): LocalLLMStateActions => {
  return {
    setInitializing: (initializing) => {
      const currentInitializing = get().initializing
      set({ initializing: { ...currentInitializing, ...initializing } })
    },
    setSelectedModel: (selectedModel) => {
      set({ selectedModel })
    },
    init: () => {
      try {
        const oldWorker = get().worker
        const oldHandler = get().handler
        if (oldWorker && oldHandler) {
          oldWorker.removeEventListener('message', oldHandler)
          oldWorker.terminate()
        }
        caches
          .open('webllm/config')
          .then(async (cache) => {
            return cache.keys()
          })
          .then((requests) => {
            set({ cachedLLMURLs: requests.map((request) => request.url) })
          })
        const worker = new Worker(new URL('../langchain-worker.ts', import.meta.url), {
          type: 'module',
        })
        const handler = getHandleMessages(get, set)
        set({ worker, handler })
        worker.addEventListener('message', handler)
      } catch (error) {
        console.warn('Failed to fetch cached LLMs:', error)
      }
    },
    loadModel: async (modelName: string) => {
      let currentLoadModelMessageId = get().currentLoadModelMessageId
      const initProgressCallbacks = get().initProgressCallbacks
      const initializing = get().initializing
      const refProcesses = get().refProcesses
      const worker = get().worker
      if (currentLoadModelMessageId) {
        const process = refProcesses.get(currentLoadModelMessageId)
        if (process) {
          const [, reject] = process
          reject?.('stop')
          refProcesses.delete(currentLoadModelMessageId)
        }
      }
      currentLoadModelMessageId = nanoid()
      set({
        currentLoadModelMessageId: nanoid(),
        selectedModel: modelName,
        initializing: { ...initializing, loading: true },
      })
      const generator = load(
        {
          messageId: currentLoadModelMessageId,
          worker,
          refProcesses: refProcesses,
        },
        {
          model: modelName,
        },
      )
      for await (const data of generator) {
        if (data) {
          initProgressCallbacks.forEach((callback) => callback(data as InitProgressReport))
        }
      }
      setTimeout(() => {
        initProgressCallbacks.forEach((callback) =>
          callback({
            progress: 100,
            timeElapsed: 1,
            text: `Model ${modelName} loaded.`,
          }),
        )
        set({ initializing: { ...get().initializing, loading: false } })
      }, 100)
    },
    setInitProgressCallback: (callback) => {
      const data = get().initProgressCallbacks
      data.push(callback)
      set({ initProgressCallbacks: data })
      return () => {
        set({
          initProgressCallbacks: get().initProgressCallbacks.filter((item) => item !== callback),
        })
      }
    },
    invoke: (...args: Parameters<ChatWebLLM['invoke']>) => {
      const worker = get().worker
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      worker.postMessage({
        messageId,
        type: 'invoke',
        payload: args,
      })
      return new Promise<Awaited<ReturnType<ChatWebLLM['invoke']>>>((resolve, reject) => {
        refProcesses.set(messageId, [resolve, reject, { type: 'invoke', data: [], lastIndex: 0 }])
      })
    },
    stream: async function* test(...args: Parameters<ChatWebLLM['stream']>) {
      const worker = get().worker
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const [input, ...rest] = args
      worker.postMessage({
        messageId,
        type: 'stream',
        payload: [parseLLMInputToBridgeJSON(input), ...rest],
      })
      const promise = new Promise<Awaited<ReturnType<ChatWebLLM['stream']>>>((resolve, reject) => {
        refProcesses.set(messageId, [resolve, reject, { type: 'invoke', data: [], lastIndex: 0 }])
      })

      while (true) {
        const process = refProcesses.get(messageId)
        if (process) {
          const [, , processInfo] = process
          const newData = processInfo.data.slice(processInfo.lastIndex)
          if (newData) {
            yield newData
            processInfo.lastIndex = processInfo.data.length > 0 ? processInfo.data.length : 0
          }
          await new Promise((resolve) => setTimeout(resolve, 200)) // Polling interval
        } else {
          yield promise.then((data) => data)
          break
        }
      }

      return promise
    },
    structuredStream: async function* (
      schemaItems: SchemaItem[],
      ...args: Parameters<ChatWebLLM['stream']>
    ) {
      const worker = get().worker
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const [input, ...rest] = args
      worker.postMessage({
        messageId,
        type: 'structured-stream',
        payload: [schemaItems, parseLLMInputToBridgeJSON(input), ...rest],
      })
      const promise = new Promise<Awaited<ReturnType<ChatWebLLM['stream']>>>((resolve, reject) => {
        refProcesses.set(messageId, [resolve, reject, { type: 'invoke', data: [], lastIndex: 0 }])
      })

      while (true) {
        const process = refProcesses.get(messageId)
        if (process) {
          const [, , processInfo] = process
          const newData = processInfo.data.slice(processInfo.lastIndex)
          if (newData) {
            yield newData
            processInfo.lastIndex = processInfo.data.length > 0 ? processInfo.data.length : 0
          }
          await new Promise((resolve) => setTimeout(resolve, 200)) // Polling interval
        } else {
          yield promise.then((data) => data)
          break
        }
      }

      return promise
    },
  }
}
