'use client'

import {
  memo,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react'
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from 'src/lib/shadcn/chat/chat-bubble'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/lib/utils'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { ChatMessageList } from 'src/lib/shadcn/chat/chat-message-list'
import { CopyIcon, RefreshCcw, Volume2 } from 'lucide-react'
import { Message, useChat } from 'ai/react'
import AIInput from 'src/lib/kokonutui/ai-input'
import { LLMStatusEnum } from 'src/services/database/types'
import textToSpeech from 'src/utils/text-to-speech'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'
import { SidebarInset, SidebarProvider } from 'src/lib/shadcn/ui/sidebar'

import { useChatApplicationData } from './hooks/use-chat-application-data'
import { useSendMessage } from './hooks/use-send-message'
import { ChatPanel } from './components/ChatPanel'

const MarkdownPreview = lazy(() => import('@uiw/react-markdown-preview'))

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: 'Copy',
  },
  {
    icon: RefreshCcw,
    label: 'Refresh',
  },
  {
    icon: Volume2,
    label: 'Volume',
  },
]

const ChatApplication = memo(() => {
  const { t } = useTranslation('applications')
  const isScrolling = useRef(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    }, 50)
  }, [])

  const {
    schema,
    threadInfo,
    mainLLMInfo,
    currentDataNode,
    loadLLM,
    addNewDataNode,
    selectDataNode,
    updateMessagesData,
    onThreadMessagesLoaded,
  } = useChatApplicationData()
  const { sendMessage } = useSendMessage()
  const {
    input,
    messages,
    isLoading,
    reload,
    setInput,
    handleSubmit,
    handleInputChange,
    setMessages,
  } = useChat({
    fetch: async (_input: RequestInfo | URL, init?: RequestInit) => {
      try {
        setIsGenerating(true)
        const body = JSON.parse(init?.body as string) as { messages: Message[] }
        const newMessageId = nanoid()
        const lastMessage = body.messages[body.messages.length - 1]
        isScrolling.current = true
        setMessages((messages) => [
          ...messages,
          { id: nanoid(), content: lastMessage.content, role: 'user' },
          { id: newMessageId, content: '', role: 'assistant' },
        ])
        await sendMessage(lastMessage.content, body.messages || [], undefined, [], {
          schema,
          onMessageUpdate(info) {
            setMessages((messages) => {
              const newMessages = [...messages]
              const index = newMessages.findIndex((message) => message.id === newMessageId)
              if (index !== -1) {
                newMessages[index] = { ...newMessages[index], content: info.nodeData.content || '' }
              }
              return newMessages
            })
            if (isScrolling.current) {
              scrollToBottom()
            }
          },
        })
        setMessages((messages) => {
          updateMessagesData(messages)
          return messages
        })
        setIsGenerating(false)
        setInput('')
        if (isScrolling.current) {
          scrollToBottom()
        }
        return new Response()
      } finally {
        setIsGenerating(false)
      }
    },
  })

  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleandUp = onThreadMessagesLoaded((messages) => {
      setMessages(messages || [])
      scrollToBottom()
    })
    return () => {
      cleandUp()
    }
  }, [setMessages, onThreadMessagesLoaded, scrollToBottom])

  const onSubmit = async (
    _value: string,
    e: KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    setIsGenerating(true)
    await handleSubmit(e)
    return true
  }

  const handleActionClick = useCallback(
    async (action: string, messageIndex: number, messages: Message[]) => {
      if (action === 'Refresh') {
        setIsGenerating(true)
        try {
          await reload()
        } catch (error) {
          console.error('Error reloading:', error)
        } finally {
          setIsGenerating(false)
        }
      }

      if (action === 'Copy') {
        const message = messages[messageIndex]
        if (message && message.role === 'assistant') {
          navigator.clipboard.writeText(message.content)
        }
      }

      if (action === 'Volume') {
        const message = messages[messageIndex]
        if (message?.content) {
          await textToSpeech.speak(message?.content || '')
        }
      }
    },
    [reload],
  )

  const handleStopScroll = useCallback(() => (isScrolling.current = false), [])

  const messageList = useMemo(() => {
    return (
      messages &&
      messages.map((message, index) => (
        <ChatBubble
          innerclassname={message.role == 'system' ? '!bg-transparent font-semibold' : undefined}
          key={index}
          variant={message.role == 'user' ? 'sent' : 'received'}
        >
          {message.role === 'system' ? (
            <div className="w-10 h-10" />
          ) : message.role === 'assistant' ? (
            <ChatBubbleAvatar src="" fallback={'🤖'} />
          ) : undefined}
          <ChatBubbleMessage>
            {isGenerating && messages.length - 1 === index && (!message.content || schema) ? (
              <MessageLoading />
            ) : (
              <Suspense fallback={<MessageLoading />}>
                {message.role === 'system' ? (
                  <Badge className="!text-sm mb-1">System</Badge>
                ) : undefined}
                <MarkdownPreview
                  className={cn(
                    '[&_p]:leading-relaxed !max-w-full !bg-transparent !font-sans !text-sm',
                  )}
                  style={{
                    color: 'unset !important',
                  }}
                  source={
                    message.content
                      ? schema
                        ? `\`\`\`json\n${message.content}\n\`\`\``
                        : message.content
                      : ''
                  }
                />
              </Suspense>
            )}
            {message.role === 'assistant' && messages.length - 1 === index && (
              <div className="flex items-center mt-1.5 gap-1">
                {!isGenerating && (
                  <>
                    {ChatAiIcons.map((icon, iconIndex) => {
                      const Icon = icon.icon
                      return (
                        <ChatBubbleAction
                          variant="ghost"
                          className="size-5"
                          key={iconIndex}
                          icon={<Icon className="size-3" />}
                          onClick={() => handleActionClick(icon.label, index, messages)}
                        />
                      )
                    })}
                  </>
                )}
              </div>
            )}
          </ChatBubbleMessage>
        </ChatBubble>
      ))
    )
  }, [messages, isGenerating, schema, handleActionClick])

  return (
    <SidebarProvider
      onClick={handleStopScroll}
      className="max-h-full !overflow-hidden !min-h-full"
      style={{ minHeight: 'unset' }}
      defaultOpen={true}
    >
      <SidebarInset className="!max-h-full !overflow-hidden" style={{ minHeight: 'unset' }}>
        <main className="flex h-full w-full max-w-2xl flex-col items-center mx-auto overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-full max-w-full">
            <ChatMessageList className="!max-h-full" ref={messagesRef}>
              {messageList}
            </ChatMessageList>
          </div>
          <AIInput
            className="!max-w-2xl px-4"
            onSubmit={onSubmit}
            disabled={isLoading || isGenerating || mainLLMInfo?.status !== LLMStatusEnum.Loaded}
            placeholder={t('chat.input_message_placeholder')}
            maxHeight={72}
            value={input}
            onChange={handleInputChange}
          />
        </main>
      </SidebarInset>
      <ChatPanel
        schema={schema}
        currentDataNode={currentDataNode}
        threadNode={threadInfo?.threadNode}
        loadLLM={loadLLM}
        mainLLMInfo={mainLLMInfo}
        onAddNewThread={addNewDataNode}
        onSelectThread={selectDataNode}
      />
    </SidebarProvider>
  )
})

export default ChatApplication
