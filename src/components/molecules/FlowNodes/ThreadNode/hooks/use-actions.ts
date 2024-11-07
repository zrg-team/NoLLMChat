import { useCallback } from 'react'
import { useInternalNode, useReactFlow } from '@xyflow/react'
import { useCreateNewMessage } from 'src/hooks/mutations/use-create-new-message'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { toast } from 'src/lib/hooks/use-toast'

import { ThreadNodeData } from '../type'

export const useActions = (id: string, data: ThreadNodeData) => {
  const node = useInternalNode(id)
  const { getNode, updateNodeData, getHandleConnections } = useReactFlow()
  const { createMessage: createMessageFunction, loading } = useCreateNewMessage()

  const createMessage = useCallback(
    async (input: string) => {
      if (node && data.entity) {
        try {
          const threadConnections = getHandleConnections({
            type: 'target',
            nodeId: node.id,
          })
          const promptConnection = threadConnections
            .map((connection) => getNode(connection.source))
            .find((node) => node?.type === FlowNodeTypeEnum.Prompt)
          await createMessageFunction(node, data.entity, input, {
            connections: promptConnection ? [promptConnection] : undefined,
            onMessageUpdate: (id: string, content: string, finish?: boolean) => {
              updateNodeData(id, { content, loading: !finish })
            },
          })
        } catch (error) {
          toast({
            title: `${error}`,
          })
        }
      }
    },
    [getNode, createMessageFunction, data.entity, getHandleConnections, node, updateNodeData],
  )

  return { loading, createMessage }
}
