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
import { encodeSplitter } from 'src/utils/string-data'

export const useCreateVectorDatabase = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)

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
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        // Default JSONLData source
        const databaseSource = await getRepository('JSONLData').save({
          headers: encodeSplitter(['content', 'embedding', 'metadata']),
          jsonl: '',
          session_id: sessionId,
        })
        if (!databaseSource) {
          throw new Error('Failed to save databaseSource')
        }
        const databaseSourceNode = await createOrUpdateFlowNode({
          source_id: databaseSource.id,
          source_type: 'JSONLData',
          node_type: FlowNodeTypeEnum.JSONLData,
          x: initialX + 80,
          y: initialY + 30,
        })
        if (!databaseSourceNode) {
          throw new Error('Failed to save databaseSource node')
        }

        const vectorDatabase = await getRepository('VectorDatabase').save({
          ...data,
          name: `${data.name}`,
          type: data.type || VectorDatabaseTypeEnum.Local,
          storage: data.storage || VectorDatabaseStorageEnum.DataNode,
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
          y: initialY + 30,
        })
        if (!vectorDatabaseNode) {
          throw new Error('Failed to save vectorDatabase node')
        }
        await createOrUpdateFlowEdge({
          source: databaseSourceNode.id,
          target: vectorDatabaseNode.id,
        })

        return {
          vectorDatabase,
          vectorDatabaseNode,
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, createOrUpdateFlowNode, createOrUpdateFlowEdge],
  )

  return {
    loading,
    createVectorDatabase,
  }
}
