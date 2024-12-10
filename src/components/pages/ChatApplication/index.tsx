'use client'

import { memo, useEffect, useRef, useState, KeyboardEvent, MouseEvent, lazy, Suspense } from 'react'
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

import { useChatApplicationData } from './hooks/use-chat-application-data'
import { ChatLLMInfo } from './components/ChatLLMInfo'
import { useSendMessage } from './hooks/use-send-message'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'

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
  const [isGenerating, setIsGenerating] = useState(false)
  const { mainLLMInfo, loadLLM, updateMessagesData, onThreadMessagesLoaded } =
    useChatApplicationData()
  const { sendMessage } = useSendMessage()
  const { input, messages, handleSubmit, handleInputChange, isLoading, reload, setMessages } =
    useChat({
      fetch: async (_input: RequestInfo | URL, init?: RequestInit) => {
        const body = JSON.parse(init?.body as string) as { messages: Message[] }
        const newMessageId = nanoid()
        const lastMessage = body.messages[body.messages.length - 1]
        setMessages((messages) => [
          ...messages,
          { id: nanoid(), content: lastMessage.content, role: 'user' },
          { id: newMessageId, content: 'Thinking...', role: 'assistant' },
        ])
        await sendMessage(lastMessage.content, undefined, [], {
          onMessageUpdate(info) {
            console.log('info.nodeData.content', info.nodeData.content)
            setMessages((messages) => {
              const newMessages = [...messages]
              const index = newMessages.findIndex((message) => message.id === newMessageId)
              if (index !== -1) {
                newMessages[index] = { ...newMessages[index], content: info.nodeData.content || '' }
              }
              return newMessages
            })
          },
        })
        // Update messages data
        setMessages((messages) => {
          updateMessagesData(messages)
          return messages
        })
        return new Response()
      },
      onResponse(response) {
        if (response) {
          console.log(response)
          setIsGenerating(false)
        }
      },
      onError(error) {
        if (error) {
          setIsGenerating(false)
        }
      },
    })

  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cleandUp = onThreadMessagesLoaded((messages) => {
      setMessages(messages || [])
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      }
    })
    return () => {
      cleandUp()
    }
  }, [setMessages, onThreadMessagesLoaded])

  const onSubmit = async (
    _value: string,
    e: KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>,
  ) => {
    setIsGenerating(true)
    handleSubmit(e)
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
  }

  return (
    <main className="flex h-full w-full max-w-2xl flex-col items-center mx-auto py-6 max-h-full">
      <ChatMessageList ref={messagesRef}>
        <div className="flex justify-center items-center">
          <ChatLLMInfo
            llm={mainLLMInfo?.llm}
            status={mainLLMInfo?.status}
            progress={mainLLMInfo?.progress}
            loadLLM={loadLLM}
          />
        </div>

        {messages &&
          messages.map((message, index) => (
            <ChatBubble key={index} variant={message.role == 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar src="" fallback={message.role == 'user' ? '👨🏽' : '🤖'} />
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
      <AIInput
        className="!max-w-2xl px-4"
        onSubmit={onSubmit}
        disabled={isLoading || mainLLMInfo?.status !== LLMStatusEnum.Loaded}
        placeholder="Type your message here..."
        maxHeight={72}
        value={input}
        onChange={handleInputChange}
      />
    </main>
  )
})

export default ChatApplication
