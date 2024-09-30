'use client'

import {
  CodeHeaderProps,
  MarkdownTextPrimitive,
  useIsMarkdownCodeBlock,
} from '@assistant-ui/react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { FC, memo, useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { TooltipIconButton } from 'src/components/shadcn/ui/assistant-ui/tooltip-icon-button'
import { SyntaxHighlighter } from 'src/components/shadcn/ui/assistant-ui/syntax-highlighter'
import { cn } from 'src/lib/utils'

import 'katex/dist/katex.min.css'

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1: ({ className, ...props }) => (
          <h1
            className={cn(
              'tw-mb-8 tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight last:tw-mb-0',
              className,
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              'tw-mb-4 tw-mt-8 tw-scroll-m-20 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0 last:tw-mb-0',
              className,
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              'tw-mb-4 tw-mt-6 tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight first:tw-mt-0 last:tw-mb-0',
              className,
            )}
            {...props}
          />
        ),
        h4: ({ className, ...props }) => (
          <h4
            className={cn(
              'tw-mb-4 tw-mt-6 tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight first:tw-mt-0 last:tw-mb-0',
              className,
            )}
            {...props}
          />
        ),
        h5: ({ className, ...props }) => (
          <h5
            className={cn(
              'tw-my-4 tw-text-lg tw-font-semibold first:tw-mt-0 last:tw-mb-0',
              className,
            )}
            {...props}
          />
        ),
        h6: ({ className, ...props }) => (
          <h6
            className={cn('tw-my-4 tw-font-semibold first:tw-mt-0 last:tw-mb-0', className)}
            {...props}
          />
        ),
        p: ({ className, ...props }) => (
          <p
            className={cn('tw-mb-5 tw-mt-5 tw-leading-7 first:tw-mt-0 last:tw-mb-0', className)}
            {...props}
          />
        ),
        a: ({ className, ...props }) => (
          <a
            target="_blank"
            className={cn(
              'tw-text-primary tw-font-medium tw-underline tw-underline-offset-4',
              className,
            )}
            {...props}
          />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote className={cn('tw-border-l-2 tw-pl-6 tw-italic', className)} {...props} />
        ),
        ul: ({ className, ...props }) => (
          <ul className={cn('tw-my-5 tw-ml-6 tw-list-disc [&>li]:tw-mt-2', className)} {...props} />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn('tw-my-5 tw-ml-6 tw-list-decimal [&>li]:tw-mt-2', className)}
            {...props}
          />
        ),
        hr: ({ className, ...props }) => (
          <hr className={cn('tw-my-5 tw-border-b', className)} {...props} />
        ),
        table: ({ className, ...props }) => (
          <table
            className={cn(
              'tw-my-5 tw-w-full tw-border-separate tw-border-spacing-0 tw-overflow-y-auto',
              className,
            )}
            {...props}
          />
        ),
        th: ({ className, ...props }) => (
          <th
            className={cn(
              'tw-bg-muted tw-px-4 tw-py-2 tw-text-left tw-font-bold first:tw-rounded-tl-lg last:tw-rounded-tr-lg [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right',
              className,
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <td
            className={cn(
              'tw-border-b tw-border-l tw-px-4 tw-py-2 tw-text-left last:tw-border-r [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right',
              className,
            )}
            {...props}
          />
        ),
        tr: ({ className, ...props }) => (
          <tr
            className={cn(
              'tw-m-0 tw-border-b tw-p-0 first:tw-border-t [&:last-child>td:first-child]:tw-rounded-bl-lg [&:last-child>td:last-child]:tw-rounded-br-lg',
              className,
            )}
            {...props}
          />
        ),
        sup: ({ className, ...props }) => (
          <sup className={cn('[&>a]:tw-text-xs [&>a]:tw-no-underline', className)} {...props} />
        ),
        pre: ({ className, ...props }) => (
          <pre
            className={cn(
              'tw-overflow-x-auto tw-rounded-b-lg tw-bg-black tw-p-4 tw-text-white',
              className,
            )}
            {...props}
          />
        ),
        code: function Code({ className, ...props }) {
          const isCodeBlock = useIsMarkdownCodeBlock()
          return (
            <code
              className={cn(
                !isCodeBlock && 'tw-bg-aui-muted tw-rounded tw-border tw-font-semibold',
                className,
              )}
              {...props}
            />
          )
        },
        CodeHeader,
        SyntaxHighlighter,
      }}
    />
  )
}

export const MarkdownText = memo(MarkdownTextImpl)

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const onCopy = () => {
    if (!code || isCopied) return
    copyToClipboard(code)
  }

  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-rounded-t-lg tw-bg-zinc-900 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white">
      <span className="tw-lowercase [&>span]:tw-text-xs">{language}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  )
}

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: {
  copiedDuration?: number
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = (value: string) => {
    if (!value) return

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), copiedDuration)
    })
  }

  return { isCopied, copyToClipboard }
}
