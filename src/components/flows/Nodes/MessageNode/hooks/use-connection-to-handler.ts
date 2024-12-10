import { useCallback } from 'react'
import { Node } from '@xyflow/react'
import { FlowNodeTypeEnum, Message, Prompt, ThreadStatusEnum } from 'src/services/database/types'

import { useCreateIdieMessage } from 'src/hooks/flows/mutations/use-create-idie-message'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'

export const useConnectionToHandler = (id: string) => {
  const { createIdieMessage } = useCreateIdieMessage()

  const connectionHandler = useCallback(
    async ({ edgeId, source, target }: { edgeId: string; source: Node; target: Node }) => {
      try {
        if (source?.type === FlowNodeTypeEnum.Prompt && target?.type === FlowNodeTypeEnum.Message) {
          const message = target?.data?.entity as Message
          const prompt = source?.data?.entity as Prompt
          if (!prompt || !message || !target) {
            return {
              deleteEdgeId: edgeId,
            }
          }
          await createIdieMessage(
            target,
            {
              id: message?.thread_id,
              title: '',
              status: ThreadStatusEnum.Started,
              initial_llm_id: message.llm_id,
              session_id: prompt.session_id,
            },
            prompt.content,
            {
              promptNode: source,
            },
          )
          return
        }

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
