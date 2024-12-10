import { SetState, GetState } from 'src/utils/zustand'

import { sendToWorker, workerMessagesHandler } from 'src/utils/worker-base'
import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { InitProgressReport } from '@mlc-ai/web-llm'
import { nanoid } from 'nanoid'
import { parseLLMInputToBridgeJSON } from 'src/services/local-llm'
import { SchemaItem } from 'src/services/database/types'
import { fakeStreaming } from 'src/services/local-llm/utils/fake-streaming'
import { getEmptyPromise } from 'src/utils/promise'
import type { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { logWarn } from 'src/utils/logger'

import { LocalLLMState } from './state'
import { worker } from '../worker'

export interface LocalLLMStateActions {
  init: () => void
  setInitializing: (initializing: Partial<LocalLLMState['initializing']>) => void
  setSelectedModel: (selectedModel: string) => void
  setInitProgressCallback: (callback: (initProgress: InitProgressReport) => void) => () => void
  loadModel: (
    modelName: string,
    callback?: (initProgress: InitProgressReport) => void,
  ) => Promise<void>
  invoke: (...args: Parameters<ChatWebLLM['invoke']>) => ReturnType<ChatWebLLM['invoke']>
  stream: (
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<Awaited<ReturnType<BaseChatModel['stream']>>>
  structuredStream: (
    schemaItems: SchemaItem[],
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<Awaited<ReturnType<BaseChatModel['stream']>>>
  toolsCallingStream: (
    tools: {
      name: string
      description: string
      schemaItems: SchemaItem[]
    }[],
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<Awaited<ReturnType<BaseChatModel['stream']>>>
  getCurrentModelInfo: () => Promise<{
    model: string
    chatOptions: ChatWebLLM['chatOptions']
    appConfig: ChatWebLLM['appConfig']
  }>
  syncCachedLLMURLs: () => Promise<string[]>
}

const getHandleMessages = (get: GetState<LocalLLMState>, set: SetState<LocalLLMState>) => {
  return (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
    workerMessagesHandler<
      { messageId: string; type: string; payload: unknown },
      LocalLLMState['refProcesses']
    >(event, get().refProcesses, {
      onWorkerInit: () => set({ ready: true }),
    })
  }
}

async function load(
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

  const promiseInfo = getEmptyPromise(() => {
    sendToWorker(worker, 'load', options.messageId, args)
  })
  refProcesses.set(options.messageId, {
    promise: promiseInfo.promise,
    resolve: promiseInfo.resolve,
    reject: promiseInfo.reject,
    processInfo: { type: 'load', data: [], lastIndex: 0 },
  })

  return fakeStreaming(
    promiseInfo.promise as ReturnType<ChatWebLLM['stream']>,
    options.messageId,
    refProcesses,
    {
      lastChunkOnly: true,
    },
  )
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
        const oldHandler = get().handler
        if (worker && oldHandler) {
          worker.removeEventListener('message', oldHandler)
        }
        const handler = getHandleMessages(get, set)
        set({ handler })
        worker.addEventListener('message', handler)
      } catch (error) {
        logWarn('Failed to init', error)
      }
    },
    syncCachedLLMURLs: async () => {
      return caches
        .open('webllm/config')
        .then(async (cache) => {
          return cache.keys()
        })
        .then((requests) => {
          const urls = requests.map((request) => request.url)
          set({ cachedLLMURLs: urls })
          return urls
        })
    },
    loadModel: async (modelName, callback) => {
      let currentLoadModelMessageId = get().currentLoadModelMessageId
      const initProgressCallbacks = get().initProgressCallbacks
      const initializing = get().initializing
      const refProcesses = get().refProcesses
      if (currentLoadModelMessageId) {
        const process = refProcesses.get(currentLoadModelMessageId)
        if (process) {
          const { reject } = process
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
      const generator = await load(
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
          callback?.(data as InitProgressReport)
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
    invoke: (...args) => {
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'invoke', messageId, args)
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'invoke', data: [], lastIndex: 0 },
      })
      return promiseInfo.promise as ReturnType<ChatWebLLM['invoke']>
    },
    stream: (...args) => {
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const [input, ...rest] = args

      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'stream', messageId, [parseLLMInputToBridgeJSON(input), ...rest])
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'invoke', data: [], lastIndex: 0 },
      })
      const promise = promiseInfo.promise as ReturnType<ChatWebLLM['stream']>

      return fakeStreaming(promise, messageId, refProcesses)
    },
    structuredStream: (schemaItems, ...args) => {
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const [input, ...rest] = args

      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'structured-stream', messageId, [
          schemaItems,
          parseLLMInputToBridgeJSON(input),
          ...rest,
        ])
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'invoke', data: [], lastIndex: 0 },
      })

      const promise = promiseInfo.promise as ReturnType<ChatWebLLM['stream']>

      return fakeStreaming(promise, messageId, refProcesses)
    },
    toolsCallingStream: (tools, ...args) => {
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const [input, ...rest] = args

      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'tools-calling-stream', messageId, [
          tools,
          parseLLMInputToBridgeJSON(input),
          ...rest,
        ])
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'invoke', data: [], lastIndex: 0 },
      })

      const promise = promiseInfo.promise as ReturnType<ChatWebLLM['stream']>

      return fakeStreaming(promise, messageId, refProcesses)
    },
    getCurrentModelInfo: async () => {
      const refProcesses = get().refProcesses
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()

      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'get-current-model-info', messageId, [])
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'get-current-model-info', data: [], lastIndex: 0 },
      })

      return promiseInfo.promise as Promise<{
        model: string
        chatOptions: ChatWebLLM['chatOptions']
        appConfig: ChatWebLLM['appConfig']
      }>
    },
  }
}
