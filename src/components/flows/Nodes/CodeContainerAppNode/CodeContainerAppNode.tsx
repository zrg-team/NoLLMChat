import { lazy, memo, Suspense, useCallback, useRef, useState } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  parseJSONLToFileSystemTree,
  updateFileContentOfFileSystemTree,
} from 'src/services/web-container/utils/file-tree'
import type { FileSystemTree } from '@webcontainer/api'

import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { EditorAppNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import ContainerBrowser from './components/ContainerBrowser'

const CodeEditor = lazy(() => import('./components/CodeEditor'))
const ContainerTernimal = lazy(() => import('./components/ContainerTernimal'))

export const CodeContainerAppNode = memo((props: EditorAppNodeProps) => {
  const { id, isConnectable, data } = props
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

  return (
    <div className="w-[1380px] h-[600px]">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="w-full h-full rounded-lg border bg-card overflow-hidden">
        <NodeHeader id={id} />
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <div className="flex h-full">
            <CodeEditor
              fileSystemTree={fileSystemTree}
              updateCodeContainerData={handleUpdateCodeContainerData}
              updateCodeContainerFile={handleUpdateCodeContainerFile}
            />
            <div className="w-[400px] h-full flex flex-col border">
              <ContainerTernimal fileSystemTree={fileSystemTree} />
              <ContainerBrowser iframeRef={iframeRef} />
            </div>
          </div>
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
