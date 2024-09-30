'use client'

import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  BranchPickerPrimitiveRootProps,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from '@assistant-ui/react'
import type { FC } from 'react'

import { Avatar, AvatarFallback } from 'src/components/shadcn/ui/avatar'
// import { Button } from 'src/components/shadcn/ui/button'
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from 'lucide-react'
import { MarkdownText } from 'src/components/shadcn/ui/assistant-ui/markdown-text'
import { TooltipIconButton } from 'src/components/shadcn/ui/assistant-ui/tooltip-icon-button'
import { cn } from 'src/lib/utils'

export const Thread: FC<{ hideInput?: boolean }> = ({ hideInput }) => {
  return (
    <ThreadPrimitive.Root className="tw-bg-background tw-h-full">
      <ThreadPrimitive.Viewport className="tw-flex tw-h-full tw-flex-col tw-items-center tw-overflow-y-scroll tw-scroll-smooth tw-bg-inherit tw-px-4 tw-pt-8">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            // EditComposer,
            AssistantMessage,
          }}
        />

        <div className="tw-sticky tw-bottom-0 tw-mt-4 tw-flex tw-w-full tw-max-w-2xl tw-flex-grow tw-flex-col tw-items-center tw-justify-end tw-rounded-t-lg tw-bg-inherit tw-pb-4">
          <ThreadScrollToBottom />
          {!hideInput ? <Composer /> : null}
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  )
}

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="tw-absolute tw--top-8 tw-rounded-full disabled:tw-invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  )
}

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="tw-flex tw-flex-grow tw-basis-full tw-flex-col tw-items-center tw-justify-center">
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <p className="tw-mt-4 tw-font-medium">How can I help you today?</p>
      </div>
    </ThreadPrimitive.Empty>
  )
}

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="tw-relative tw-flex tw-w-full tw-items-end tw-rounded-lg tw-border tw-transition-shadow focus-within:tw-shadow-sm">
      <ComposerPrimitive.Input
        autoFocus
        disabled
        placeholder="Write a message..."
        rows={1}
        className="placeholder:tw-text-muted-foreground tw-size-full tw-max-h-40 tw-resize-none tw-border-none tw-bg-transparent tw-p-4 tw-pr-12 tw-text-sm tw-outline-none focus:tw-ring-0"
      />
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="tw-absolute tw-bottom-0 tw-right-0 tw-m-2.5 tw-size-8 tw-p-2 tw-transition-opacity"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="tw-absolute tw-bottom-0 tw-right-0 tw-m-2.5 tw-size-8 tw-p-2 tw-transition-opacity"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </ComposerPrimitive.Root>
  )
}

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="tw-grid tw-w-full tw-max-w-2xl tw-auto-rows-auto tw-grid-cols-[minmax(72px,1fr)_auto] tw-gap-y-2 tw-py-4">
      <ActionBarPrimitive.Root
        hideWhenRunning
        autohide="not-last"
        className="tw-col-start-1 tw-mr-3 tw-mt-2.5 tw-flex tw-flex-col tw-items-end"
      >
        <ActionBarPrimitive.Edit asChild>
          <TooltipIconButton tooltip="Edit">
            <PencilIcon />
          </TooltipIconButton>
        </ActionBarPrimitive.Edit>
      </ActionBarPrimitive.Root>

      <div className="tw-bg-muted tw-text-foreground tw-col-start-2 tw-row-start-1 tw-max-w-xl tw-break-words tw-rounded-3xl tw-px-5 tw-py-2.5">
        <MessagePrimitive.Content />
      </div>

      <BranchPicker className="tw-col-span-full tw-col-start-1 tw-row-start-2 tw--mr-1 tw-justify-end" />
    </MessagePrimitive.Root>
  )
}

// const EditComposer: FC = () => {
//   return (
//     <ComposerPrimitive.Root className="tw-bg-muted tw-my-4 tw-flex tw-w-full tw-max-w-2xl tw-flex-col tw-gap-2 tw-rounded-xl">
//       <ComposerPrimitive.Input className="tw-text-foreground tw-flex tw-h-8 tw-w-full tw-resize-none tw-border-none tw-bg-transparent tw-p-4 tw-pb-0 tw-outline-none focus:tw-ring-0" />

//       <div className="tw-mx-3 tw-mb-3 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-self-end">
//         <ComposerPrimitive.Cancel asChild>
//           <Button variant="ghost">Cancel</Button>
//         </ComposerPrimitive.Cancel>
//         <ComposerPrimitive.Send asChild>
//           <Button>Send</Button>
//         </ComposerPrimitive.Send>
//       </div>
//     </ComposerPrimitive.Root>
//   )
// }

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="tw-relative tw-grid tw-w-full tw-max-w-2xl tw-grid-cols-[auto_auto_1fr] tw-grid-rows-[auto_1fr] tw-py-4">
      <Avatar className="tw-col-start-1 tw-row-span-full tw-row-start-1 tw-mr-4">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <div className="tw-text-foreground tw-col-span-2 tw-col-start-2 tw-row-start-1 tw-my-1.5 tw-max-w-xl tw-break-words tw-leading-7">
        <MessagePrimitive.Content components={{ Text: MarkdownText }} />
      </div>

      <BranchPicker className="tw-col-start-2 tw-row-start-2 tw--ml-2 tw-mr-2" />

      <ActionBarPrimitive.Root
        hideWhenRunning
        autohide="not-last"
        autohideFloat="single-branch"
        className="tw-text-muted-foreground data-[floating]:tw-bg-background tw-col-start-3 tw-row-start-2 tw--ml-1 tw-flex tw-gap-1 data-[floating]:tw-absolute data-[floating]:tw-rounded-md data-[floating]:tw-border data-[floating]:tw-p-1 data-[floating]:tw-shadow-sm"
      >
        <ActionBarPrimitive.Copy asChild>
          <TooltipIconButton tooltip="Copy">
            <MessagePrimitive.If copied>
              <CheckIcon />
            </MessagePrimitive.If>
            <MessagePrimitive.If copied={false}>
              <CopyIcon />
            </MessagePrimitive.If>
          </TooltipIconButton>
        </ActionBarPrimitive.Copy>
        <ActionBarPrimitive.Reload asChild>
          <TooltipIconButton tooltip="Refresh">
            <RefreshCwIcon />
          </TooltipIconButton>
        </ActionBarPrimitive.Reload>
      </ActionBarPrimitive.Root>
    </MessagePrimitive.Root>
  )
}

const BranchPicker: FC<BranchPickerPrimitiveRootProps> = ({ className, ...rest }) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        'tw-text-muted-foreground tw-inline-flex tw-items-center tw-text-xs',
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="tw-font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  )
}

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  )
}
