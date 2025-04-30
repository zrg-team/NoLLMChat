import { memo, useCallback, useMemo, useState } from 'react'
import { Alert } from 'src/lib/shadcn/ui/alert'
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf'
import { Tabs, TabsContent, TabsList } from 'src/lib/shadcn/ui/tabs'
import { useModal } from '@ebay/nice-modal-react'
import CreateRetrieverDialog from 'src/components/dialogs/CreateVectorDatabaseRetrieverDialog'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useShallow } from 'zustand/react/shallow'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import ViewDataDialog from 'src/components/dialogs/ViewDataDialog'
import { useVectorDatabaseActions } from 'src/components/pages/Session/hooks/use-vector-database-actions'
import { TabsTriggerWithIcon } from 'src/components/atoms/TabsTriggerWithIcon'
import { useAppState } from 'src/states/app'

import { VectorSearch } from '../VectorSearch'
import IndexNewText from '../IndexNewText'
import IndexNewFile from '../IndexNewFile'

export const ContextVectorDatabase = memo(() => {
  const theme = useAppState(useShallow((state) => state.theme))
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState('search')
  const contextVectorDatabase = useWorkspaceState(
    useShallow((state) => state.contextVectorDatabase),
  )
  const { loading, similaritySearchWithScore, indexData } = useVectorDatabaseActions({
    vectorDatabase: contextVectorDatabase,
  })

  const createRetrieverDialog = useModal(CreateRetrieverDialog)
  const showDataDialog = useModal(ViewDataDialog)

  const handleCreateData = useCallback(
    async (...args: Parameters<typeof indexData>) => {
      await indexData(...args)
    },
    [indexData],
  )

  const handleSimilaritySearch = useCallback(
    async (value: string, k?: number) => {
      const input = value.trim()
      const documents = await similaritySearchWithScore(input, { k })
      if (!documents?.length) {
        return
      }
      return documents
    },
    [similaritySearchWithScore],
  )

  const handleCreateRetriever = useCallback(async () => {
    createRetrieverDialog.show({})
  }, [createRetrieverDialog])

  const handleOpenData = useCallback(() => {
    showDataDialog.show({
      vectorDatabase: contextVectorDatabase,
    })
  }, [contextVectorDatabase, showDataDialog])

  const handleIndexPDF = useCallback(
    async (file: File) => {
      if (file.type.includes('text') || file.type.includes('txt')) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const content = e.target?.result as string
          await handleCreateData({ content, metadata: { type: 'CONTEXT' } }, {})
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
          { documents, metadata: { type: 'CONTEXT' } },
          {
            onProgressReport: (info) => {
              setProgress((info.handled + info.handling) / info.total)
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
          <TabsContent className="w-full" value="search">
            <VectorSearch
              loading={loading}
              onSimilaritySearch={handleSimilaritySearch}
              onCreateRetriever={handleCreateRetriever}
            />
          </TabsContent>
        )
      case 'new':
        return (
          <TabsContent className="w-full" value="new">
            <IndexNewText loading={loading} onCreateData={handleCreateData} />
          </TabsContent>
        )
      case 'file':
        return (
          <TabsContent className="w-full" value="file">
            <IndexNewFile
              loading={loading}
              progress={progress}
              onFileSubmit={handleIndexPDF}
              fileOptions={{ accept: '.pdf,.txt,.text', maxSize: 15 }}
            />
          </TabsContent>
        )
    }
  }, [
    handleCreateData,
    handleCreateRetriever,
    handleIndexPDF,
    handleSimilaritySearch,
    loading,
    mode,
    progress,
  ])

  return (
    <div
      className="group relative w-full max-w-full mx-auto h-full flex border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md"
    >
      <Alert
        className="flex w-full justify-center rounded-none border-none !bg-inherit !text-current"
        variant="default"
      >
        <div className="w-full max-w-full">
          <Tabs value={mode} onValueChange={setMode} defaultValue="search" className={cn('w-full')}>
            <div className="w-full flex items-center justify-between flex-row">
              <TabsList className={cn('grid w-full grid-cols-3 border-1 p-0')}>
                <TabsTriggerWithIcon
                  name="search"
                  icon="message-circle"
                  mode={mode}
                  theme={theme}
                />
                <TabsTriggerWithIcon name="new" icon="text" mode={mode} theme={theme} />
                <TabsTriggerWithIcon name="file" icon="file" mode={mode} theme={theme} />
              </TabsList>
              <LazyIcon name="database" className="ml-3 cursor-pointer" onClick={handleOpenData} />
            </div>
            {renderContent}
          </Tabs>
        </div>
      </Alert>
    </div>
  )
})
