import { useCallback, useMemo, useState } from 'react'
import { create, useModal } from '@ebay/nice-modal-react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import { VectorDatabaseStorageEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/lib/shadcn/ui/dialog'

import { useChatApplicationData } from '../../hooks/use-chat-application-data'
import { VectorSearch } from 'src/components/flows/Nodes/VectorDatabaseNode/components/VectorSearch'
import IndexNewText from 'src/components/flows/Nodes/VectorDatabaseNode/components/IndexNewText'
import IndexNewFile from 'src/components/flows/Nodes/VectorDatabaseNode/components/IndexNewFile'
import { DataViewer } from 'src/components/molecules/Nodes/DataViewer'
import { decodeLine } from 'src/utils/string-data'
import { useActions } from './use-actions'

type VectorDatabaseDialogProps = {
  retriverInfo: ReturnType<typeof useChatApplicationData>['retriverInfo'][number]
}

const VectorDatabaseDialog = create<VectorDatabaseDialogProps>(({ retriverInfo }) => {
  const { t } = useTranslation('applications')
  const { loading, similaritySearchWithScore, indexData } = useActions()

  const [mode, setMode] = useState('search')
  const [progress, setProgress] = useState(0)
  console.log('retriverInfo', retriverInfo)
  const currentModal = useModal()

  const vectorDatabaseData = useMemo(() => {
    if (!retriverInfo?.vectorDatabaseEntity?.raw) {
      return {
        headers: [],
        rows: [],
      }
    }

    const headers = ['content', 'embedding', 'metadata']
    const lines = decodeLine(retriverInfo?.vectorDatabaseEntity?.raw)
    return {
      headers,
      rows: lines.map((row) => {
        try {
          const data = JSON.parse(row)
          return data
        } catch {
          return []
        }
      }),
    }
  }, [retriverInfo?.vectorDatabaseEntity?.raw])

  const handleCreateData = useCallback(
    async (...args: Parameters<typeof indexData>) => {
      const [data, options] = args
      await indexData(data, {
        ...options,
        vectorDatabase: retriverInfo.vectorDatabaseEntity,
      })
    },
    [indexData, retriverInfo.vectorDatabaseEntity],
  )

  const handleSimilaritySearch = useCallback(
    async (value: string, k?: number) => {
      const input = value.trim()
      const documents = await similaritySearchWithScore(input, {
        k,
        vectorDatabase: retriverInfo.vectorDatabaseEntity,
      })
      if (!documents?.length) {
        return
      }
      return documents
    },
    [retriverInfo.vectorDatabaseEntity, similaritySearchWithScore],
  )

  const handleIndexPDF = useCallback(
    async (file: File) => {
      if (file.type.includes('text') || file.type.includes('txt')) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const content = e.target?.result as string
          await handleCreateData(
            { content },
            {
              vectorDatabase: retriverInfo.vectorDatabaseEntity,
            },
          )
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
            vectorDatabase: retriverInfo.vectorDatabaseEntity,
            onProgressReport: (info) => {
              setProgress((info.handled + info.handling) / info.total)
            },
          },
        )
      }
    },
    [handleCreateData, retriverInfo.vectorDatabaseEntity],
  )

  const renderContent = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <TabsContent value="search">
            <VectorSearch loading={loading} onSimilaritySearch={handleSimilaritySearch} />
          </TabsContent>
        )
      case 'new':
        return (
          <TabsContent className="min-w-80" value="new">
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
              fileOptions={{ accept: '.pdf,.txt,.text', maxSize: 1 }}
            />
          </TabsContent>
        )
      case 'view': {
        return (
          <TabsContent value="view" className="max-h-full overflow-auto">
            <DataViewer
              data={vectorDatabaseData.rows}
              headers={vectorDatabaseData.headers}
              limitLengthByColumns={{
                embedding: 32,
              }}
            />
          </TabsContent>
        )
      }
    }
  }, [
    handleCreateData,
    handleIndexPDF,
    handleSimilaritySearch,
    loading,
    mode,
    progress,
    vectorDatabaseData,
  ])

  return (
    <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex">
            <LazyIcon name="file" className="mr-2 h-4 w-4" />
            <DialogTitle>{t('chat.vector_database')}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="mx-auto w-full min-h-96 max-h-full overflow-hidden">
          <div className="w-full h-full">
            <Tabs
              value={mode}
              onValueChange={setMode}
              defaultValue="search"
              className={cn('w-full h-full mt-4')}
            >
              <TabsList
                className={cn(
                  'grid w-full grid-cols-3',
                  retriverInfo?.vectorDatabaseEntity?.storage ===
                    VectorDatabaseStorageEnum.DatabaseNode
                    ? 'grid-cols-4'
                    : 'grid-cols-3',
                )}
              >
                <TabsTrigger value="search">{t('chat.search')}</TabsTrigger>
                <TabsTrigger value="new">{t('chat.text')}</TabsTrigger>
                <TabsTrigger value="file">{t('chat.file')}</TabsTrigger>
                {retriverInfo?.vectorDatabaseEntity?.storage ===
                VectorDatabaseStorageEnum.DatabaseNode ? (
                  <TabsTrigger value="view">{t('chat.view')}</TabsTrigger>
                ) : undefined}
              </TabsList>
              {renderContent}
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default VectorDatabaseDialog
