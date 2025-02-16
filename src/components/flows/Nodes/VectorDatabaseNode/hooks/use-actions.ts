import { Document } from '@langchain/core/documents'
import chunk from 'lodash/chunk'
import { useReactFlow } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { getRepository } from 'src/services/database'
import type { VectorDatabase } from 'src/services/database/types'
import {
  FlowNodeTypeEnum,
  CSVData,
  JSONData,
  JSONLData,
  VectorDatabaseStorageEnum,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { getStorageDataSource } from 'src/utils/vector-storage'
import { useEmbedding } from 'src/hooks/mutations/use-embedding'
import { useFlowEmbeddingNode } from 'src/hooks/flows/use-flow-embedding-node'

export const useActions = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('flows')
  const { toast } = useToast()

  const { getNode, getHandleConnections } = useReactFlow()
  const updateNodes = useFlowState((state) => state.updateNodes)
  const { getFlowEmbeddingEntity } = useFlowEmbeddingNode()
  const { index: indexFunction, similaritySearchWithScore: similaritySearchWithScoreFunction } =
    useEmbedding()
  const similaritySearchWithScore = useCallback(
    async (input: string, options?: { k?: number }) => {
      try {
        const vectorDatabaseNode = getNode(id)
        if (!vectorDatabaseNode) {
          return
        }
        const entity = vectorDatabaseNode.data?.entity as VectorDatabase
        if (!entity) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.vector_database_not_found'),
          })
          return
        }
        const embbedingEntity = getFlowEmbeddingEntity()
        if (entity.storage === VectorDatabaseStorageEnum.DataNode) {
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
          if (!dataSource) {
            toast({
              variant: 'destructive',
              title: t('vector_database_node.errors.data_node_not_found'),
            })
            return
          }
          setLoading(true)
          const result = await similaritySearchWithScoreFunction(
            embbedingEntity,
            {
              database: {
                databaseId: entity.id,
                dataSourceId: dataSource.id,
                dataSourceType: getStorageDataSource(dataSource),
              },
            },
            input,
            options?.k,
          )
          return result
        } else {
          setLoading(true)
          const result = await similaritySearchWithScoreFunction(
            embbedingEntity,
            {
              database: {
                databaseId: entity.id,
              },
            },
            input,
            options?.k,
          )
          return result
        }
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
      getNode,
      id,
      getFlowEmbeddingEntity,
      toast,
      t,
      getHandleConnections,
      similaritySearchWithScoreFunction,
    ],
  )

  const indexData = useCallback(
    async (
      data: { id?: string; content?: string; documents?: Document[] },
      options?: {
        onProgressReport?: (info: { total: number; handled: number; handling: number }) => void
      },
    ) => {
      try {
        const vectorDatabaseNode = getNode(id)
        if (!vectorDatabaseNode) {
          return
        }
        setLoading(true)
        const documents = data.content
          ? [
              new Document({
                pageContent: data.content,
                id: data.id,
                metadata: {
                  id: data.id,
                },
              }),
            ]
          : data.documents

        if (!documents?.length) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.content_not_found'),
          })
          return
        }

        const entity = vectorDatabaseNode.data?.entity as VectorDatabase
        if (!entity || !vectorDatabaseNode) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.vector_database_not_found'),
          })
          return
        }

        const embbedingEntity = getFlowEmbeddingEntity()

        if (entity.storage === VectorDatabaseStorageEnum.DataNode) {
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
          if (!dataSource) {
            toast({
              variant: 'destructive',
              title: t('vector_database_node.errors.data_node_not_found'),
            })
            return
          }
          const dataSourceType = getStorageDataSource(dataSource)

          const chunkedDocuments = chunk(documents, 10)
          let handledCount = 0

          for (const partDocuments of chunkedDocuments) {
            options?.onProgressReport?.({
              handling: partDocuments.length,
              handled: handledCount,
              total: documents.length,
            })
            await indexFunction(
              embbedingEntity,
              {
                database: {
                  databaseId: entity.id,
                  dataSourceId: dataSource.id,
                  dataSourceType,
                },
              },
              partDocuments,
            )
            if (dataSourceType && dataSourceNode) {
              const updatedDataNode = await getRepository(dataSourceType).findOne({
                where: { id: dataSource.id },
              })
              updateNodes([
                {
                  type: 'replace',
                  id: dataSourceNode.id,
                  item: {
                    ...dataSourceNode,
                    data: {
                      ...dataSourceNode.data,
                      entity: updatedDataNode,
                    },
                  },
                },
              ])
            }
            handledCount += partDocuments.length
          }
        } else {
          // DEFAULT OPTION IS INDEXING AND STORED DIRECTLY TO VECTOR DATABASE ENTITY
          const chunkedDocuments = chunk(documents, 10)
          let handledCount = 0

          for (const partDocuments of chunkedDocuments) {
            options?.onProgressReport?.({
              handling: partDocuments.length,
              handled: handledCount,
              total: documents.length,
            })
            await indexFunction(
              embbedingEntity,
              {
                database: {
                  databaseId: entity.id,
                },
              },
              partDocuments,
            )
            const updatedDataNode = await getRepository('VectorDatabase').findOne({
              where: { id: `${entity.id}` },
            })
            updateNodes([
              {
                type: 'replace',
                id: vectorDatabaseNode.id,
                item: {
                  ...vectorDatabaseNode,
                  data: {
                    ...vectorDatabaseNode.data,
                    entity: updatedDataNode,
                  },
                },
              },
            ])
            handledCount += partDocuments.length
          }
        }
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
      getNode,
      id,
      getFlowEmbeddingEntity,
      toast,
      t,
      getHandleConnections,
      indexFunction,
      updateNodes,
    ],
  )

  return {
    loading,
    indexData,
    similaritySearchWithScore,
  }
}
