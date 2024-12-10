import * as React from 'react'
import { cn } from 'src/lib/utils'

type ChatMessageListProps = React.HTMLAttributes<HTMLDivElement>

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      className={cn('flex flex-col w-full h-full p-4 gap-6 overflow-y-auto', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
)

ChatMessageList.displayName = 'ChatMessageList'

export { ChatMessageList }
