import { useModal } from '@ebay/nice-modal-react'
import { useCallback, useMemo, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import LazyIcon from 'src/components/atoms/LazyIcon'
import ViewDataDialog from 'src/components/dialogs/ViewDataDialog'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import { Alert } from 'src/lib/shadcn/ui/alert'
import { Tabs, TabsContent, TabsList } from 'src/lib/shadcn/ui/tabs'
import { useVectorDatabaseActions } from 'src/components/pages/Session/hooks/use-vector-database-actions'
import { cn } from 'src/lib/utils'
import { TabsTriggerWithIcon } from 'src/components/atoms/TabsTriggerWithIcon'
import { useAppState } from 'src/states/app'

import { VectorSearch } from '../VectorSearch'

export const CodeVectorDatabase = () => {
  const theme = useAppState(useShallow((state) => state.theme))
  const showDataDialog = useModal(ViewDataDialog)
  const [mode, setMode] = useState('search')
  const codeVectorDatabase = useWorkspaceState(useShallow((state) => state.codeVectorDatabase))
  const { loading, similaritySearchWithScore } = useVectorDatabaseActions({
    vectorDatabase: codeVectorDatabase,
  })

  const handleOpenData = useCallback(() => {
    showDataDialog.show({
      vectorDatabase: codeVectorDatabase,
    })
  }, [codeVectorDatabase, showDataDialog])

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

  const renderContent = useMemo(() => {
    switch (mode) {
      case 'search':
        return (
          <TabsContent className="w-full" value="search">
            <VectorSearch loading={loading} onSimilaritySearch={handleSimilaritySearch} />
          </TabsContent>
        )
    }
  }, [handleSimilaritySearch, loading, mode])

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
              <TabsList className={cn('grid w-full grid-cols-1 border-1 p-0')}>
                <TabsTriggerWithIcon
                  name="search"
                  icon="message-circle"
                  mode={mode}
                  theme={theme}
                />
              </TabsList>
              <LazyIcon name="database" className="ml-3 cursor-pointer" onClick={handleOpenData} />
            </div>
            {renderContent}
          </Tabs>
        </div>
      </Alert>
    </div>
  )
}
