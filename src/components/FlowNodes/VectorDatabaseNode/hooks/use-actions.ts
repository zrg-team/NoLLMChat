import { Document } from '@langchain/core/documents'
import chunk from 'lodash/chunk'
import { useInternalNode, useReactFlow } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { getRepository } from 'src/services/database'
import { VectorDatabase } from 'src/services/database/entities'
import { FlowNodeTypeEnum, CSVData, JSONData, JSONLData } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { useFlowState } from 'src/states/flow'
import { getStorageDataSource } from 'src/utils/vector-storage'

export const useActions = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('flows')
  const { toast } = useToast()

  const node = useInternalNode(id)
  const { getNode, getHandleConnections } = useReactFlow()
  const updateNodes = useFlowState((state) => state.updateNodes)
  const indexFunction = useLocalEmbeddingState((state) => state.index)
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

  const indexData = useCallback(
    async (
      data: { id?: string; content?: string; documents?: Document[] },
      options?: {
        onChunkStart?: (part: Document[], all: Document[]) => void
        onChunkEnd?: (part: Document[], all: Document[]) => void
      },
    ) => {
      try {
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
            title: t('vector_database_node.errors.content_not_found'),
          })
          return
        }

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
        const dataSourceType = getStorageDataSource(dataSource)

        const chunkedDocuments = chunk(documents, 20)

        for (const partDocuments of chunkedDocuments) {
          options?.onChunkStart?.(partDocuments, documents)
          await indexFunction(
            {
              databaseId: entity.id,
              dataSourceId: dataSource.id,
              dataSourceType,
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
          options?.onChunkEnd?.(partDocuments, documents)
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
    [node?.data?.entity, getHandleConnections, id, indexFunction, toast, t, getNode, updateNodes],
  )

  return {
    loading,
    indexData,
    similaritySearchWithScore,
  }
}
