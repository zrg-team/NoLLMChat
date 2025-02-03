'use client'

import {
  memo,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useMemo,
} from 'react'
import { nanoid } from 'nanoid'
import { useTranslation } from 'react-i18next'
import { ChatMessageList } from 'src/lib/shadcn/chat/chat-message-list'
import { Message, useChat } from 'ai/react'
import AIInput from 'src/lib/kokonutui/ai-input'
import { LLMStatusEnum } from 'src/services/database/types'
import textToSpeech from 'src/utils/text-to-speech'
import { SidebarInset, SidebarProvider } from 'src/lib/shadcn/ui/sidebar'

import { useChatApplicationData } from './hooks/use-chat-application-data'
import { useSendMessage } from './hooks/use-send-message'
import { ChatPanel } from './components/ChatPanel'
import { ChatItem } from './components/ChatItem'
import { useUpdateLLMOptions } from './hooks/use-update-llm-options'

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

  const chatApplicationData = useChatApplicationData()
  const {
    schema,
    threadInfo,
    mainLLMInfo,
    retriverInfo,
    currentDataNode,
    loadLLM,
    setLLMInfo,
    addNewDataNode,
    selectDataNode,
    updateMessagesData,
    onThreadMessagesLoaded,
  } = chatApplicationData
  const { changeLLMOptions } = useUpdateLLMOptions()
  const { sendMessage } = useSendMessage(chatApplicationData)
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
        ])
        await sendMessage(
          lastMessage.content,
          body.messages || [],
          { retriverInfo },
          {
            schema,
            onInjectedMessages: (injectedMessages) => {
              if (injectedMessages.length) {
                setMessages((messages) => [
                  ...messages,
                  ...injectedMessages.map((message) => {
                    if (message._getType() === 'system') {
                      return {
                        id: nanoid(),
                        content: `${message.content}`,
                        role: 'system' as const,
                        data: { injectedMessage: true },
                      }
                    } else if (message._getType() === 'human') {
                      return {
                        id: nanoid(),
                        content: `${message.content}`,
                        role: 'user' as const,
                        data: { injectedMessage: true },
                      }
                    }
                    return {
                      id: nanoid(),
                      content: `${message.content}`,
                      role: 'assistant' as const,
                      data: { injectedMessage: true },
                    }
                  }),
                ])
              }
            },
            onResponseMessageCreate: (content) => {
              setMessages((messages) => [
                ...messages,
                { id: newMessageId, content: content || '', role: 'assistant' },
              ])
            },
            onMessageUpdate: (info) => {
              setMessages((messages) => {
                const newMessages = [...messages]
                const index = newMessages.findIndex((message) => message.id === newMessageId)
                if (index !== -1) {
                  newMessages[index] = {
                    ...newMessages[index],
                    content: info.nodeData.content || '',
                  }
                }
                return newMessages
              })
              if (isScrolling.current) {
                scrollToBottom()
              }
            },
          },
        )
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
    async (action: string, message: Message) => {
      if (action === 'Refresh') {
        setIsGenerating(true)
        try {
          await reload()
        } finally {
          setIsGenerating(false)
        }
      }

      if (action === 'Copy') {
        if (message && message.role === 'assistant') {
          navigator.clipboard.writeText(message.content)
        }
      }

      if (action === 'Volume') {
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
        <ChatItem
          key={message.id || `${index}`}
          message={message}
          index={index}
          isLastMessage={index === messages.length - 1}
          isGenerating={isGenerating}
          isSchema={schema ? true : false}
          onActionClick={handleActionClick}
        />
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
        retriverInfo={retriverInfo}
        onAddNewThread={addNewDataNode}
        onSelectThread={selectDataNode}
        changeLLMOptions={changeLLMOptions}
        setLLMInfo={setLLMInfo}
      />
    </SidebarProvider>
  )
})

export default ChatApplication
