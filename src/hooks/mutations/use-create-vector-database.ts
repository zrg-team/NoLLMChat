import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { getRepository } from 'src/services/database'
import {
  FlowNodeTypeEnum,
  VectorDatabase,
  VectorDatabaseProviderEnum,
  VectorDatabaseStorageEnum,
  VectorDatabaseTypeEnum,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'

export const useCreateVectorDatabase = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const createVectorDatabase = useCallback(
    async (
      source: Node,
      data: Partial<VectorDatabase>,
      textSplitter?: {
        type: string
        chunkSize: number
        chunkOverlap: number
      },
    ) => {
      try {
        if (!data?.name || !source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const vectorDatabase = await getRepository('VectorDatabase').save({
          ...data,
          name: `${data.name}`,
          type: data.type || VectorDatabaseTypeEnum.Local,
          storage: data.storage || VectorDatabaseStorageEnum.IndexedDB,
          provider: data.provider || VectorDatabaseProviderEnum.Memory,
          session_id: sessionId,
          metadata: textSplitter ? JSON.stringify({ textSplitter }) : undefined,
        })
        if (!vectorDatabase) {
          throw new Error('Failed to save vectorDatabase')
        }
        const vectorDatabaseNode = await createOrUpdateFlowNode({
          source_id: vectorDatabase.id,
          source_type: 'VectorDatabase',
          node_type: FlowNodeTypeEnum.VectorDatabase,
          x: initialX,
          y: initialY + 20,
        })
        if (!vectorDatabaseNode) {
          throw new Error('Failed to save vectorDatabase node')
        }

        return {
          vectorDatabase,
          vectorDatabaseNode,
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode],
  )

  return {
    loading,
    createVectorDatabase,
  }
}
