import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { LLM, LLMModelTypeEnum, LLMProviderEnum, LLMStatusEnum } from 'src/services/database/types'
import { useSessionState } from 'src/states/session'

export const useCreateLLM = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)

  const createLLM = useCallback(
    async (record: Partial<LLM>) => {
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
            return llm
          })
      } finally {
        setLoading(false)
      }
    },
    [sessionId],
  )

  return {
    loading,
    createLLM,
  }
}
