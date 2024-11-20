import { useInternalNode, useReactFlow } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { VectorDatabase } from 'src/services/database/entities'
import { FlowNodeTypeEnum, CSVData, JSONData, JSONLData } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { getStorageDataSource } from 'src/utils/vector-storage'

export const useActions = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('flows')
  const { toast } = useToast()

  const node = useInternalNode(id)
  const { getNode, getHandleConnections } = useReactFlow()
  const similaritySearchWithScoreFunction = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const similaritySearchWithScore = useCallback(
    async (input: string, options?: { k?: number }) => {
      try {
        const entity = node?.data?.entity as VectorDatabase
        if (!entity) {
          toast({
            title: t('vector_database_node.errors.vector_database_not_found'),
          })
          return
        }
        const connections = getHandleConnections({
          nodeId: id,
          type: 'target',
        })
        const dataSourceNode = connections
          .map((connection) => getNode(connection.source))
          .find(
            (node) =>
              node?.type &&
              [FlowNodeTypeEnum.JSONLData, FlowNodeTypeEnum.CSVData].includes(
                node?.type as FlowNodeTypeEnum,
              ),
          )
        const dataSource = dataSourceNode?.data?.entity as CSVData | JSONData | JSONLData
        if (!dataSource && entity.storage === 'DataNode') {
          toast({
            title: t('vector_database_node.errors.data_node_not_found'),
          })
          return
        }
        setLoading(true)
        return similaritySearchWithScoreFunction(
          {
            databaseId: entity.id,
            dataSourceId: dataSource.id,
            dataSourceType: getStorageDataSource(dataSource),
          },
          input,
          options?.k,
        )
      } catch {
        toast({
          variant: 'destructive',
          title: t('vector_database_node.errors.similarity_search_failed'),
        })
      } finally {
        setLoading(false)
      }
    },
    [
      node?.data?.entity,
      getHandleConnections,
      id,
      similaritySearchWithScoreFunction,
      toast,
      t,
      getNode,
    ],
  )

  return {
    loading,
    similaritySearchWithScore,
  }
}
