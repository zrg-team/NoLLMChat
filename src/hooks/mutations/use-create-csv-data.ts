import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateCSVData = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createCSVData = useCallback(
    async (source: Node, headers: string[], data: string[][]) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const csvData = await getRepository('CSVData').save({
          headers: headers.join(','),
          data: data.map((row) => row.join(',')).join('\n'),
          session_id: sessionId,
        })
        if (!csvData) {
          throw new Error('Failed to save')
        }
        const dataNode = await createOrUpdateFlowNode({
          source_id: csvData.id,
          source_type: 'CSVData',
          node_type: FlowNodeTypeEnum.CSVData,
          x: initialX,
          y: initialY + 20,
        })
        if (!dataNode) {
          throw new Error('Failed to save node')
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode],
  )

  return {
    loading,
    createCSVData,
  }
}
