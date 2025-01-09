import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'
import { LLM } from 'src/services/database/types'

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
    onUpdateFileContent: (path: string, content: string) => void
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
