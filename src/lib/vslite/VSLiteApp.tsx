import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'
import { MainVSLiteAppProvider } from './contexts/main'
import { Dock } from './components/Dock'

export const VSLiteApp = memo(
  ({
    autoLoad,
    hideAppName,
    fileSystemTree,
    onUpdateFileContent,
  }: {
    autoLoad?: boolean
    hideAppName?: boolean
    fileSystemTree?: FileSystemTree
    onUpdateFileContent: (path: string, content: string) => void
  }) => {
    return (
      <MainVSLiteAppProvider
        fileSystemTree={fileSystemTree}
        onUpdateFileContent={onUpdateFileContent}
      >
        <Dock autoLoad={autoLoad} hideAppName={hideAppName} />
      </MainVSLiteAppProvider>
    )
  },
)
