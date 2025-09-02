import { SetState, GetState } from 'src/utils/zustand'

import { sendToWorker, workerMessagesHandler } from 'src/utils/worker-base'
import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import type { InitProgressReport } from '@mlc-ai/web-llm'
import { nanoid } from 'nanoid'
import { parseLLMInputToBridgeJSON } from '../utils/serialize'
import { LLMProviderEnum } from 'src/services/database/types'
import { fakeStreaming } from '../utils/fake-streaming'
import { getEmptyPromise } from 'src/utils/promise'
import type { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { logWarn } from 'src/utils/logger'

import { WebLLMState } from './state'
import { getWebLLMWorker } from '../worker'

export interface WebLLMStateActions {
  init: () => void
  destroy: () => void
  setInitializing: (initializing: Partial<WebLLMState['initializing']>) => void
  setSelectedModel: (selectedModel: string) => void
  setInitProgressCallback: (callback: (initProgress: InitProgressReport) => void) => () => void
  loadModel: (
    modelName: string,
    options: {
      callback?: (initProgress: InitProgressReport) => void
      provider: `${LLMProviderEnum}`
    },
  ) => Promise<void>
  unLoadModel: () => void
  chatCompletion: (
    messages: Parameters<ChatWebLLM['stream']>[0],
    options: Parameters<ChatWebLLM['stream']>[1] & {
      provider: `${LLMProviderEnum}`
      stream?: boolean
      response_format?: {
        type: 'json_object'
        schema: Record<string, unknown>
      }
      tools?: {
        type: 'function'
        function: {
          name: string
          description: string
          parameters: Record<string, unknown>
        }
      }[]
    },
  ) =>
    | AsyncGenerator<Awaited<ReturnType<BaseChatModel['stream']>>>
    | ReturnType<ChatWebLLM['invoke']>
  getCurrentModelInfo: () => Promise<{
    model: string
    chatOptions: ChatWebLLM['chatOptions']
    appConfig: ChatWebLLM['appConfig']
  }>
  syncCachedLLMURLs: () => Promise<string[]>
}

const getHandleMessages = (get: GetState<WebLLMState>, set: SetState<WebLLMState>) => {
  return (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
    workerMessagesHandler<
      { messageId: string; type: string; payload: unknown },
      WebLLMState['refProcesses']
    >(event, get().refProcesses, {
      onWorkerInit: () => set({ ready: true }),
    })
  }
}

async function load(
  options: {
    messageId: string
    worker?: Worker
    refProcesses: WebLLMState['refProcesses']
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

export const getWebLLMStateActions = (
  set: SetState<WebLLMState>,
  get: GetState<WebLLMState>,
): WebLLMStateActions => {
  return {
    setInitializing: (initializing) => {
      const currentInitializing = get().initializing
      set({ initializing: { ...currentInitializing, ...initializing } })
    },
    setSelectedModel: (selectedModel) => {
      set({ selectedModel })
    },
    destroy: () => {
      try {
        const oldHandler = get().handler
        const worker = get().worker
        if (worker) {
          if (oldHandler) {
            worker.removeEventListener('message', oldHandler)
          }
          worker.terminate()
        }

        set({ handler: undefined, worker: undefined })
      } catch (error) {
        logWarn('Destroy Local LLM thread', error)
      }
    },
    init: () => {
      try {
        const oldHandler = get().handler
        const worker = get().worker
        if (worker) {
          if (oldHandler) {
            worker.removeEventListener('message', oldHandler)
          }
          worker.terminate()
        }
        const newWorker = getWebLLMWorker()
        const handler = getHandleMessages(get, set)
        newWorker.addEventListener('message', handler)
        set({ handler, worker: newWorker })
      } catch (error) {
        logWarn('Init Local LLM Thread', error)
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
    loadModel: async (modelName, { callback }) => {
      let currentLoadModelMessageId = get().currentLoadModelMessageId
      const worker = get().worker
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
        currentLoadModelMessageId,
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
    unLoadModel: () => {
      const worker = get().worker
      const refProcesses = get().refProcesses
      const currentLoadModelMessageId = get().currentLoadModelMessageId
      if (currentLoadModelMessageId) {
        const process = refProcesses.get(currentLoadModelMessageId)
        if (process) {
          const { reject } = process
          reject?.('stop')
          refProcesses.delete(currentLoadModelMessageId)
        }
      }
      if (worker) {
        sendToWorker(worker, 'unload', nanoid(), [])
      }
      set({ selectedModel: undefined })
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
    chatCompletion: (messages, options) => {
      const refProcesses = get().refProcesses
      const worker = get().worker
      if (!worker) {
        throw new Error('Worker not initialized')
      }
      const messageId = nanoid()
      const { provider, stream = true, response_format, tools, ...rest } = options

      // Determine operation type based on parameters
      let operationType: string
      let payload: unknown[]

      if (response_format?.type === 'json_object') {
        operationType = 'structured-stream'
        payload = [
          response_format.schema,
          parseLLMInputToBridgeJSON(messages),
          { provider, ...rest },
        ]
      } else if (tools?.length) {
        operationType = 'tools-calling-stream'
        const processedTools = tools.map((tool) => ({
          name: tool.function.name,
          description: tool.function.description,
          schema: tool.function.parameters,
        }))
        payload = [processedTools, parseLLMInputToBridgeJSON(messages), { provider, ...rest }]
      } else {
        operationType = stream ? 'stream' : 'invoke'
        payload = stream
          ? [parseLLMInputToBridgeJSON(messages), { provider, ...rest }]
          : [parseLLMInputToBridgeJSON(messages), { provider, ...rest }]
      }

      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, operationType, messageId, payload)
      })
      refProcesses.set(messageId, {
        promise: promiseInfo.promise,
        resolve: promiseInfo.resolve,
        reject: promiseInfo.reject,
        processInfo: { type: 'invoke', data: [], lastIndex: 0 },
      })

      if (stream) {
        const promise = promiseInfo.promise as ReturnType<ChatWebLLM['stream']>
        return fakeStreaming(promise, messageId, refProcesses, { interval: 50 })
      } else {
        return promiseInfo.promise as ReturnType<ChatWebLLM['invoke']>
      }
    },
    getCurrentModelInfo: async () => {
      const refProcesses = get().refProcesses
      const worker = get().worker
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
