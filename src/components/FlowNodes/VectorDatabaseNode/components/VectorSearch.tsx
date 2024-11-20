import { memo, useState } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'

export const VectorSearch = memo(
  (props: {
    loading: boolean
    handleSimilaritySearch: (input: string, k?: number) => Promise<void>
  }) => {
    const { t } = useTranslation('flows')
    const [value, setValue] = useState('')
    const [k, setK] = useState(`${1}`)
    const { loading, handleSimilaritySearch } = props

    const kRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        await handleSimilaritySearch(value, +k)
        setValue('')
      }
    }

    return (
      <div className="tw-mt-4">
        <div className="tw-bg-black/5 dark:bg-white/5 tw-rounded-xl tw-relative">
          <div className="tw-relative tw-px-2 tw-py-1 tw-pb-2">
            <Select value={`${k}`} onValueChange={(newValue) => setK(newValue)}>
              <SelectTrigger className="tw-absolute tw-left-0 !tw-w-14 tw-top-[2px] tw-rounded-xl tw-bg-transparent tw-border-none focus:tw-outline-none focus:tw-ring-0 focus:tw-border-opacity-0 focus:tw-ring-transparent">
                <SelectValue placeholder={t('vector_database_node.k_select_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {kRange.map((item) => {
                  return (
                    <SelectItem key={`${item}`} value={`${item}`}>
                      {item}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Textarea
              value={value}
              disabled={loading}
              placeholder={t('vector_database_node.similarity_search_placeholder')}
              className={cn(
                'tw-w-full tw-rounded-xl tw-px-2 tw-pl-11 tw-border-none tw-resize-none tw-bg-transparent',
                `tw-min-h-8 tw-max-h-8`,
              )}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSimilaritySearch(value, +k)}
              className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 tw-rounded-xl tw-bg-black/5 dark:tw-bg-white/5 p-1"
            >
              <LazyIcon
                name="arrow-right"
                className={cn(
                  'tw-w-4 tw-h-4 dark:tw-text-white',
                  value ? 'tw-opacity-100' : 'tw-opacity-30',
                )}
              />
            </button>
          </div>
        </div>
      </div>
    )
  },
)
