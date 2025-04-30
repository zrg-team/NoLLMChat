import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'
import AIInput from 'src/lib/shadcn/kokonutui/ai-input'
import { logDebug } from 'src/utils/logger'

import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import { useChatState } from 'src/components/pages/Session/state/chat'
import { useVSLiteApplicationState } from 'src/components/pages/Session/state/vslite'
import { ChatMessageList } from 'src/lib/shadcn/chat/chat-message-list'

import { ChatItem } from './ChatItem'
import { useClearMessages } from './hooks/use-clear-messages'
import ToolAction from './ToolAction'
import { useChat } from '../../hooks/use-chat'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'

interface ChatProps {
  sendMessage: ReturnType<typeof useChat>['createMessage']
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChatMainPanel({ sendMessage }: ChatProps) {
  const messageListRef = useRef<HTMLDivElement>(null)
  const llm = useWorkspaceState(useShallow((state) => state.llm))
  const ready = useVSLiteApplicationState(useShallow((state) => state.ready))
  const inProgressMessage = useChatState(useShallow((state) => state.inProgressMessage))
  const messages = useChatState(useShallow((state) => state.messages))
  const { clearMessages } = useClearMessages()
  const { t } = useTranslation('molecules')
  const abortControllerRef = useRef<AbortController>()

  const handleSubmit = useCallback(async (input: string) => {
    try {
      abortControllerRef.current = new AbortController()
      await sendMessage?.([{ content: input, role: 'human' }], {
        abortController: abortControllerRef.current,
        onMessageUpdate: () => {
          // TODO
        },
      })
      return true
    } catch (error) {
      logDebug('[Chat][HandleSubmit][Error]', error)
      return true
    } finally {
      abortControllerRef.current = undefined
    }
  }, [])

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort('STOP')
  }, [])

  useEffect(() => {
    if (messages?.length) {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [!!messages])

  useEffect(() => {
    if (inProgressMessage) {
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [inProgressMessage])

  const messageList = useMemo(() => {
    return messages?.map((message, index) => (
      <div key={message.id || `${index}`}>
        {Array.isArray(message?.metadata?.tool_calls)
          ? message?.metadata?.tool_calls.map((toolCall, actionIndex) => {
              if (
                typeof toolCall === 'object' &&
                toolCall &&
                'tool' in toolCall &&
                'toolInput' in toolCall
              ) {
                return (
                  <ToolAction
                    key={`Animated-Message-${toolCall.tool}-${actionIndex}`}
                    tool={toolCall.tool}
                    toolInput={toolCall.toolInput}
                    result={toolCall.result}
                    inProgressMessage={false}
                  />
                )
              }
              return
            })
          : undefined}
        <ChatItem
          message={message}
          index={index}
          isLastMessage={index === messages.length - 1}
          isGenerating={!!inProgressMessage}
        />
      </div>
    ))
  }, [messages, !!inProgressMessage])

  if (!llm) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <MessageLoading />
      </div>
    )
  }

  return (
    <div className="group relative w-full max-w-full mx-auto h-full flex">
      <div
        className="relative overflow-hidden border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md
              h-full flex flex-col w-full"
      >
        <div className="flex-1 overflow-y-auto">
          <ChatMessageList ref={messageListRef}>
            {messageList}
            {inProgressMessage ? (
              <>
                <ChatItem
                  key={`Animated-Message`}
                  message={inProgressMessage}
                  index={-1}
                  isLastMessage={false}
                />
                {Array.isArray(inProgressMessage?.metadata?.tool_calls)
                  ? inProgressMessage?.metadata?.tool_calls.map((toolCall, index) => {
                      if (
                        typeof toolCall === 'object' &&
                        toolCall &&
                        'tool' in toolCall &&
                        'toolInput' in toolCall
                      ) {
                        return (
                          <ToolAction
                            key={`Animated-Message-${toolCall.tool}-${index}`}
                            tool={toolCall.tool}
                            toolInput={toolCall.toolInput}
                            result={toolCall.result}
                            inProgressMessage
                          />
                        )
                      }
                      return
                    })
                  : undefined}
              </>
            ) : undefined}
          </ChatMessageList>
        </div>
        <div className="p-2 pb-0 border-t border-zinc-200/10 dark:border-zinc-800/50 relative">
          <AIInput
            disabled={!ready}
            className="!max-w-full"
            onSubmit={handleSubmit}
            onStop={handleStop}
            placeholder={t('chat.input_message_placeholder')}
            onClearChat={clearMessages}
            isLoading={!!inProgressMessage}
            inProgressMessage={!!inProgressMessage}
          />
        </div>
      </div>
    </div>
  )
}
