import { memo } from 'react'
import type { FileSystemTree } from '@webcontainer/api'

import { MainVSLiteAppProvider, MainVSLiteAppProviderType } from './contexts/main'
import { Dock } from './components/Dock'

export const VSLiteApp = memo(
  ({
    autoLoad,
    initState,
    hideAppName,
    fileSystemTree,
    onUpdateFileContent,
    renderCustomPanel,
    setState,
  }: {
    autoLoad?: boolean
    hideAppName?: boolean
    fileSystemTree?: FileSystemTree
    onUpdateFileContent: MainVSLiteAppProviderType['onUpdateFileContent']
    renderCustomPanel?: MainVSLiteAppProviderType['renderCustomPanel']
    initState?: MainVSLiteAppProviderType['initState']
    setState?: MainVSLiteAppProviderType['setState']
  }) => {
    return (
      <MainVSLiteAppProvider
        fileSystemTree={fileSystemTree}
        renderCustomPanel={renderCustomPanel}
        onUpdateFileContent={onUpdateFileContent}
        setState={setState}
        initState={initState}
      >
        <Dock autoLoad={autoLoad} hideAppName={hideAppName} />
      </MainVSLiteAppProvider>
    )
  },
)
