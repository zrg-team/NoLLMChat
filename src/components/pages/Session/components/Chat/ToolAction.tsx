'use client'

import { motion } from 'motion/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { MarkdownViewer } from 'src/components/molecules/MarkdownViewer'
import { Popover, PopoverContent, PopoverTrigger } from 'src/lib/shadcn/ui/popover'
import { cn } from 'src/lib/utils'

export default function ToolAction({
  tool,
  toolInput,
  result,
  inProgressMessage,
}: {
  tool: string
  toolInput: Record<string, unknown>
  result?: string
  inProgressMessage?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto mb-2"
    >
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'relative overflow-hidden border',
              'shadow-[0_1px_6px_0_rgba(139,92,246,0.06)]',
              'rounded-lg p-2',
              'cursor-pointer',
            )}
          >
            <div className="flex gap-4">
              <motion.div
                initial={{ rotate: -15, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div className={cn('p-1 rounded-xl')}>
                  {!inProgressMessage || result ? (
                    <LazyIcon name="pen-tool" className="h-5 w-5" />
                  ) : (
                    <LazyIcon name="loader" className="h-5 w-5 animate-spin" />
                  )}
                </div>
              </motion.div>

              <div className="flex-1 max-w-full overflow-x-hidden">
                <motion.h3
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn('')}
                >
                  {tool}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn('text-sm text-ellipsis mr-2')}
                >
                  {JSON.stringify(toolInput)}
                </motion.p>
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-h-72 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 w-full">
              <div className="h-5 w-5">
                <LazyIcon name="wrench" className="h-5 w-5" />
              </div>
              <div className="flex-1 break-all mt-[-4px]">{tool}</div>
            </div>
            <div className="flex flex-row gap-2 w-full">
              <div className="h-5 w-5">
                <LazyIcon name="square-function" className="h-5 w-5" />
              </div>
              <div className="flex-1 break-all mt-[-4px]">{JSON.stringify(toolInput)}</div>
            </div>
            <div className="items-center gap-4 w-full max-h-60 overflow-y-auto">
              <MarkdownViewer source={result} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}
