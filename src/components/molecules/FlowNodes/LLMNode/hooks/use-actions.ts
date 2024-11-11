import { useCallback, useState } from 'react'
import { Node, useInternalNode, useReactFlow } from '@xyflow/react'
import { FlowNodeTypeEnum, LLMStatusEnum } from 'src/services/database/types'
import { useCreateThread } from 'src/hooks/mutations/use-create-thread'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database'
import { In } from 'src/services/database/typeorm-wrapper'

import { LLMNodeData } from '../type'
import { useLocalLLMState } from 'src/services/local-llm/state'

export const useActions = (id: string, data: LLMNodeData) => {
  const [loadingModel, setLoadingModel] = useState(false)
  const [queringThreads, setQueringThreads] = useState(false)
  const node = useInternalNode(id)
  const loadModel = useLocalLLMState((state) => state.loadModel)
  const { createThread, loading: creatingThread } = useCreateThread()

  const updateNodes = useFlowState((state) => state.updateNodes)
  const pushSyncNodeQueue = useFlowState((state) => state.pushSyncNodeQueue)

  const { getNode, getNodes, getHandleConnections } = useReactFlow()

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
        await loadModel?.(`${data.entity.name}`)
        const llmNodeChanges = getNodes()
          .filter((node) => node.type === FlowNodeTypeEnum.LLM)
          .map((node) => {
            node.data.status = LLMStatusEnum.Started
            return { id: node.id, type: 'replace' as const, item: node }
          })
        node.data.status = LLMStatusEnum.Loading
        llmNodeChanges.push({
          id,
          type: 'replace' as const,
          item: node,
        })
        updateNodes(llmNodeChanges)
        await queryThreadsFromModel()
      }
    } finally {
      setLoadingModel(false)
    }
  }, [data.entity, getNodes, id, loadModel, node, queryThreadsFromModel, updateNodes])

  const handleCreateThread = useCallback(async () => {
    if (data.entity && node) {
      const connections = getHandleConnections({
        type: 'target',
        nodeId: node.id,
      })
        .map((connection) => getNode(connection.source))
        .filter(Boolean)
      await createThread?.(node, {
        connectedNodes: connections as unknown as Node[],
      })
    }
  }, [data.entity, node, getHandleConnections, createThread, getNode])

  return {
    loadingModel,
    creatingThread,
    queringThreads,
    loadModel: handleLoadModel,
    createThread: handleCreateThread,
    queryThreads: queryThreadsFromModel,
  }
}
