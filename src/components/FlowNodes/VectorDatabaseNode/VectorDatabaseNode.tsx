import { memo, useState } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { Separator } from 'src/lib/shadcn/ui/separator'

import { VectorDatabaseNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'

export const VectorDatabaseNode = memo((props: VectorDatabaseNodeProps) => {
  const { toast } = useToast()
  const { t } = useTranslation('flows')
  const [value, setValue] = useState('')
  const [k, setK] = useState(`${1}`)
  const { id, data, isConnectable } = props
  const { loading, similaritySearchWithScore } = useActions(id)

  useConnectionToHandler(id)

  const kRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleSimilaritySearch = async () => {
    const input = value.trim()
    setValue('')
    const documents = await similaritySearchWithScore(input, { k: parseInt(k) })
    if (!documents?.length) {
      return
    }
    toast({
      title: t('vector_database_node.similarity_search_result'),
      duration: 30000,
      description: (
        <div className="tw-w-full">
          <div className="tw-flex tw-h-5 tw-items-center tw-space-x-4 tw-text-sm tw-justify-between">
            <div className="tw-flex-1 tw-text-ellipsis tw-overflow-hidden tw-max-h-full tw-font-medium">
              {t('vector_database_node.content')}
            </div>
            <div className="tw-flex tw-h-5 tw-space-x-4 tw-w-10">
              <Separator orientation="vertical" />
              <div className="tw-font-medium">{t('vector_database_node.score')}</div>
            </div>
          </div>
          {documents.map(([document, score], index) => (
            <div
              className="tw-flex tw-h-5 tw-items-center tw-space-x-4 tw-text-sm tw-justify-between"
              key={`${index}`}
            >
              <div className="tw-flex-1 tw-text-ellipsis tw-overflow-hidden tw-max-h-full">
                {document.pageContent}
              </div>
              <div className="tw-flex tw-h-5 tw-space-x-4 tw-w-10">
                <Separator orientation="vertical" />
                <div>{score.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSimilaritySearch()
    }
  }

  return (
    <div className="tw-min-w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="tw-flex tw-justify-center" variant="default">
          <LazyIcon size={24} name={'database-zap'} />
          <div className="tw-ml-2">
            <AlertTitle>{`${data.entity?.name || ''}`}</AlertTitle>
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
                    onClick={handleSimilaritySearch}
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
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
