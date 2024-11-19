'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from 'src/lib/utils'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { useAutoResizeTextarea } from './use-auto-resize-textarea'

const MIN_HEIGHT = 48
const MAX_HEIGHT = 164

export default function AIInput({
  onSubmit,
  disabled,
  enableTool,
  enableFile,
  placeholder,
}: {
  disabled?: boolean
  placeholder?: string
  enableTool?: boolean
  enableFile?: boolean
  onSubmit: (input: string, selectedItem?: string[]) => Promise<boolean>
}) {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  })
  const [showSearch, setShowSearch] = useState(true)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await onSubmit(value)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tw-w-full tw-py-4">
      <div className="tw-relative tw-max-w-xl tw-w-full tw-mx-auto">
        <div className="tw-relative tw-flex tw-flex-col">
          <div className="tw-overflow-y-auto" style={{ maxHeight: `${MAX_HEIGHT}px` }}>
            <Textarea
              id="ai-input-04"
              value={value}
              disabled={disabled || loading}
              placeholder={placeholder}
              className="tw-w-full tw-rounded-xl tw-rounded-b-none tw-px-4 tw-py-3 tw-bg-black/5 dark:tw-bg-white/5 tw-border-none dark:tw-text-white placeholder:tw-text-black/70 dark:placeholder:tw-text-white/70 tw-resize-none focus-visible:tw-ring-0 tw-leading-[1.2]"
              ref={textareaRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              onChange={(e) => {
                setValue(e.target.value)
                adjustHeight()
              }}
            />
          </div>

          <div className="tw-h-12 tw-bg-black/5 dark:tw-bg-white/5 tw-rounded-b-xl">
            <div className="tw-absolute tw-left-3 tw-bottom-3 tw-flex tw-items-center tw-gap-2">
              {enableFile ? (
                <label className="tw-cursor-pointer tw-rounded-lg tw-p-2 tw-bg-black/5 dark:tw-bg-white/5">
                  <input type="file" className="tw-hidden" />
                  <LazyIcon
                    name="paperclip"
                    className="tw-w-4 tw-h-4 tw-text-black/40 dark:tw-text-white/40 hover:tw-text-black dark:hover:tw-text-white tw-transition-colors"
                  />
                </label>
              ) : undefined}
              {enableTool ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(!showSearch)
                  }}
                  className={cn(
                    'tw-rounded-full tw-transition-all tw-flex tw-items-center tw-gap-2 tw-px-1.5 tw-py-1 tw-border tw-h-8',
                    showSearch
                      ? 'tw-bg-sky-500/15 tw-border-sky-400 tw-text-sky-500'
                      : 'tw-bg-black/5 dark:tw-bg-white/5 tw-border-transparent tw-text-black/40 dark:tw-text-white/40 hover:tw-text-black dark:hover:tw-text-white',
                  )}
                >
                  <div className="tw-w-4 tw-h-4 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                    <motion.div
                      animate={{
                        rotate: showSearch ? 180 : 0,
                        scale: showSearch ? 1.1 : 1,
                      }}
                      whileHover={{
                        rotate: showSearch ? 180 : 15,
                        scale: 1.1,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 25,
                      }}
                    >
                      <LazyIcon
                        name="globe"
                        className={cn(
                          'tw-w-4 tw-h-4',
                          showSearch ? 'tw-text-sky-500' : 'tw-text-inherit',
                        )}
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {showSearch && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: 'auto',
                          opacity: 1,
                        }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="tw-text-sm tw-overflow-hidden tw-whitespace-nowrap tw-text-sky-500 tw-flex-shrink-0"
                      >
                        Search
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ) : undefined}
            </div>
            <div className="tw-absolute tw-right-3 tw-bottom-3">
              <button
                type="button"
                disabled={disabled || loading}
                onClick={handleSubmit}
                className={cn(
                  'tw-rounded-lg tw-p-2 tw-transition-colors',
                  value
                    ? 'tw-bg-sky-500/15 tw-text-sky-500'
                    : 'tw-bg-black/5 dark:tw-bg-white/5 tw-text-black/40 dark:tw-text-white/40 hover:tw-text-black dark:hover:tw-text-white',
                )}
              >
                <LazyIcon name="send" className="tw-w-4 tw-h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
