import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'src/lib/hooks/use-toast'
import { useInternalNode, useReactFlow, Node } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/mutations/use-create-message'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum, Thread } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'

export const useActions = (id: string) => {
  const { t } = useTranslation('flows')
  const node = useInternalNode(id)

  const updateNodes = useFlowState((state) => state.updateNodes)
  const { getNode, getHandleConnections, getNodes } = useReactFlow()
  const { createMessage, loading } = useCreateMessage()

  const travelingConversation = useCallback(
    (list: string[], result: Node[], handledIds: string[] = []) => {
      const nodes = list.map((id) => getNode(id))
      for (const node of nodes) {
        if (!node) {
          continue
        } else if (node.type === FlowNodeTypeEnum.Thread) {
          // Finding system message connected with the thread
          const threadConnections = getHandleConnections({
            type: 'target',
            nodeId: node.id,
          })
          const promptConnection = threadConnections
            .map((connection) => getNode(connection.source))
            .find((node) => node?.type === FlowNodeTypeEnum.Prompt)
          if (promptConnection) {
            handledIds.push(promptConnection.id)
            result.push(promptConnection)
          }
          const schemaConnection = threadConnections
            .map((connection) => getNode(connection.source))
            .find((node) => node?.type === FlowNodeTypeEnum.Schema)
          if (schemaConnection) {
            handledIds.push(schemaConnection.id)
            result.push(schemaConnection)
          }
          handledIds.push(node.id)
          result.push(node)
          continue
        } else if (node.type !== FlowNodeTypeEnum.Message) {
          handledIds.push(node.id)
          continue
        } else if (handledIds.includes(node.id)) {
          continue
        }

        handledIds.push(node.id)
        result.push(node)
        const connections = getHandleConnections({
          type: 'target',
          nodeId: node.id,
        })
        if (connections.length) {
          travelingConversation(
            connections.map((c) => c.source),
            result,
          )
        }
      }

      return result
    },
    [getHandleConnections, getNode],
  )

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

  const handleSubmit = useCallback(
    async (input: string) => {
      const connectionNodes = travelingConversation([id], [])
      const threadNode = connectionNodes.find((node) => node.type === FlowNodeTypeEnum.Thread)
      const thread = threadNode?.data?.entity as Thread
      if (thread && node) {
        const llmNode = getNodes().find((node) => {
          const entity = node.data?.entity as LLM
          return node.type === FlowNodeTypeEnum.LLM && entity.id === thread.initial_llm_id
        }) as Node & { data: { status: LLMStatusEnum; entity: LLM } }
        if (!llmNode) {
          return toast({
            variant: 'destructive',
            description: t('message_node.errors.llm_not_found'),
          })
        } else if (llmNode.data.status !== LLMStatusEnum.Loaded) {
          return toast({
            variant: 'destructive',
            description: t('message_node.errors.llm_not_loaded', {
              name: llmNode.data.entity.name,
            }),
          })
        }
        try {
          await createMessage(node, thread, input, {
            connectedNodes: connectionNodes,
            onMessageUpdate,
          })
        } catch (error) {
          toast({
            variant: 'destructive',
            title: `${error}`,
          })
        }
      }
    },
    [travelingConversation, id, node, getNodes, t, createMessage, onMessageUpdate],
  )

  return {
    loading,
    createMessage: handleSubmit,
  }
}
