import { useCallback } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useTranslation } from 'react-i18next'
import { toast } from 'src/lib/hooks/use-toast'
import { Node, useInternalNode, useReactFlow, ReactFlowInstance, Edge } from '@xyflow/react'
import { useFlowChat } from 'src/hooks/flows/mutations/use-flow-chat'
import { useFlowState } from 'src/states/flow'
import { FlowMachine } from 'src/services/flow-machine/flow-machine'
import { FlowDataService } from 'src/services/flow-machine/flow-data-service'
import { PromptNodeHandler } from 'src/components/flows/Nodes/llm/PromptNode/handler'
import { DefaultNodeData } from 'src/utils/flow-node'
import { BaseMessage } from '@langchain/core/messages'
import { FlowNodeTypeEnum } from 'src/services/database/types'

import { MessageNodeHandler } from '../handler'
import { MessageNodeProps } from '../type'

export const useActions = (id: string) => {
  const { t } = useTranslation('flows')
  const node = useInternalNode(id)

  const updateNodes = useFlowState((state) => state.updateNodes)
  const reactFlowInstance = useReactFlow<Node<MessageNodeProps['data']>>()
  const { createMessage: createMessageFunction, loading } = useFlowChat(
    reactFlowInstance as unknown as ReactFlowInstance<Node<DefaultNodeData>, Edge>,
  )
  const { getNode, getNodes, getHandleConnections } = reactFlowInstance

  /**
   * Find the origin thread node by traversing backwards from current message node
   * Example: message id 2 -> find target to 2 -> if message 1 -> find target to 1 -> thread
   */
  const findOriginThread = useCallback(
    (currentNodeId: string): Node | null => {
      const nodes = getNodes()

      let currentId = currentNodeId
      const visited = new Set<string>()

      while (currentId && !visited.has(currentId)) {
        visited.add(currentId)

        const currentNode = nodes.find((n) => n.id === currentId)
        if (!currentNode) break

        // If we found a thread node, return it
        if (currentNode.type === FlowNodeTypeEnum.Thread) {
          return currentNode
        }

        // Get incoming connections using getHandleConnections
        const incomingConnections = getHandleConnections({
          type: 'target',
          nodeId: currentId,
        })

        if (incomingConnections.length === 0) break

        // Move to the source of the first incoming connection
        currentId = incomingConnections[0].source
      }

      return null
    },
    [getNodes, getHandleConnections],
  )

  /**
   * Collect conversation history using FlowMachine from current node
   */
  const collectConversationHistory = useCallback(
    async (currentNodeId: string): Promise<BaseMessage[]> => {
      try {
        // Initialize FlowMachine for collecting messages
        const flowDataService = FlowDataService.forSession(
          reactFlowInstance as unknown as ReactFlowInstance,
        )
        const flowMachine = new FlowMachine(flowDataService)

        // Register handlers
        flowMachine.registerNodeHandler(new MessageNodeHandler())
        flowMachine.registerNodeHandler(new PromptNodeHandler())

        // Prepare the flow machine starting from current node to collect messages
        await flowMachine.prepare(currentNodeId, {})

        // Get collected messages from the flow machine state
        const messages = (flowMachine.getSessionState('messages') as BaseMessage[]) || []

        return messages
      } catch (error) {
        console.error('Failed to collect conversation history:', error)
        return []
      }
    },
    [reactFlowInstance],
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
      if (node) {
        try {
          // Find the origin thread node by traversing backwards from current message node
          const threadNode = findOriginThread(node.id)
          if (!threadNode) {
            return toast({
              variant: 'destructive',
              title: t('message_node.errors.thread_not_found'),
            })
          }

          // Collect conversation history using FlowMachine from current node
          const messages = await collectConversationHistory(node.id)

          // Call createMessageFunction with thread node and messages as initial state
          await createMessageFunction(threadNode as unknown as Node<DefaultNodeData>, input, {
            onMessageUpdate,
            sourceId: node.id,
            // Pass messages as initial state for the flow machine
            initialState: { messages },
            initialX: node.position?.x,
            initialY: node.position?.y + (node.measured?.height || 0) + 10,
          })
        } catch (error) {
          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            return toast({
              variant: 'destructive',
              title: t('message_node.errors.llm_not_loaded_yet'),
            })
          }
          toast({
            variant: 'destructive',
            title: t('message_node.errors.create_message'),
          })
        }
      }
    },
    [node, t, createMessageFunction, onMessageUpdate, findOriginThread, collectConversationHistory],
  )

  return {
    loading,
    createMessage,
  }
}
