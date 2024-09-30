import {
  FC,
  PropsWithChildren,
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  AssistantRuntimeProvider,
  AppendMessage,
  useExternalStoreRuntime,
  ThreadMessageLike,
} from '@assistant-ui/react'
import { LocalLLMContext } from 'src/modules/llm/provider'
import { STREAMING_ENABLED } from './constants'
import { useTranslation } from 'react-i18next'

export const RuntimeContext = createContext<{
  runtime?: ReturnType<typeof useExternalStoreRuntime>
}>({
  runtime: undefined,
})

const convertMessage = (message: ThreadMessageLike): ThreadMessageLike => {
  return message
}
export const RuntimeProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const llmContext = useContext(LocalLLMContext)
  const [isRunning, setIsRunning] = useState(false)
  const [messages, setMessages] = useState<ThreadMessageLike[]>([])
  const { t } = useTranslation('chat')

  const sendMessage = async (
    message: AppendMessage,
    options?: { type: 'replace' | 'insert' | 'update'; updateIndex?: number },
  ) => {
    setMessages((currentConversation) => {
      if (options?.type === 'update') {
        if (options?.updateIndex) {
          currentConversation[options.updateIndex] = JSON.parse(JSON.stringify(message))
          return [...currentConversation]
        }
        currentConversation.pop()
        return [...currentConversation, JSON.parse(JSON.stringify(message))]
      }
      return options?.type === 'replace' ? [message] : [...currentConversation, message]
    })
  }

  const onNew = async (message: AppendMessage) => {
    try {
      if (message.content[0]?.type !== 'text') {
        throw new Error('Only text messages are supported')
      }
      if (
        Object.values(llmContext.initializing ?? {}).some(Boolean) ||
        !llmContext.invoke ||
        !llmContext.stream
      ) {
        return
      }

      setMessages((currentConversation) => [...currentConversation, message])

      setIsRunning(true)
      let content = ''
      const history = messages.slice(2)

      const responseMessage = {
        role: 'assistant' as const,
        content: [
          {
            type: 'text' as const,
            text: t('assistant_loading_message'),
          },
        ],
        parentId: null,
      }

      sendMessage(responseMessage)
      if (!STREAMING_ENABLED) {
        const response = await llmContext.invoke?.([...history, message])
        content = `${response.content}`
      } else {
        const stream = llmContext.stream([...history, message])
        const chunks: string[] = []
        for await (const chunk of stream) {
          if (chunk && Array.isArray(chunk)) {
            chunks.push(...chunk.map((c) => c.content))
            if (chunks?.length) {
              responseMessage.content[0].text = chunks.join('')
              sendMessage(responseMessage, { type: 'update' })
            }
            content = chunks.join('')
          } else if (typeof chunk === 'string') {
            // Finish the stream
            content = chunk
          }
        }
      }
      responseMessage.content[0].text = content
      sendMessage(responseMessage, { type: 'update' })
    } catch (error) {
      console.error(error)
    } finally {
      setIsRunning(false)
    }
  }

  const onReload = async (parentId: string | null) => {
    console.log('onReload', parentId)
  }

  const runtime = useExternalStoreRuntime({
    isRunning,
    messages,
    convertMessage,
    onNew,
    onReload,
  })

  useEffect(() => {
    if (!runtime) {
      return
    }
    const instance = llmContext.setInitProgressCallback?.((initProgress) => {
      sendMessage({
        content: [
          {
            type: 'text',
            text: initProgress.progress === 100 ? t('assistant_welcome_message') : initProgress.text,
          },
        ],
        role: 'assistant',
        parentId: null,
      }, { type: 'replace' })
    })

    return () => {
      instance?.()
    }
  }, [runtime, llmContext.setInitProgressCallback, llmContext, t])

  const context = useMemo(() => ({ runtime }), [runtime])

  return (
    <RuntimeContext.Provider value={context}>
      <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>
    </RuntimeContext.Provider>
  )
})
