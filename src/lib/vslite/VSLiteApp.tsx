import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'
import { MainVSLiteAppProvider } from './contexts/main'
import { Dock } from './components/Dock'

export const VSLiteApp = memo(
  ({
    fileSystemTree,
    onUpdateFileContent,
  }: {
    fileSystemTree?: FileSystemTree
    onUpdateFileContent: (path: string, content: string) => void
  }) => {
    return (
      <MainVSLiteAppProvider
        fileSystemTree={fileSystemTree}
        onUpdateFileContent={onUpdateFileContent}
      >
        <Dock />
      </MainVSLiteAppProvider>
    )
  },
)
