import { useCallback } from 'react'
import { useInternalNode } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import type { FileSystemTree } from '@webcontainer/api'
import { parseFileSystemTreeToJSONL } from 'src/services/web-container/utils/file-tree'

export const useActions = (id: string) => {
  useInternalNode(id)

  const updateCodeContainerData = useCallback(async (id: string, data: FileSystemTree) => {
    await getRepository('FlowNode').update(id, {
      raw: parseFileSystemTreeToJSONL(data),
    })
  }, [])

  return {
    updateCodeContainerData,
  }
}
