'use client'

import { Text, CheckCheck, ArrowDownWideNarrow, CornerRightDown } from 'lucide-react'
import { useState } from 'react'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { cn } from 'src/lib/utils'
import { useAutoResizeTextarea } from 'src/lib/kokonutui/use-auto-resize-textarea'

const MIN_HEIGHT = 64
const MAX_HEIGHT = 200

const ITEMS = [
  {
    text: 'Summary',
    icon: Text,
    colors: {
      icon: 'text-orange-600',
      border: 'border-orange-500',
      bg: 'bg-orange-100',
    },
  },
  {
    text: 'Fix Spelling and Grammar',
    icon: CheckCheck,
    colors: {
      icon: 'text-emerald-600',
      border: 'border-emerald-500',
      bg: 'bg-emerald-100',
    },
  },
  {
    text: 'Make shorter',
    icon: ArrowDownWideNarrow,
    colors: {
      icon: 'text-purple-600',
      border: 'border-purple-500',
      bg: 'bg-purple-100',
    },
  },
]

export default function AIInputWithTags({
  onSubmit,
  disabled,
  placeholder,
}: {
  disabled?: boolean
  placeholder?: string
  onSubmit: (input: string, selectedItem?: string[]) => Promise<boolean>
}) {
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedItem, setSelectedItem] = useState<string | undefined>('Make shorter')
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
  })

  const toggleItem = (itemText: string) => {
    setSelectedItem((prev) => (prev === itemText ? undefined : itemText))
  }

  const currentItem = selectedItem ? ITEMS.find((item) => item.text === selectedItem) : null

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const result = await onSubmit(inputValue, selectedItem ? [selectedItem] : [])
      if (result) {
        setInputValue('')
        setSelectedItem(undefined)
        adjustHeight(true)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tw-w-full tw-py-4">
      <div className="tw-relative tw-max-w-xl tw-w-full tw-mx-auto">
        <div className="tw-relative tw-border tw-border-black/10 dark:tw-border-white/10 focus-within:tw-border-black/20 dark:focus-within:tw-border-white/20 tw-rounded-2xl tw-bg-black/[0.03] dark:tw-bg-white/[0.03]">
          <div className="tw-flex tw-flex-col">
            <div className="tw-overflow-y-auto" style={{ maxHeight: `${MAX_HEIGHT - 48}px` }}>
              <Textarea
                ref={textareaRef}
                id="ai-input-03"
                disabled={disabled || loading}
                placeholder={placeholder}
                className={cn(
                  'tw-max-w-xl tw-w-full tw-rounded-2xl tw-pr-10 tw-pt-3 tw-pb-3 placeholder:tw-text-black/70 dark:placeholder:tw-text-white/70 tw-border-none focus:tw-ring tw-text-black dark:tw-text-white tw-resize-none tw-text-wrap tw-bg-transparent focus-visible:tw-ring-0 focus-visible:tw-ring-offset-0 tw-leading-[1.2]',
                  `min-h-[${MIN_HEIGHT}px]`,
                )}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  adjustHeight()
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              />
            </div>

            <div className="tw-h-12 tw-bg-transparent">
              {currentItem && (
                <div className="tw-absolute tw-left-3 tw-bottom-3 tw-z-10">
                  <button
                    type="button"
                    disabled={disabled || loading}
                    onClick={handleSubmit}
                    className={cn(
                      'tw-inline-flex tw-items-center tw-gap-1.5',
                      'tw-border tw-shadow-sm tw-rounded-md tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium',
                      'tw-animate-fadeIn hover:tw-bg-black/5 dark:hover:tw-bg-white/5 tw-transition-colors tw-duration-200',
                      currentItem.colors.bg,
                      currentItem.colors.border,
                    )}
                  >
                    <currentItem.icon className={`w-3.5 h-3.5 ${currentItem.colors.icon}`} />
                    <span className={currentItem.colors.icon}>{selectedItem}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <CornerRightDown
            className={cn(
              'tw-absolute tw-right-3 tw-top-3 tw-w-4 tw-h-4 tw-transition-all tw-duration-200 dark:tw-text-white',
              inputValue ? 'tw-opacity-100 tw-scale-100' : 'tw-opacity-30 tw-scale-95',
            )}
          />
        </div>
      </div>
      <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mt-2 tw-max-w-xl tw-mx-auto tw-justify-start tw-px-4">
        {ITEMS.filter((item) => item.text !== selectedItem).map(({ text, icon: Icon, colors }) => (
          <button
            type="button"
            key={text}
            className={cn(
              'tw-px-3 tw-py-1.5 tw-text-xs tw-font-medium tw-rounded-full',
              'tw-border tw-transition-all tw-duration-200',
              'tw-border-black/10 dark:tw-border-white/10 tw-bg-white dark:tw-bg-gray-900 hover:tw-bg-black/5 dark:hover:tw-bg-white/5',
              'tw-flex-shrink-0',
            )}
            onClick={() => toggleItem(text)}
          >
            <div className="tw-flex tw-items-center tw-gap-1.5">
              <Icon className={cn('tw-h-4 tw-w-4', colors.icon)} />
              <span className="tw-text-black/70 dark:tw-text-white/70 tw-whitespace-nowrap">
                {text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
