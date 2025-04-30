import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  PromptTypeEnum,
  VectorDatabase,
} from 'src/services/database/types'
import { useSessionState } from 'src/states/session'

export const useCreateVectorDatabaseRetriever = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)

  const createVectorDatabaseRetriever = useCallback(
    async ({
      vectorDatabase,
      prompt,
    }: {
      vectorDatabase?: VectorDatabase
      prompt?: Partial<Prompt>
      metadata?: Record<string, unknown>
    }) => {
      try {
        if (!vectorDatabase || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)

        const systempPrompt = await getRepository('Prompt').save({
          ...prompt,
          status: prompt?.status || MessageStatusEnum.Started,
          role: prompt?.role || MessageRoleEnum.Assistant,
          type: prompt?.type || PromptTypeEnum.Chat,
          content: prompt?.content || '{context}',
          session_id: sessionId,
        })
        if (!systempPrompt) {
          throw new Error('Failed to save prompt')
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId],
  )

  return {
    loading,
    createVectorDatabaseRetriever,
  }
}
