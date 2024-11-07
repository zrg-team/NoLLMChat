import { useCallback, useContext, useState } from 'react'
import { useInternalNode, useReactFlow } from '@xyflow/react'
import { FlowNodeTypeEnum, LLMStatusEnum } from 'src/services/database/types'
import { LocalLLMContext } from 'src/services/llm/provider'
import { useCreateNewThread } from 'src/hooks/mutations/use-create-new-thread'
import { LLMNodeData } from '../type'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database'
import { In } from 'src/services/database/typeorm-wrapper'

export const useActions = (id: string, data: LLMNodeData) => {
  const [loadingModel, setLoadingModel] = useState(false)
  const [queringThreads, setQueringThreads] = useState(false)
  const node = useInternalNode(id)
  const { loadModel } = useContext(LocalLLMContext)
  const { createThread, loading: creatingThread } = useCreateNewThread()

  const pushSyncNodeQueue = useFlowState((state) => state.pushSyncNodeQueue)

  const { updateNodeData, getNodes } = useReactFlow()

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
      if (data.entity?.name) {
        await loadModel?.(`${data.entity.name}`)
        const llmNodes = getNodes().filter((node) => node.type === FlowNodeTypeEnum.LLM)
        llmNodes.forEach(async (node) => {
          updateNodeData(node.id, { status: LLMStatusEnum.Started })
        })
        await updateNodeData(id, { status: LLMStatusEnum.Loaded })
        await queryThreadsFromModel()
      }
    } finally {
      setLoadingModel(false)
    }
  }, [data.entity?.name, getNodes, id, loadModel, queryThreadsFromModel, updateNodeData])

  const handleCreateThread = useCallback(async () => {
    if (data.entity?.name && node) {
      await createThread?.(node, `${data.entity.name}`)
    }
  }, [createThread, data.entity.name, node])

  return {
    loadingModel,
    creatingThread,
    queringThreads,
    loadModel: handleLoadModel,
    createThread: handleCreateThread,
    queryThreads: queryThreadsFromModel,
  }
}
