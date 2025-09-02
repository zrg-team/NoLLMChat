import { useCallback, useEffect, useState } from 'react'
import { Node, useInternalNode, useReactFlow } from '@xyflow/react'
import { FlowNodeTypeEnum, LLM, LLMProviderEnum, LLMStatusEnum } from 'src/services/database/types'
import { useCreateThread } from 'src/hooks/flows/mutations/use-create-thread'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database/database'
import { In } from 'src/services/database/typeorm-wrapper'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { logError } from 'src/utils/logger'
import { llmHandler } from 'src/handlers/llm-handler'

import { LLMNodeProps } from '../type'

export const useActions = (id: string, data: LLMNodeProps['data']) => {
  const { t } = useTranslation('flows')
  const { toast } = useToast()
  const [loadingModel, setLoadingModel] = useState(false)
  const [queringThreads, setQueringThreads] = useState(false)
  const node = useInternalNode(id) as Node<LLMNodeProps['data']>
  const { createThread, loading: creatingThread } = useCreateThread()

  const updateNodes = useFlowState((state) => state.updateNodes)
  const pushSyncNodeQueue = useFlowState((state) => state.pushSyncNodeQueue)

  const { getNodes } = useReactFlow()

  const queryThreadsFromModel = useCallback(async () => {
    try {
      setQueringThreads(true)
      if (data.entity.id) {
        const threads = await getRepository('Thread').find({
          where: {
            initial_llm_id: data.entity.id,
          },
        })
        pushSyncNodeQueue('Thread', {
          where: {
            source_type: 'Thread',
            source_id: In(threads.map((thread) => thread.id)),
          },
        })
      }
    } finally {
      setQueringThreads(false)
    }
  }, [data?.entity?.id, pushSyncNodeQueue])

  const handleLoadModel = useCallback(async () => {
    try {
      setLoadingModel(true)
      if (data.entity && node) {
        await llmHandler.loadModel(data.entity.provider, `${data.entity.name}`, {
          provider: data.entity.provider,
          callback: (initProgress) => {
            node.data.status =
              initProgress.progress === 100 ? LLMStatusEnum.Loaded : LLMStatusEnum.Loading

            node.data.label = initProgress.text
            updateNodes([{ id, type: 'replace' as const, item: node }])
          },
        })
        const llmNodeChanges = getNodes()
          .filter((node) => {
            const isLLMNode = node.type === FlowNodeTypeEnum.LLM
            if (isLLMNode) {
              const entity = node.data.entity as LLM
              return entity.provider === LLMProviderEnum.WebLLM
            }
            return false
          })
          .map((node) => {
            node.data.status = LLMStatusEnum.Started
            return { id: node.id, type: 'replace' as const, item: node }
          })
        node.data.label = ''
        node.data.status = LLMStatusEnum.Loaded
        llmNodeChanges.push({
          id,
          type: 'replace' as const,
          item: node,
        })
        updateNodes(llmNodeChanges)
        await queryThreadsFromModel()
      }
    } catch (error) {
      logError('Load Model', error)
      toast({
        variant: 'destructive',
        description: t('llm_node.errors.loading_model'),
      })
    } finally {
      setLoadingModel(false)
    }
  }, [data.entity, getNodes, id, node, queryThreadsFromModel, t, toast, updateNodes])

  const handleCreateThread = useCallback(async () => {
    if (data.entity && node) {
      await createThread?.(node)
    }
  }, [data.entity, node, createThread])

  const changeLLMOptions = useCallback(
    async (options: Record<string, unknown>) => {
      if (data.entity && node) {
        node.data.entity.options = options
        await getRepository('LLM').update(data.entity.id, { options })
        updateNodes([{ id, type: 'replace' as const, item: node }])
      }
    },
    [data.entity, id, node, updateNodes],
  )

  useEffect(() => {
    if (data.entity && node && data.entity.status !== data.status) {
      node.data.status = data.entity.status as LLMStatusEnum
      updateNodes([{ id, type: 'replace' as const, item: node }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loadingModel,
    creatingThread,
    queringThreads,
    changeLLMOptions,
    loadModel: handleLoadModel,
    createThread: handleCreateThread,
    queryThreads: queryThreadsFromModel,
  }
}
