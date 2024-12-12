import { useCallback } from 'react'
import { Connection, useReactFlow } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import type { FileSystemTree } from '@webcontainer/api'
import { parseFileSystemTreeToJSONL } from 'src/services/web-container/utils/file-tree'
import { DefaultNode } from 'src/utils/flow-node'
import { FlowNodeTypeEnum } from 'src/services/database/types'

export const useActions = () => {
  const { getNode, getHandleConnections } = useReactFlow()

  const updateCodeContainerData = useCallback(async (id: string, data: FileSystemTree) => {
    await getRepository('FlowNode').update(id, {
      raw: parseFileSystemTreeToJSONL(data),
    })
  }, [])

  const getLinkedConnections = useCallback(
    (id: string) => {
      const currentNode = getNode(id)
      if (!currentNode) {
        return []
      }
      const linkedConnections: {
        node: DefaultNode
        connections: Connection[]
        connectedNodes?: DefaultNode[]
      }[] = []
      const connections = getHandleConnections({
        nodeId: id,
        type: 'target',
      })
      connections.forEach((connection) => {
        const node = getNode(connection.source)
        if (!node || node.type !== FlowNodeTypeEnum.LLM) {
          return
        }
        linkedConnections.push({
          node: node as DefaultNode,
          connections: [connection],
        })
      })
      return linkedConnections
    },
    [getHandleConnections, getNode],
  )

  return {
    getLinkedConnections,
    updateCodeContainerData,
  }
}
