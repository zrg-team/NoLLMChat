import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  MessageRoleEnum,
  MessageStatusEnum,
  Prompt,
  PromptTypeEnum,
} from 'src/services/database/types'
import { useSessionState } from 'src/states/session'

export const useCreatePrompt = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)

  const createPrompt = useCallback(
    async (options: Omit<Prompt, 'id' | 'created_at' | 'updated_at' | 'status' | 'session_id'>) => {
      try {
        if (!sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)

        const prompt = await getRepository('Prompt').save({
          content: options.content,
          prefix: options.prefix,
          role: options.role || MessageRoleEnum.System,
          status: MessageStatusEnum.Started,
          session_id: sessionId,
          type: options.type || PromptTypeEnum.Chat,
        })
        if (!prompt) {
          throw new Error('Failed to save prompt')
        }
        return prompt
      } finally {
        setLoading(false)
      }
    },
    [sessionId],
  )

  return {
    loading,
    createPrompt,
  }
}
