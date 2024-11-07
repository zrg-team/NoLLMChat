import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'src/lib/hooks/use-toast'
import { useInternalNode, useReactFlow, Node } from '@xyflow/react'
import { useCreateNewMessage } from 'src/hooks/mutations/use-create-new-message'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum, Thread } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'

export const useActions = (id: string) => {
  const { t } = useTranslation('flows')
  const node = useInternalNode(id)

  const updateNodes = useFlowState((state) => state.updateNodes)
  const { getNode, getHandleConnections, getNodes } = useReactFlow()
  const { createMessage, loading } = useCreateNewMessage()

  const travelingConversation = useCallback(
    (
      list: string[],
      result: { messageNodes: Node[]; threadNode?: Node; threadPromptNode?: Node },
      handledIds: string[] = [],
    ) => {
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
            result.threadPromptNode = promptConnection
          }
          handledIds.push(node.id)
          result.threadNode = node
          continue
        } else if (node.type !== FlowNodeTypeEnum.Message) {
          handledIds.push(node.id)
          continue
        } else if (handledIds.includes(node.id)) {
          continue
        }

        handledIds.push(node.id)
        result.messageNodes.push(node)
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
    [id, node?.data?.entity, updateNodes],
  )

  const handleSubmit = useCallback(
    async (input: string) => {
      const nodeDatas: { messageNodes: Node[]; threadNode?: Node; threadPromptNode?: Node } = {
        messageNodes: [],
        threadNode: undefined,
        threadPromptNode: undefined,
      }
      travelingConversation([id], nodeDatas)
      const thread = nodeDatas.threadNode?.data?.entity as Thread
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
          const history = nodeDatas.messageNodes
            .filter((node) => node.type === FlowNodeTypeEnum.Message)
            .reverse()

          if (nodeDatas.threadPromptNode) {
            history.unshift(nodeDatas.threadPromptNode)
          }
          await createMessage(node, thread, input, {
            connectedNodes: history,
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
