import type { FileSystemTree } from '@webcontainer/api'
import { useCallback, useEffect, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  parseFileSystemTreeToJSONL,
  parseJSONLToFileSystemTree,
  updateFileContentOfFileSystemTree,
} from 'src/services/web-container/utils/file-tree'
import { useSessionState } from 'src/states/session'

export const useFileSystemTree = () => {
  const currentSession = useSessionState((state) => state.currentSession)
  const [fileSystemTree, setFileSystemTree] = useState<FileSystemTree>()

  const updateCodeContainerData = useCallback(async (id: string, data: FileSystemTree) => {
    await getRepository('FlowNode').update(id, {
      raw: parseFileSystemTreeToJSONL(data),
    })
  }, [])

  const updateCodeContainerFile = useCallback(
    async (filePath: string, code: string) => {
      if (!currentSession?.main_node_id) {
        return
      }
      setFileSystemTree((prev) => {
        if (!currentSession?.main_node_id) return prev
        const result = updateFileContentOfFileSystemTree(prev || {}, filePath, code)
        updateCodeContainerData(currentSession?.main_node_id, result)
        return result
      })
    },
    [currentSession?.main_node_id, updateCodeContainerData],
  )

  const init = useCallback(async () => {
    if (!currentSession?.main_node_id) {
      return
    }

    const mainNode = await getRepository('FlowNode').findOne({
      where: {
        id: currentSession?.main_node_id,
      },
    })
    if (!mainNode) {
      return
    }
    setFileSystemTree(mainNode.raw ? parseJSONLToFileSystemTree(mainNode.raw) : {})
  }, [currentSession?.main_node_id])

  useEffect(() => {
    if (!currentSession?.main_node_id) {
      return
    }
    init()
  }, [currentSession?.main_node_id, init])

  return {
    fileSystemTree,
    updateCodeContainerFile,
    updateCodeContainerData,
  }
}
