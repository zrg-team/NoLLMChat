import { useCallback } from 'react'
import { Node } from '@xyflow/react'
import { FlowNodeTypeEnum, Message, Prompt, ThreadStatusEnum } from 'src/services/database/types'
import { useCreateIdieMessage } from 'src/hooks/mutations/use-create-idie-message'
import { useBaseConnectionToHandler } from 'src/hooks/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const { createIdieMessage } = useCreateIdieMessage()

  const connectionHandler = useCallback(
    async ({ edgeId, source, target }: { edgeId: string; source: Node; target: Node }) => {
      try {
        if (source?.type === FlowNodeTypeEnum.Message && target?.type === FlowNodeTypeEnum.Prompt) {
          const message = source?.data?.entity as Message
          const prompt = target?.data?.entity as Prompt
          if (!prompt || !message || !target) {
            return {
              deleteEdgeId: edgeId,
            }
          }
          await createIdieMessage(
            source,
            {
              id: message?.thread_id,
              title: '',
              status: ThreadStatusEnum.Started,
              initial_llm_id: message.llm_id,
              session_id: prompt.session_id,
            },
            prompt.content,
            {
              promptNode: target,
            },
          )
          return
        }

        // Need to delete edge
        return {
          deleteEdgeId: edgeId,
        }
      } catch {
        return {
          deleteEdgeId: edgeId,
        }
      }
    },
    [createIdieMessage],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
