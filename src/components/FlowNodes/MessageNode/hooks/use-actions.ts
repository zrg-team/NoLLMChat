import { useCallback } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useTranslation } from 'react-i18next'
import { toast } from 'src/lib/hooks/use-toast'
import { useInternalNode, useReactFlow, Node } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/mutations/use-create-message'
import { FlowNodeTypeEnum, LLM, LLMStatusEnum, Thread } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { threadNodesTraveling } from 'src/utils/thread-nodes-traveling'

import { MessageNodeData } from '../type'

export const useActions = (id: string) => {
  const { t } = useTranslation('flows')
  const node = useInternalNode(id)

  const updateNodes = useFlowState((state) => state.updateNodes)
  const { getNode, getHandleConnections, getNodes } = useReactFlow()
  const { createMessage, loading } = useCreateMessage()

  const onMessageUpdate = useCallback(
    (info: { id?: string; nodeData: Partial<MessageNodeData> }) => {
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

  const handleSubmit = useCallback(
    async (input: string) => {
      const { nodes: connectedNodes, connections } = threadNodesTraveling([id], [], [], [], {
        getNode,
        getHandleConnections,
      })
      const threadNode = connectedNodes.find((node) => node.type === FlowNodeTypeEnum.Thread)
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
            connectedNodes,
            connections,
            onMessageUpdate,
          })
        } catch (error) {
          console.warn(error)
          toast({
            variant: 'destructive',
            title: t('message_node.errors.create_message'),
          })
        }
      }
    },
    [id, getNode, getHandleConnections, node, getNodes, t, createMessage, onMessageUpdate],
  )

  return {
    loading,
    createMessage: handleSubmit,
  }
}
