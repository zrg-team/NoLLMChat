import { memo, Suspense, useMemo } from 'react'
import { Message } from 'ai/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from 'src/lib/shadcn/chat/chat-bubble'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { MarkdownViewer } from 'src/components/molecules/MarkdownViewer'

const ChatAiIcons = [
  {
    icon: 'copy' as const,
    label: 'Copy',
  },
  {
    icon: 'refresh-ccw' as const,
    label: 'Refresh',
  },
  {
    icon: 'volume-2' as const,
    label: 'Volume',
  },
]

export const ChatItem = memo(
  ({
    message,
    index,
    isLastMessage,
    isGenerating,
    isSchema,
    onActionClick,
  }: {
    message: Message
    index: number
    isLastMessage: boolean
    isGenerating?: boolean
    isSchema?: boolean
    onActionClick: (action: string, message: Message) => Promise<void>
  }) => {
    const content = useMemo(() => {
      return (
        <MarkdownViewer
          style={{
            color: 'unset !important',
          }}
          source={
            message.content
              ? isSchema
                ? `\`\`\`json\n${message.content}\n\`\`\``
                : message.content
              : ''
          }
        />
      )
    }, [isSchema, message.content])
    return (
      <ChatBubble
        innerclassname={message.role == 'system' ? '!bg-transparent font-semibold' : undefined}
        key={index}
        variant={message.role == 'user' ? 'sent' : 'received'}
      >
        {message.role === 'system' ? (
          <div className="w-10 h-10" />
        ) : message.role === 'assistant' ? (
          <ChatBubbleAvatar
            src=""
            fallback={
              message.data && typeof message.data === 'object' && 'injectedMessage' in message.data
                ? '📂'
                : '🤖'
            }
          />
        ) : undefined}
        <ChatBubbleMessage>
          {isGenerating && isLastMessage && (!message.content || isSchema) ? (
            <MessageLoading />
          ) : (
            <Suspense fallback={<MessageLoading />}>
              {message.role === 'system' ? (
                <Badge className="!text-sm mb-1">System</Badge>
              ) : undefined}
              {content}
            </Suspense>
          )}
          {message.role === 'assistant' && isLastMessage && (
            <div className="flex items-center mt-1.5 gap-1">
              {!isGenerating && (
                <>
                  {ChatAiIcons.map((icon, iconIndex) => {
                    return (
                      <ChatBubbleAction
                        variant="ghost"
                        className="size-5"
                        key={iconIndex}
                        icon={<LazyIcon name={icon.icon} className="size-3" />}
                        onClick={() => onActionClick(icon.label, message)}
                      />
                    )
                  })}
                </>
              )}
            </div>
          )}
        </ChatBubbleMessage>
      </ChatBubble>
    )
  },
  () => false,
)
