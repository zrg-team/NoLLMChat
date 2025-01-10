import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'
import { LLM } from 'src/services/database/types'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'

import { MainVSLiteAppProvider, MainVSLiteContextType } from './contexts/main'
import { Dock } from './components/Dock'

export const VSLiteApp = memo(
  ({
    autoLoad,
    hideAppName,
    fileSystemTree,
    llm,
    onUpdateFileContent,
    sendMessage,
  }: {
    autoLoad?: boolean
    hideAppName?: boolean
    llm?: LLM
    fileSystemTree?: FileSystemTree
    sendMessage?: MainVSLiteContextType['sendMessage']
    onUpdateFileContent: (changes: FileSystemTreeChange[]) => void
  }) => {
    return (
      <MainVSLiteAppProvider
        llm={llm}
        fileSystemTree={fileSystemTree}
        onUpdateFileContent={onUpdateFileContent}
        sendMessage={sendMessage}
      >
        <Dock autoLoad={autoLoad} hideAppName={hideAppName} />
      </MainVSLiteAppProvider>
    )
  },
)
