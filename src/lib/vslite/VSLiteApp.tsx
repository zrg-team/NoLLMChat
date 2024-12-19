import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'
import { LLM } from 'src/services/database/types'

import { MainVSLiteAppProvider } from './contexts/main'
import { Dock } from './components/Dock'

export const VSLiteApp = memo(
  ({
    autoLoad,
    hideAppName,
    fileSystemTree,
    llm,
    onUpdateFileContent,
  }: {
    autoLoad?: boolean
    hideAppName?: boolean
    llm?: LLM
    fileSystemTree?: FileSystemTree
    onUpdateFileContent: (path: string, content: string) => void
  }) => {
    return (
      <MainVSLiteAppProvider
        llm={llm}
        fileSystemTree={fileSystemTree}
        onUpdateFileContent={onUpdateFileContent}
      >
        <Dock autoLoad={autoLoad} hideAppName={hideAppName} />
      </MainVSLiteAppProvider>
    )
  },
)
