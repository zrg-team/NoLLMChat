import { VectorStore } from '@langchain/core/vectorstores'
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

export const LocalEmbeddingContext = createContext<{
  initializing?: { worker: boolean; init: boolean }
  similaritySearch?: (
    ...args: Parameters<VectorStore['similaritySearch']>
  ) => ReturnType<VectorStore['similaritySearch']>
  addDocuments?: (
    ...args: Parameters<VectorStore['addDocuments']>
  ) => ReturnType<VectorStore['addDocuments']>
}>({})
export const LocalEmbeddingMProvider = ({ children }: PropsWithChildren) => {
  const [initializing, setInitializing] = useState({ worker: true, init: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refProcesses = useRef<Map<string, [(data: any) => void, (reason?: any) => void]>>(new Map())
  const worker = useRef<Worker>()

  const handleMessages = useCallback(
    (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
      const messageId = event.data.messageId
      if (messageId === WOKER_INIT_MESSAGE_ID) {
        setInitializing((initializing) => ({ ...initializing, init: false }))
      } else if (event.data.type === 'complete' || event.data.type === 'error') {
        const [resolve, reject] = refProcesses.current.get(messageId) || []
        if (event.data.type === 'complete') {
          resolve?.(event.data.payload)
        } else {
          reject?.(new Error(JSON.stringify(event.data.payload)))
        }
        refProcesses.current.delete(messageId)
      } else if (event.data.type === 'started') {
        // do nothing
      } else if (event.data.type === 'inprogress') {
        // do nothing
      } else {
        console.warn('Unknown message type', event.data)
      }
    },
    [],
  )

  useLayoutEffect(() => {
    worker.current = new Worker(new URL('./embedding-worker.ts', import.meta.url), {
      type: 'module',
    })
    worker.current.addEventListener('message', handleMessages)
    setInitializing((initializing) => ({ ...initializing, worker: false }))
    return () => {
      worker.current?.removeEventListener('message', handleMessages)
      worker.current?.terminate()
    }
  }, [handleMessages])

  const similaritySearch = useCallback((...args: Parameters<VectorStore['similaritySearch']>) => {
    if (!worker.current) {
      throw new Error('Worker not initialized')
    }
    worker.current.postMessage({
      type: 'search',
      payload: args,
    })
    const messageId = Math.random().toString(36).slice(2)
    return new Promise<Awaited<ReturnType<VectorStore['similaritySearch']>>>((resolve, reject) => {
      refProcesses.current.set(messageId, [resolve, reject])
    })
  }, [])

  const addDocuments = useCallback((...args: Parameters<VectorStore['addDocuments']>) => {
    if (!worker.current) {
      throw new Error('Worker not initialized')
    }
    worker.current.postMessage({
      type: 'index',
      payload: {
        parameters: args,
        split: true,
      },
    })
    const messageId = Math.random().toString(36).slice(2)
    return new Promise<Awaited<ReturnType<VectorStore['addDocuments']>>>((resolve, reject) => {
      refProcesses.current.set(messageId, [resolve, reject])
    })
  }, [])

  const context = useMemo(
    () => ({ similaritySearch, initializing, addDocuments }),
    [similaritySearch, addDocuments, initializing],
  )

  return <LocalEmbeddingContext.Provider value={context}>{children}</LocalEmbeddingContext.Provider>
}
