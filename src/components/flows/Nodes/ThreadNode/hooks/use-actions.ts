import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { Node, Connection, useInternalNode, useReactFlow } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/flows/mutations/use-create-message'
import { toast } from 'src/lib/hooks/use-toast'
import { useFlowState } from 'src/states/flow'
import { MessageNodeProps } from 'src/components/flows/Nodes/MessageNode/type'
import { prepareThreadConnections } from 'src/utils/thread-conversation-traveling'

import { ThreadNodeProps } from '../type'
import { DefaultNodeData } from 'src/utils/flow-node'

export const useActions = (id: string, data: ThreadNodeProps['data']) => {
  const node = useInternalNode(id)
  const { t } = useTranslation('flows')
  const { getNode, getHandleConnections } = useReactFlow<Node<DefaultNodeData>>()
  const updateNodes = useFlowState((state) => state.updateNodes)
  const { createMessage: createMessageFunction, loading } = useCreateMessage({
    getNode,
    getHandleConnections,
  })

  const onMessageUpdate = useCallback(
    (info: { id?: string; nodeData: Partial<MessageNodeProps['data']> }) => {
      if (!info.id) {
        return
      }
      const item = getNode(info.id)
      if (!item || !info.nodeData) {
        return
      }
      updateNodes([
        {
          id: item.id,
          type: 'replace',
          item: {
            ...item,
            data: {
              ...item.data,
              ...omitBy(info.nodeData, isUndefined),
            },
          },
        },
      ])
    },
    [getNode, updateNodes],
  )
  const createMessage = useCallback(
    async (input: string) => {
      if (node && data.entity) {
        try {
          await createMessageFunction(node, input, {
            onMessageUpdate,
          })
        } catch (error) {
          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            return toast({
              variant: 'destructive',
              title: t('thread_node.errors.llm_not_loaded_yet'),
            })
          }
          toast({
            variant: 'destructive',
            title: `${error}`,
          })
        }
      }
    },
    [node, data.entity, createMessageFunction, onMessageUpdate, t],
  )

  const getLinkedConnections = useCallback(
    (id: string) => {
      const currentNode = getNode(id)
      if (!currentNode) {
        return []
      }
      const linkedConnections: {
        node: Node<DefaultNodeData>
        connections: Connection[]
        connectedNodes?: Node<DefaultNodeData>[]
      }[] = []
      const threadConnections = prepareThreadConnections(currentNode as Node<DefaultNodeData>, {
        getNode,
        getHandleConnections,
      })
      if (threadConnections.thread) {
        linkedConnections.push({
          node: threadConnections.thread.node as Node<DefaultNodeData>,
          connectedNodes: [],
          connections: threadConnections.thread.connections,
        })
      }
      if (threadConnections.prompts) {
        linkedConnections.push(
          ...threadConnections.prompts.map((item) => {
            return {
              node: item.node,
              connectedNodes: item.connectedNodes,
              connections: item.connections,
            }
          }),
        )
      }
      if (threadConnections.schemas) {
        linkedConnections.push(
          ...threadConnections.schemas.map((item) => {
            return {
              node: item.node,
              connectedNodes: [],
              connections: item.connections,
            }
          }),
        )
      }
      if (threadConnections.placeholders) {
        linkedConnections.push(
          ...threadConnections.placeholders.map((item) => {
            return {
              node: item.node,
              connectedNodes: [],
              connections: item.connections,
            }
          }),
        )
      }
      if (threadConnections.llm) {
        linkedConnections.push(threadConnections.llm)
      }
      return linkedConnections
    },
    [getHandleConnections, getNode],
  )

  return { loading, createMessage, getLinkedConnections }
}
