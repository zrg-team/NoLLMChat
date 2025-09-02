import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { Connection, Node, useInternalNode, useReactFlow } from '@xyflow/react'
import { useFlowChat } from 'src/hooks/flows/mutations/use-flow-chat'
import { toast } from 'src/lib/hooks/use-toast'
import { useFlowState } from 'src/states/flow'
import type { MessageNodeProps } from 'src/components/flows/Nodes/chat/MessageNode/type'
import { DefaultNodeData } from 'src/utils/flow-node'

import { ThreadNodeProps } from '../type'
import { logError } from 'src/utils/logger'
import { prepareThreadConnections } from 'src/utils/thread-conversation-traveling'

/**
 * FlowMachine-based actions for ThreadNode
 *
 * This is a NEW implementation that provides the same interface as the original use-actions.ts
 * but uses FlowMachine for execution instead of manual thread conversation traveling
 *
 */
export const useActions = (id: string, data: ThreadNodeProps['data']) => {
  const node = useInternalNode(id)
  const { t } = useTranslation('flows')
  const reactFlowInstance = useReactFlow<Node<DefaultNodeData>>()
  const updateNodes = useFlowState((state) => state.updateNodes)

  // Use FlowMachine-based message creation
  const { createMessage: createMessageFunction, loading } = useFlowChat(reactFlowInstance)
  const { getNode, getHandleConnections } = reactFlowInstance

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
        threadConnections.placeholders.forEach((item) => {
          const connectedNodes = item.connections
            .map((connection) => {
              return getNode(connection.source)
            })
            .filter(Boolean) as Node<DefaultNodeData>[]
          linkedConnections.push({
            node: item.node,
            connectedNodes: connectedNodes || [],
            connections: item.connections,
          })
        })
      }
      if (threadConnections.llm) {
        linkedConnections.push(threadConnections.llm)
      }
      return linkedConnections
    },
    [getHandleConnections, getNode],
  )

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
          await createMessageFunction(node as unknown as Node<DefaultNodeData>, input, {
            onMessageUpdate,
          })
        } catch (error) {
          logError('FlowMachine execution error:', error)

          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            return toast({
              variant: 'destructive',
              title: t('thread_node.errors.llm_not_loaded_yet'),
            })
          }
          toast({
            variant: 'destructive',
            title: `FlowMachine Error: ${error}`,
          })
        }
      }
    },
    [node, data.entity, createMessageFunction, onMessageUpdate, t],
  )

  return {
    loading,
    getLinkedConnections,
    createMessage,
  }
}
