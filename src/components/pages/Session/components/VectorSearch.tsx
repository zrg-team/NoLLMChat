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
const DISABLED_RETRIEVER = true
export const VectorSearch = memo(
  (props: {
    loading: boolean
    onCreateRetriever?: () => Promise<void>
    onSimilaritySearch: (input: string, k?: number) => Promise<[Document, number][] | undefined>
  }) => {
    const { t } = useTranslation('molecules')
    const [value, setValue] = useState('')
    const [documents, setDocuments] = useState<[Document, number][] | undefined>([])
    const [k, setK] = useState(`${1}`)
    const { loading, onSimilaritySearch, onCreateRetriever } = props

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
        <div className="rounded-xl relative">
          <div className="relative px-2 py-1 pb-2">
            <Textarea
              value={value}
              disabled={loading}
              placeholder={t('vector_database_node.similarity_search_placeholder')}
              className={cn('w-full rounded-xl px-4 resize-none h-9 border !text-foreground')}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
            <div className="w-full absolute bottom-4 justify-end flex items-center">
              <Select value={`${k}`} onValueChange={(newValue) => setK(newValue)}>
                <SelectTrigger
                  className={cn(
                    'rounded-xl border-none focus:outline-none focus:ring-0 focus:border-opacity-0 focus:ring-transparent w-14',
                    'text-black/80',
                  )}
                >
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
              <button
                type="button"
                disabled={loading}
                onClick={handleSeach}
                className="rounded-x p-1 w-14"
              >
                <LazyIcon
                  name={loading ? 'loader-circle' : 'arrow-right'}
                  className={cn(
                    'w-5 h-5',
                    value ? 'opacity-100' : 'opacity-30',
                    loading ? 'animate-spin' : '',
                    'text-black/80',
                  )}
                />
              </button>
            </div>
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
          {onCreateRetriever && !DISABLED_RETRIEVER ? (
            <Button disabled={loading} onClick={onCreateRetriever} className="w-full">
              {t('vector_database_node.to_retriever')}
            </Button>
          ) : undefined}
        </div>
      </div>
    )
  },
)
