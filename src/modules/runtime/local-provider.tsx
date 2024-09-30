import {
  FC,
  PropsWithChildren,
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { AssistantRuntimeProvider, ChatModelAdapter, useLocalRuntime } from '@assistant-ui/react'
import { LocalLLMContext } from 'src/modules/llm/provider'
import { STREAMING_ENABLED } from './constants'

export const RuntimeContext = createContext<{
  runtime?: ReturnType<typeof useLocalRuntime>
}>({
  runtime: undefined,
})

export const RuntimeProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const initialRef = useRef(true)
  const llmContext = useContext(LocalLLMContext)

  const adapter = useMemo<ChatModelAdapter>(() => {
    return {
      run: async function* ({ messages }) {
        if (
          Object.values(llmContext.initializing ?? {}).some(Boolean) ||
          !llmContext.invoke ||
          !llmContext.stream
        ) {
          yield {
            content: [
              {
                type: 'text',
                text: 'Initializing...',
              },
            ],
            role: 'system',
            parentId: null,
          }
          return
        }
        if (initialRef.current) {
          initialRef.current = false
          yield {
            content: [
              {
                type: 'text',
                text: 'Hello! How can I help you today?',
              },
            ],
            role: 'assistant',
            parentId: null,
          }
          return
        }
        let content = ''
        // Remove 0, 1 index from messages array
        const history = messages.slice(2)
        if (!STREAMING_ENABLED) {
          const response = await llmContext.invoke?.(history)
          content = `${response.content}`
        } else {
          const stream = llmContext.stream(history)
          const chunks = []
          for await (const chunk of stream) {
            if (chunk && Array.isArray(chunk)) {
              chunks.push(...chunk.map((c) => c.content))
              yield {
                role: 'assistant',
                content: [
                  {
                    type: 'text',
                    text: chunks.join(''),
                  },
                ],
              }
              content = chunks.join('')
            } else if (typeof chunk === 'string') {
              // Finish the stream
              content = chunk
            }
          }
        }
        yield {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        }
      },
    }
  }, [llmContext])
  const runtime = useLocalRuntime(adapter)

  useEffect(() => {
    if (!runtime) {
      return
    }
    const instance = llmContext.setInitProgressCallback?.((initProgress) => {
      runtime.thread.append({
        content: [
          {
            type: 'text',
            text: initProgress.text,
          },
        ],
        role: 'user',
        parentId: null,
      })
    })

    return () => {
      instance?.()
    }
  }, [runtime, llmContext.setInitProgressCallback, llmContext])

  const context = useMemo(() => ({ runtime }), [runtime])

  return (
    <RuntimeContext.Provider value={context}>
      <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>
    </RuntimeContext.Provider>
  )
})
