import { memo, Suspense, useMemo } from 'react'
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
import { Message, MessageRoleEnum, MessageStatusEnum } from 'src/services/database/types'
import { useAppState } from 'src/states/app'
import { useShallow } from 'zustand/react/shallow'
import { cn } from 'src/lib/utils'

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
    message: Partial<Message>
    index: number
    isLastMessage: boolean
    isGenerating?: boolean
    isSchema?: boolean
    onActionClick?: (action: string, message: Partial<Message>) => Promise<void>
  }) => {
    const theme = useAppState(useShallow((state) => state.theme))
    const content = useMemo(() => {
      if (!message.content) {
        return <MessageLoading className={cn(theme === 'dark' ? 'text-white' : '')} />
      }
      if (message.status === MessageStatusEnum.Failed) {
        return <div className="text-red-500">{message.content}</div>
      }
      return (
        <MarkdownViewer
          source={
            message.content
              ? isSchema
                ? `\`\`\`json\n${message.content}\n\`\`\``
                : message.content
              : ''
          }
        />
      )
    }, [isSchema, message.content, message.status, theme])

    const isSent = [`${MessageRoleEnum.Human}`, `${MessageRoleEnum.User}`].includes(
      message.role || '',
    )
    return (
      <ChatBubble
        innerclassname={'bg-transparent!'}
        key={index}
        variant={isSent ? 'sent' : 'received'}
      >
        {message.role === MessageRoleEnum.System ? (
          <div className="w-10 h-10" />
        ) : message.role === 'assistant' ? (
          <ChatBubbleAvatar src="" fallback={'🤖'} />
        ) : undefined}
        <ChatBubbleMessage>
          {isGenerating && isLastMessage && (!message.content || isSchema) ? (
            <MessageLoading />
          ) : (
            <>
              {message.role === MessageRoleEnum.System ? (
                <Badge className="!text-sm mb-1">System</Badge>
              ) : undefined}
              <Suspense fallback={<MessageLoading />}>{content}</Suspense>
            </>
          )}
          {!isSent && isLastMessage && (
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
                        onClick={() => onActionClick?.(icon.label, message)}
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
