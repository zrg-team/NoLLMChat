import { useCallback } from 'react'
import { useInternalNode, useReactFlow } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/mutations/use-create-message'
import { toast } from 'src/lib/hooks/use-toast'

import { ThreadNodeData } from '../type'
import { useFlowState } from 'src/states/flow'
import { reactFlowTraveling } from 'src/utils/react-flow-traveling'

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
          const { nodes: connectedNodes, connections } = reactFlowTraveling([id], [], [], [], {
            getNode,
            getHandleConnections,
          })

          await createMessageFunction(node, data.entity, input, {
            onMessageUpdate,
            connectedNodes: connectedNodes,
            connections,
          })
        } catch (error) {
          toast({
            title: `${error}`,
          })
        }
      }
    },
    [node, data.entity, id, getNode, getHandleConnections, createMessageFunction, onMessageUpdate],
  )

  return { loading, createMessage }
}
