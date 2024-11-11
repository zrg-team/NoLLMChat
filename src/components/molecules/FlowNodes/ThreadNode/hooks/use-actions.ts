import { useCallback } from 'react'
import { Node, useInternalNode, useReactFlow } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/mutations/use-create-message'
import { toast } from 'src/lib/hooks/use-toast'

import { ThreadNodeData } from '../type'
import { useFlowState } from 'src/states/flow'

export const useActions = (id: string, data: ThreadNodeData) => {
  const node = useInternalNode(id)
  const { getNode, getHandleConnections } = useReactFlow()
  const updateNodes = useFlowState((state) => state.updateNodes)
  const { createMessage: createMessageFunction, loading } = useCreateMessage()

  const onMessageUpdate = useCallback(
    (info: { id?: string; content: string; finish?: boolean }) => {
      if (!info.content || !info.id) {
        return
      }
      const item = getNode(info.id)
      if (!item) {
        return
      }
      updateNodes([
        {
          id: info.id,
          type: 'replace',
          item: { ...item, data: { ...item.data, content: info.content, loading: !info.finish } },
        },
      ])
    },
    [getNode, updateNodes],
  )
  const createMessage = useCallback(
    async (input: string) => {
      if (node && data.entity) {
        try {
          const threadConnections = getHandleConnections({
            type: 'target',
            nodeId: node.id,
          })
          const connectedNodes = threadConnections.map((connection) =>
            getNode(connection.source),
          ) as Node[]

          await createMessageFunction(node, data.entity, input, {
            onMessageUpdate,
            connectedNodes: connectedNodes,
          })
        } catch (error) {
          toast({
            title: `${error}`,
          })
        }
      }
    },
    [node, data.entity, getHandleConnections, createMessageFunction, onMessageUpdate, getNode],
  )

  return { loading, createMessage }
}
