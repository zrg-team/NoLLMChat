import { Document } from '@langchain/core/documents'
import chunk from 'lodash/chunk'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { VectorDatabase } from 'src/services/database/entities'
import { VectorDatabaseStorageEnum } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'

export const useVectorDatabaseActions = () => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('flows')
  const { toast } = useToast()

  const indexFunction = useLocalEmbeddingState((state) => state.index)
  const similaritySearchWithScoreFunction = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const similaritySearchWithScore = useCallback(
    async (input: string, options?: { k?: number; vectorDatabase: VectorDatabase }) => {
      try {
        if (!options?.vectorDatabase) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.vector_database_not_found'),
          })
          return
        }
        if (options?.vectorDatabase.storage === VectorDatabaseStorageEnum.DataNode) {
          throw new Error('DataNode storage is not supported for similarity search')
        } else {
          setLoading(true)
          const result = await similaritySearchWithScoreFunction(
            {
              databaseId: options.vectorDatabase.id,
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
    [similaritySearchWithScoreFunction, toast, t],
  )

  const indexData = useCallback(
    async (
      data: { id?: string; content?: string; documents?: Document[] },
      options?: {
        vectorDatabase: VectorDatabase
        onProgressReport?: (info: { total: number; handled: number; handling: number }) => void
      },
    ) => {
      try {
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

        if (!options?.vectorDatabase) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.vector_database_not_found'),
          })
          return
        }

        if (options?.vectorDatabase.storage === VectorDatabaseStorageEnum.DataNode) {
          throw new Error('DataNode storage is not supported for indexing')
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
              {
                databaseId: options.vectorDatabase.id,
              },
              partDocuments,
            )
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
    [indexFunction, toast, t],
  )

  return {
    loading,
    indexData,
    similaritySearchWithScore,
  }
}
