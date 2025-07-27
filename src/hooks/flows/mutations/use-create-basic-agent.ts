import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateBasicAgent = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createBasicAgent = useCallback(
    async (
      source: Node,
      options: {
        name: string
        description: string
        system_prompt: string
        max_iterations?: number
      },
    ) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        if (!options.name.trim()) {
          throw new Error('Name is required')
        }
        setLoading(true)

        // Position the new node below the source
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const basicAgent = await getRepository('BasicAgent').save({
          name: options.name.trim(),
          description: options.description.trim(),
          system_prompt: options.system_prompt.trim(),
          max_iterations: options.max_iterations || 10,
          session_id: sessionId,
        })

        if (!basicAgent) {
          throw new Error('Failed to save basic agent')
        }

        const basicAgentNode = await createOrUpdateFlowNode({
          source_id: basicAgent.id,
          source_type: 'BasicAgent',
          node_type: FlowNodeTypeEnum.BasicAgent,
          x: initialX,
          y: initialY + 20,
        })

        if (!basicAgentNode) {
          throw new Error('Failed to save basic agent node')
        }

        return basicAgent
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode],
  )

  return {
    loading,
    createBasicAgent,
  }
}
