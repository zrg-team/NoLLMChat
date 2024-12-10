import { useCallback } from 'react'
import { Node } from '@xyflow/react'
import { useBaseConnectionToHandler } from 'src/hooks/flows/handlers/use-base-connection-to-handler'
import { useFlowState } from 'src/states/flow'
import { CSVData, FlowNodeTypeEnum, VectorDatabase } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { decodeCSVData } from 'src/utils/string-data'
import { Document } from '@langchain/core/documents'

export const useConnectionToHandler = (id: string) => {
  const createOrUpdateFlowEdge = useFlowState((state) => state.createOrUpdateFlowEdge)
  const indexVector = useLocalEmbeddingState((state) => state.index)

  const connectionHandler = useCallback(
    async ({ edgeId, target, source }: { edgeId: string; source: Node; target: Node }) => {
      try {
        const targetEntity = target?.data?.entity as VectorDatabase
        if (
          source?.type === FlowNodeTypeEnum.CSVData &&
          target?.type === FlowNodeTypeEnum.VectorDatabase
        ) {
          const csvData = source?.data?.entity as CSVData
          if (!csvData || !targetEntity) {
            return {
              deleteEdgeId: edgeId,
            }
          }
          const { rows } = decodeCSVData(csvData.headers, csvData.csv)
          const documents = rows.map(
            (row) =>
              new Document({
                pageContent: `${row.text}`,
              }),
          )
          await indexVector(
            {
              databaseId: targetEntity.id,
              dataSourceId: csvData.id,
              dataSourceType: 'CSVData',
            },
            documents,
          )
          await createOrUpdateFlowEdge({
            source: source.id,
            target: target.id,
          })
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
    [createOrUpdateFlowEdge, indexVector],
  )

  useBaseConnectionToHandler(id, connectionHandler)
}
