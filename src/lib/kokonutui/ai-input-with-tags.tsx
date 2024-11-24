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
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto">
        <div className="relative border border-black/10 dark:border-white/10 focus-within:border-black/20 dark:focus-within:border-white/20 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]">
          <div className="flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: `${MAX_HEIGHT - 48}px` }}>
              <Textarea
                ref={textareaRef}
                id="ai-input-03"
                disabled={disabled || loading}
                placeholder={placeholder}
                className={cn(
                  'max-w-xl w-full rounded-2xl pr-10 pt-3 pb-3 placeholder:text-black/70 dark:placeholder:text-white/70 border-none focus:ring text-black dark:text-white resize-none text-wrap bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 leading-[1.2]',
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

            <div className="h-12 bg-transparent">
              {currentItem && (
                <div className="absolute left-3 bottom-3 z-10">
                  <button
                    type="button"
                    disabled={disabled || loading}
                    onClick={handleSubmit}
                    className={cn(
                      'inline-flex items-center gap-1.5',
                      'border shadow-sm rounded-md px-2 py-0.5 text-xs font-medium',
                      'animate-fadeIn hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200',
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
              'absolute right-3 top-3 w-4 h-4 transition-all duration-200 dark:text-white',
              inputValue ? 'opacity-100 scale-100' : 'opacity-30 scale-95',
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2 max-w-xl mx-auto justify-start px-4">
        {ITEMS.filter((item) => item.text !== selectedItem).map(({ text, icon: Icon, colors }) => (
          <button
            type="button"
            key={text}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-full',
              'border transition-all duration-200',
              'border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 hover:bg-black/5 dark:hover:bg-white/5',
              'flex-shrink-0',
            )}
            onClick={() => toggleItem(text)}
          >
            <div className="flex items-center gap-1.5">
              <Icon className={cn('h-4 w-4', colors.icon)} />
              <span className="text-black/70 dark:text-white/70 whitespace-nowrap">{text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
