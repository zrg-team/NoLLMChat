import { cn } from '@udecode/cn'
import { Message } from 'ai/react'
import { CopyIcon, RefreshCcw, Volume2 } from 'lucide-react'
import { lazy, memo, Suspense } from 'react'
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from 'src/lib/shadcn/chat/chat-bubble'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'
import { Badge } from 'src/lib/shadcn/ui/badge'

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
              <MarkdownPreview
                className={cn(
                  '[&_p]:leading-relaxed !max-w-full !bg-transparent !font-sans !text-sm',
                )}
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
            </Suspense>
          )}
          {message.role === 'assistant' && isLastMessage && (
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
  (prev, next) =>
    prev.message.content === next.message.content && prev.isLastMessage === next.isLastMessage,
)
