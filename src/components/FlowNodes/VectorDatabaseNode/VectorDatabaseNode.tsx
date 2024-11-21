import { memo, useCallback, useMemo, useState } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, Position, useInternalNode } from '@xyflow/react'
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf'
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
import IndexNewText from './components/IndexNewText'
import IndexNewFile from './components/IndexNewFile'

export const VectorDatabaseNode = memo((props: VectorDatabaseNodeProps) => {
  const { toast } = useToast()
  const { t } = useTranslation('flows')
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('search')
  const node = useInternalNode(props.id)
  const { id, data, isConnectable } = props
  const { loading, similaritySearchWithScore, indexData } = useActions(id)

  useConnectionToHandler(id)

  const handleCreateData = useCallback(
    async (...args: Parameters<typeof indexData>) => {
      if (node) {
        await indexData(...args)
      }
    },
    [indexData, node],
  )

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
              <div className="tw-flex tw-h-5 tw-space-x-4 tw-w-10">
                <div className="tw-font-medium">{t('vector_database_node.score')}</div>
              </div>
              <div className="tw-flex-1 tw-text-ellipsis tw-overflow-hidden tw-max-h-full tw-font-medium">
                <Separator orientation="vertical" />
                {t('vector_database_node.content')}
              </div>
            </div>
            {documents.map(([document, score], index) => (
              <div
                className="tw-flex tw-h-5 tw-items-center tw-space-x-4 tw-text-sm tw-justify-between"
                key={`${index}`}
              >
                <div className="tw-flex tw-h-5 tw-space-x-4 tw-w-10">
                  <div>{score.toFixed(2)}</div>
                </div>
                <div className="tw-flex-1 tw-text-ellipsis tw-overflow-hidden tw-max-h-full">
                  <Separator orientation="vertical" />
                  {document.pageContent}
                </div>
              </div>
            ))}
          </div>
        ),
      })
    },
    [similaritySearchWithScore, t, toast],
  )

  const handleIndexPDF = useCallback(
    async (file: File) => {
      if (file.type.endsWith('text')) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const content = e.target?.result as string
          await handleCreateData({ content })
        }
        reader.readAsText(file)
      } else if (file.type.endsWith('pdf')) {
        // File to blob
        const blob = new Blob([file], { type: 'application/pdf' })
        const customBuildLoader = new WebPDFLoader(blob, {
          // you may need to add `.then(m => m.default)` to the end of the import
          pdfjs: async () => {
            const pdfjs = await import('pdfjs-dist/legacy/build/pdf.min.mjs')
            await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs')
            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
              'pdfjs-dist/build/pdf.worker.min.js',
              import.meta.url,
            ).toString()
            return pdfjs
          },
          parsedItemSeparator: ' ',
        })
        const documents = await customBuildLoader.load()
        await handleCreateData(
          { documents },
          {
            onChunkStart: (part, all) => {
              setProgress(part.length / all.length)
            },
          },
        )
      }
    },
    [handleCreateData],
  )

  const renderContent = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <TabsContent value="search">
            <VectorSearch loading={loading} handleSimilaritySearch={handleSimilaritySearch} />
          </TabsContent>
        )
      case 'new':
        return (
          <TabsContent className="tw-min-w-80" value="new">
            <IndexNewText loading={loading} onCreateData={handleCreateData} />
          </TabsContent>
        )
      case 'file':
        return (
          <TabsContent value="file">
            <IndexNewFile
              loading={loading}
              progress={progress}
              onFileSubmit={handleIndexPDF}
              fileOptions={{ accept: '.pdf,.txt', maxSize: 5 }}
            />
          </TabsContent>
        )
    }
  }, [handleCreateData, handleIndexPDF, handleSimilaritySearch, loading, mode, progress])

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
              <TabsList className="tw-grid tw-w-full tw-grid-cols-3">
                <TabsTrigger value="search">{t('vector_database_node.search')}</TabsTrigger>
                <TabsTrigger value="new">{t('vector_database_node.text')}</TabsTrigger>
                <TabsTrigger value="file">{t('vector_database_node.file')}</TabsTrigger>
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
