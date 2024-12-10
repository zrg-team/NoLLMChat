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
} from 'react'
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from 'src/lib/shadcn/chat/chat-bubble'
import { nanoid } from 'nanoid'
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
    threadInfo,
    mainLLMInfo,
    currentDataNode,
    loadLLM,
    updateMessagesData,
    onThreadMessagesLoaded,
  } = useChatApplicationData()
  const { sendMessage } = useSendMessage()
  const {
    input,
    setInput,
    messages,
    handleSubmit,
    handleInputChange,
    isLoading,
    reload,
    setMessages,
  } = useChat({
    fetch: async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(init?.body as string) as { messages: Message[] }
      const newMessageId = nanoid()
      const lastMessage = body.messages[body.messages.length - 1]
      isScrolling.current = true
      setMessages((messages) => [
        ...messages,
        { id: nanoid(), content: lastMessage.content, role: 'user' },
        { id: newMessageId, content: 'Thinking...', role: 'assistant' },
      ])
      await sendMessage(lastMessage.content, body.messages || [], undefined, [], {
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
      // Update messages data
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

  const handleActionClick = async (action: string, messageIndex: number) => {
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
  }

  const handleStopScroll = useCallback(() => (isScrolling.current = false), [])

  return (
    <SidebarProvider
      onClick={handleStopScroll}
      className="max-h-full !overflow-hidden !min-h-full"
      style={{ minHeight: 'unset' }}
      defaultOpen={true}
    >
      <SidebarInset className="!max-h-full !overflow-hidden" style={{ minHeight: 'unset' }}>
        <main className="flex h-full w-full max-w-2xl flex-col items-center mx-auto overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-w-full">
            <ChatMessageList className="!max-h-full" ref={messagesRef}>
              {messages &&
                messages.map((message, index) => (
                  <ChatBubble key={index} variant={message.role == 'user' ? 'sent' : 'received'}>
                    {message.role !== 'user' ? (
                      <ChatBubbleAvatar src="" fallback={'🤖'} />
                    ) : undefined}
                    <ChatBubbleMessage>
                      <Suspense fallback={<MessageLoading />}>
                        <MarkdownPreview
                          className="!text-sm [&_p]:leading-relaxed !max-w-full !bg-transparent !text-inherit !font-sans"
                          source={message.content || ''}
                        />
                      </Suspense>

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
                                    onClick={() => handleActionClick(icon.label, index)}
                                  />
                                )
                              })}
                            </>
                          )}
                        </div>
                      )}
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))}
            </ChatMessageList>
          </div>
          <AIInput
            className="!max-w-2xl px-4"
            onSubmit={onSubmit}
            disabled={isLoading || isGenerating || mainLLMInfo?.status !== LLMStatusEnum.Loaded}
            placeholder="Type your message here..."
            maxHeight={72}
            value={input}
            onChange={handleInputChange}
          />
        </main>
      </SidebarInset>
      <ChatPanel
        currentDataNode={currentDataNode}
        threadNode={threadInfo?.threadNode}
        loadLLM={loadLLM}
        mainLLMInfo={mainLLMInfo}
      />
    </SidebarProvider>
  )
})

export default ChatApplication
