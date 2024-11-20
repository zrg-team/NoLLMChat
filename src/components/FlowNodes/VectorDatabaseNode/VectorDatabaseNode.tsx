import { memo, useCallback, useMemo, useState } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'

import { VectorDatabaseNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'
import { VectorSearch } from './components/VectorSearch'

export const VectorDatabaseNode = memo((props: VectorDatabaseNodeProps) => {
  const { toast } = useToast()
  const { t } = useTranslation('flows')
  const [mode, setMode] = useState('search')
  const { id, data, isConnectable } = props
  const { loading, similaritySearchWithScore } = useActions(id)

  useConnectionToHandler(id)

  const handleSimilaritySearch = useCallback(
    async (value: string, k?: number) => {
      const input = value.trim()
      const documents = await similaritySearchWithScore(input, { k })
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
    },
    [similaritySearchWithScore, t, toast],
  )

  const renderContent = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <TabsContent value="search">
            <VectorSearch loading={loading} handleSimilaritySearch={handleSimilaritySearch} />
          </TabsContent>
        )
    }
  }, [handleSimilaritySearch, loading, mode])

  return (
    <div className="tw-min-w-64">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="tw-flex tw-justify-center" variant="default">
          <LazyIcon size={24} name={'database-zap'} />
          <div className="tw-ml-2">
            <AlertTitle>{`${data.entity?.name || ''}`}</AlertTitle>
            <Tabs
              value={mode}
              onValueChange={setMode}
              defaultValue="search"
              className="tw-w-full tw-mt-4"
            >
              <TabsList className="tw-grid tw-w-full tw-grid-cols-2">
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              {renderContent}
            </Tabs>
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})