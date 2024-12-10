import { useCallback } from 'react'
import { Node } from '@xyflow/react'
import {
  CSVData,
  FlowNodeTypeEnum,
  Message,
  Prompt,
  PromptTypeEnum,
  ThreadStatusEnum,
} from 'src/services/database/types'
import { useCreateIdieMessage } from 'src/hooks/flows/mutations/use-create-idie-message'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'
import { useFlowState } from 'src/states/flow'

export const useConnectionToHandler = (id: string) => {
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const { createIdieMessage } = useCreateIdieMessage()

  const connectionHandler = useCallback(
    async ({ edgeId, source, target }: { edgeId: string; source: Node; target: Node }) => {
      try {
        const targetEntity = target?.data?.entity as Prompt
        const sourceEntity = source?.data?.entity as CSVData
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
        } else if (
          source?.type === FlowNodeTypeEnum.CSVData &&
          target?.type === FlowNodeTypeEnum.Prompt &&
          targetEntity?.type === PromptTypeEnum.FewShotExample &&
          sourceEntity?.headers.includes('input') &&
          sourceEntity?.headers.includes('output')
        ) {
          await createOrUpdateFlowEdge({
            source: source.id,
            target: target.id,
          })
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
    [createIdieMessage, createOrUpdateFlowEdge],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
