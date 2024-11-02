import { useState, useCallback } from 'react'
import { getRepository } from 'src/modules/database'
import type { LLM, Message, Thread } from 'src/modules/database/entities'
import { MessageFromEnum, MessageStatusEnum } from 'src/modules/database/types/message'
import { ThreadStatusEnum } from 'src/modules/database/types/thread'

export const useCreateNewThread = () => {
  const [loading, setLoading] = useState(false)
  const createThread = useCallback(
    async (llmName: string, messageContent?: string) => {
      setLoading(true)
      try {
        const llm = await getRepository<LLM>('LLM').findOne({
          where: {
            name: llmName,
          }
        })
        if (!llm) {
          return
        }
        const thread = await getRepository<Thread>('Thread').save({
          initial_llm_id: llm.id,
          title: `New thread with ${llm.name}`,
          status: ThreadStatusEnum.Started,
          messages: [],
        })
        if (messageContent) {
          const message = await getRepository<Message>('Message').save({
            thread_id: thread.id,
            content: messageContent,
            status: MessageStatusEnum.Started,
            from: MessageFromEnum.Human,
            llm_id: llm.id
          })
          thread.messages = [message]
        }
        return thread
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return {
    loading,
    createThread,
  }
}
