import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  FileSystemTreeChange,
  parseJSONLToFileSystemTree,
  updateFileSystemTree,
} from 'src/services/web-container/utils/file-tree'
import CreateSourcebaseCard from 'src/components/molecules/CreateSourcebaseCard'
import type { FileSystemTree } from '@webcontainer/api'

import { EditorAppNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { Message } from 'ai/react'

const VSLiteApp = lazy(() => import('src/lib/vslite/index'))

export const VSLiteAppNode = memo((props: EditorAppNodeProps) => {
  const { id, isConnectable, data } = props
  const [fileSystemTree, setFileSystemTree] = useState(
    data?.flowNode?.raw ? parseJSONLToFileSystemTree(data.flowNode.raw) : undefined,
  )
  const { updateCodeContainerData, getLinkedConnections, sendMessage } = useActions()
  useConnectionToHandler(id)

  const handleUpdateCodeContainerData = useCallback(
    async (tree: FileSystemTree) => {
      if (!data?.flowNode?.id) return

      await updateCodeContainerData(data?.flowNode?.id, tree)
      setFileSystemTree(tree)
    },
    [data?.flowNode?.id, updateCodeContainerData],
  )

  const handleSendMessage = useCallback(
    async (message: string, messages: Message[]) => {
      if (!data?.flowNode?.id) return

      const result = await sendMessage(message, messages)
      return result
    },
    [data?.flowNode?.id, sendMessage],
  )

  const handleUpdateCodeContainerFile = useCallback(
    async (changes: FileSystemTreeChange[]) => {
      setFileSystemTree((prev) => {
        const result = updateFileSystemTree(prev || {}, changes)
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
    <div className="w-[1380px] h-[600px] rounded-lg border overflow-hidden shadow-sm">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="w-full h-full rounded-lg border bg-card overflow-hidden">
        <NodeHeader
          id={id}
          className="z-50"
          enableToStandalone
          getLinkedConnections={getLinkedConnections}
        />
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <VSLiteApp
            fileSystemTree={fileSystemTree}
            onUpdateFileContent={handleUpdateCodeContainerFile}
            sendMessage={handleSendMessage}
          />
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
