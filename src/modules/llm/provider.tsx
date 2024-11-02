import { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import { BaseMessageChunk } from '@langchain/core/messages'
import { InitProgressReport } from '@mlc-ai/web-llm'
import { nanoid } from 'nanoid'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { WOKER_INIT_MESSAGE_ID } from 'src/utils/worker-base'

export const LocalLLMContext = createContext<{
  selectedModel?: string
  initializing?: { worker: boolean; init: boolean; loading: boolean }
  invoke?: (...args: Parameters<ChatWebLLM['invoke']>) => ReturnType<ChatWebLLM['invoke']>
  stream?: (
    ...args: Parameters<ChatWebLLM['stream']>
  ) => AsyncGenerator<unknown, BaseMessageChunk, unknown>
  setInitProgressCallback?: (callback: (initProgress: InitProgressReport) => void) => () => void
  loadModel?: (modelId: string) => Promise<void>
}>({})
export const LocalLLMProvider = ({ children }: PropsWithChildren) => {
  const [initializing, setInitializing] = useState({ worker: true, init: true, loading: false })
  const [selectedModel, setSelectedModel] = useState<string>()
  const initProgressCallbacksRef = useRef<((initProgress: InitProgressReport) => void)[]>([])
  const currentLoadModelMessageIdRef = useRef<string>()
  const refProcesses = useRef<
    Map<
      string,
      [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (reason?: any) => void,
        { type: string; data: unknown[]; lastIndex: number },
      ]
    >
  >(new Map())
  const worker = useRef<Worker>()

  const initProgressCallback = useCallback((initProgress: InitProgressReport) => {
    initProgressCallbacksRef.current.forEach((callback) => callback(initProgress))
  }, [])

  const setInitProgressCallback = useCallback(
    (callback: (initProgress: InitProgressReport) => void) => {
      initProgressCallbacksRef.current.push(callback)
      return () => {
        initProgressCallbacksRef.current = initProgressCallbacksRef.current.filter(
          (cb) => cb !== callback,
        )
      }
    },
    [],
  )

  const handleMessages = useCallback(
    (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
      const messageId = event.data.messageId
      if (!messageId) {
        return
      }
      const [resolve, reject, processInfo] = refProcesses.current.get(messageId) || []
      if (messageId === WOKER_INIT_MESSAGE_ID) {
        setInitializing((initializing) => ({ ...initializing, init: false }))
      } else if (['complete', 'error'].includes(event.data.type)) {
        if (event.data.type === 'complete') {
          resolve?.(event.data.payload || {})
        } else {
          reject?.(new Error(JSON.stringify(event.data.payload)))
        }
        refProcesses.current.delete(messageId)
      } else if (event.data.type === 'inprogress') {
        if (processInfo?.data) {
          processInfo.data.push(event.data.payload)
        }
      } else if (event.data.type === 'started') {
        // do nothing
      } else {
        console.warn('Unknown message type', event.data)
      }
    },
    [],
  )

  const load = useCallback(async function* (
    messageId = Math.random().toString(36).slice(2),
    ...args: ConstructorParameters<typeof ChatWebLLM>
  ) {
    if (!worker.current) {
      throw new Error('Worker not initialized')
    }

    worker.current.postMessage({
      messageId,
      type: 'load',
      payload: args,
    })
    const promise = new Promise<void>((resolve, reject) => {
      refProcesses.current.set(messageId, [
        resolve,
        reject,
        { type: 'load', data: [], lastIndex: 0 },
      ])
    })

    while (true) {
      const process = refProcesses.current.get(messageId)
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
  }, [])

  const invoke = useCallback((...args: Parameters<ChatWebLLM['invoke']>) => {
    if (!worker.current) {
      throw new Error('Worker not initialized')
    }
    const messageId = Math.random().toString(36).slice(2)
    worker.current.postMessage({
      messageId,
      type: 'invoke',
      payload: args,
    })
    return new Promise<Awaited<ReturnType<ChatWebLLM['invoke']>>>((resolve, reject) => {
      refProcesses.current.set(messageId, [
        resolve,
        reject,
        { type: 'invoke', data: [], lastIndex: 0 },
      ])
    })
  }, [])

  const stream = useCallback(async function* (...args: Parameters<ChatWebLLM['invoke']>) {
    if (!worker.current) {
      throw new Error('Worker not initialized')
    }
    const messageId = Math.random().toString(36).slice(2)
    worker.current.postMessage({
      messageId,
      type: 'stream',
      payload: args,
    })
    const promise = new Promise<Awaited<ReturnType<ChatWebLLM['invoke']>>>((resolve, reject) => {
      refProcesses.current.set(messageId, [
        resolve,
        reject,
        { type: 'invoke', data: [], lastIndex: 0 },
      ])
    })

    while (true) {
      const process = refProcesses.current.get(messageId)
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
  }, [])

  const loadModel = useCallback(async (modelName: string) => {
    if (currentLoadModelMessageIdRef.current) {
      const process = refProcesses.current.get(currentLoadModelMessageIdRef.current)
      if (process) {
        const [, reject] = process
        reject?.('stop')
        refProcesses.current.delete(currentLoadModelMessageIdRef.current)
      }
    }
    currentLoadModelMessageIdRef.current = nanoid()
    setSelectedModel(modelName)
    setInitializing((initializing) => ({ ...initializing, loading: true }))
    const generator = load(currentLoadModelMessageIdRef.current, {
      model: modelName,
    })
    for await (const data of generator) {
      if (data) {
        initProgressCallback(data as InitProgressReport)
      }
    }
    setInitializing((initializing) => ({ ...initializing, loading: false }))
    setTimeout(
      () => {
        initProgressCallback({
          progress: 100,
          timeElapsed: 1,
          text: `Model ${selectedModel} loaded.`,
        })
        setInitializing((initializing) => ({ ...initializing, loading: false }))
      },
      100,
    )
  }, [initProgressCallback, load, selectedModel])

  useLayoutEffect(() => {
    worker.current = new Worker(new URL('./langchain-worker.ts', import.meta.url), {
      type: 'module',
    })
    worker.current.addEventListener('message', handleMessages)
    setInitializing((initializing) => ({ ...initializing, worker: false }))

    return () => {
      worker.current?.removeEventListener('message', handleMessages)
      worker.current?.terminate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleMessages, load, refProcesses.current])

  const context = useMemo(
    () => ({
      stream,
      invoke,
      initializing,
      setInitProgressCallback,
      loadModel,
      selectedModel,
    }),
    [stream, invoke, initializing, setInitProgressCallback, loadModel, selectedModel],
  )

  return <LocalLLMContext.Provider value={context}>{children}</LocalLLMContext.Provider>
}
