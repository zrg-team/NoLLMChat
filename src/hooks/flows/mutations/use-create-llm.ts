import { useCallback, useState } from 'react'
import { Node } from '@xyflow/react'
import { getRepository } from 'src/services/database/database'
import {
  FlowNodeTypeEnum,
  LLM,
  LLMModelTypeEnum,
  LLMProviderEnum,
  LLMStatusEnum,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateLLM = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)

  const pushSyncNodeQueue = useFlowState((state) => state.pushSyncNodeQueue)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createLLM = useCallback(
    async (source: Node, record: Partial<LLM>) => {
      try {
        if (!sessionId) {
          throw new Error('Session not found')
        }
        if (!record.provider || !record.name) {
          throw new Error('Provider and name are required')
        }
        setLoading(true)
        const existed = await getRepository('LLM').findOne({
          where: {
            name: record.name,
            session_id: sessionId,
          },
        })
        if (existed) {
          pushSyncNodeQueue('LLM', {
            where: {
              source_type: 'LLM',
              source_id: existed.id,
            },
          })
          return existed
        }
        return getRepository('LLM')
          .save({
            name: `${record.name}`,
            // NOTE: No need to load cloud LLM
            status: [LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(
              record.provider as LLMProviderEnum,
            )
              ? LLMStatusEnum.Started
              : LLMStatusEnum.Loaded,
            session_id: sessionId,
            provider: record.provider,
            metadata: JSON.stringify(record.metadata || {}),
            model_type: record.model_type || LLMModelTypeEnum.LLM,
            parameters: record.parameters || undefined,
            encrypted: record.encrypted || undefined,
            ...record,
          })
          .then(async (llm) => {
            await createOrUpdateFlowNode({
              source_id: llm.id,
              source_type: 'LLM',
              node_type: FlowNodeTypeEnum.LLM,
              x: source.position?.x,
              y: source.position?.y + (source.measured?.height || 0) + 30,
            })
            return llm
          })
      } finally {
        setLoading(false)
      }
    },
    [createOrUpdateFlowNode, pushSyncNodeQueue, sessionId],
  )

  return {
    loading,
    createLLM,
  }
}
