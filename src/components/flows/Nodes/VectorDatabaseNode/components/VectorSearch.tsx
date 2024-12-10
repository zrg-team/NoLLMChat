import { memo, useState } from 'react'
import type { Document } from '@langchain/core/documents'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/lib/shadcn/ui/button'

const K_RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const VectorSearch = memo(
  (props: {
    loading: boolean
    onCreateRetriever?: () => Promise<void>
    onCreatePrompt?: (content: [Document, number][]) => void
    onSimilaritySearch: (input: string, k?: number) => Promise<[Document, number][] | undefined>
  }) => {
    const { t } = useTranslation('flows')
    const [value, setValue] = useState('')
    const [documents, setDocuments] = useState<[Document, number][] | undefined>([])
    const [k, setK] = useState(`${1}`)
    const { loading, onSimilaritySearch, onCreatePrompt, onCreateRetriever } = props

    const handleSeach = async () => {
      setDocuments(await onSimilaritySearch(value, +k))
      setValue('')
    }
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSeach()
      }
    }

    return (
      <div className="mt-4 max-w-full">
        <div className="bg-black/5 dark:bg-white/5 rounded-xl relative">
          <div className="relative px-2 py-1 pb-2">
            <Select value={`${k}`} onValueChange={(newValue) => setK(newValue)}>
              <SelectTrigger className="absolute left-0 !w-14 top-[2px] rounded-xl bg-transparent border-none focus:outline-none focus:ring-0 focus:border-opacity-0 focus:ring-transparent">
                <SelectValue placeholder={t('vector_database_node.k_select_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {K_RANGE.map((item) => {
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
                'w-full rounded-xl px-2 pl-11 border-none resize-none bg-transparent',
                `min-h-8 max-h-8`,
              )}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
            <button
              type="button"
              disabled={loading}
              onClick={handleSeach}
              className="absolute right-3 top-5 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 p-1"
            >
              <LazyIcon
                name={loading ? 'loader-circle' : 'arrow-right'}
                className={cn(
                  'w-4 h-4 dark:text-white',
                  value ? 'opacity-100' : 'opacity-30',
                  loading ? 'animate-spin' : '',
                )}
              />
            </button>
          </div>
        </div>
        <Accordion type="single" collapsible>
          {documents?.map(([row, score], index) => {
            return (
              <AccordionItem key={`${index}`} value={`${index}`}>
                <AccordionTrigger>
                  {`[${score.toFixed(2)}] ${row.pageContent}`.substring(0, 32)}...
                </AccordionTrigger>
                <AccordionContent>{row.pageContent}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
        <div className="w-full mt-4 flex flex-col gap-1">
          <Button disabled={loading} onClick={onCreateRetriever} className="w-full">
            {t('vector_database_node.to_retriever')}
          </Button>
          {documents?.length && onCreatePrompt ? (
            <Button disabled={loading} onClick={() => onCreatePrompt(documents)} className="w-full">
              {t('vector_database_node.create_prompt')}
            </Button>
          ) : undefined}
        </div>
      </div>
    )
  },
)
