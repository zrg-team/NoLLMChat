import { useCallback } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { useTranslation } from 'react-i18next'
import { toast } from 'src/lib/hooks/use-toast'
import { Node, useInternalNode, useReactFlow } from '@xyflow/react'
import { useCreateMessage } from 'src/hooks/flows/mutations/use-create-message'
import { useFlowState } from 'src/states/flow'

import { MessageNodeProps } from '../type'

export const useActions = (id: string) => {
  const { t } = useTranslation('flows')
  const node = useInternalNode(id)

  const updateNodes = useFlowState((state) => state.updateNodes)
  const { getNode, getHandleConnections } = useReactFlow<Node<MessageNodeProps['data']>>()
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
      if (node) {
        try {
          await createMessageFunction(node, input, {
            onMessageUpdate,
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
    [node, t, createMessageFunction, onMessageUpdate],
  )

  return {
    loading,
    createMessage,
  }
}
