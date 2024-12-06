import { memo, useCallback, useRef, useState } from 'react'
import {
  parseJSONLToFileSystemTree,
  updateFileContentOfFileSystemTree,
} from 'src/services/web-container/utils/file-tree'
import type { FileSystemTree } from '@webcontainer/api'
import CreateSourcebaseCard from 'src/components/molecules/CreateSourcebaseCard'

import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { EditorAppNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import ContainerBrowser from './components/ContainerBrowser'
import CodeEditor from './components/CodeEditor'
import ContainerTernimal from './components/ContainerTernimal'

const CodeContainerApp = memo((props: EditorAppNodeProps) => {
  const { id, data } = props
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [fileSystemTree, setFileSystemTree] = useState(
    data?.flowNode?.raw ? parseJSONLToFileSystemTree(data.flowNode.raw) : undefined,
  )
  useConnectionToHandler(id)

  const { updateCodeContainerData } = useActions(id)

  const handleUpdateCodeContainerData = useCallback(
    async (tree: FileSystemTree) => {
      if (!data?.flowNode?.id) return

      await updateCodeContainerData(data?.flowNode?.id, tree)
      setFileSystemTree(tree)
    },
    [data?.flowNode?.id, updateCodeContainerData],
  )

  const handleUpdateCodeContainerFile = useCallback(
    async (filePath: string, code: string) => {
      setFileSystemTree((prev) => {
        if (!prev) return prev
        const result = updateFileContentOfFileSystemTree(prev, filePath, code)
        updateCodeContainerData(data?.flowNode?.id, result)
        return result
      })
    },
    [data?.flowNode?.id, updateCodeContainerData],
  )

  if (!fileSystemTree) {
    return (
      <div className="h-full flex justify-center items-center">
        <CreateSourcebaseCard className="w-64" onUpdateSourceBase={handleUpdateCodeContainerData} />
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <CodeEditor
        fileSystemTree={fileSystemTree}
        updateCodeContainerFile={handleUpdateCodeContainerFile}
      />
      <div className="w-[400px] h-full flex flex-col border">
        <ContainerBrowser iframeRef={iframeRef} />
        <ContainerTernimal fileSystemTree={fileSystemTree} />
      </div>
    </div>
  )
})

export default CodeContainerApp
