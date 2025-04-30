import { Document } from '@langchain/core/documents'
import chunk from 'lodash/chunk'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { useEmbedding } from 'src/hooks/mutations/use-embedding'
import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import { logError } from 'src/utils/logger'
import { VectorDatabase } from 'src/services/database/types'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'

export const useVectorDatabaseActions = ({
  vectorDatabase,
}: {
  vectorDatabase?: VectorDatabase
}) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('molecules')
  const { toast } = useToast()
  const currentSession = useSessionState(useShallow((state) => state.currentSession))

  const embedding = useWorkspaceState(useShallow((state) => state.embedding))

  const { index: indexFunction, similaritySearchWithScore: similaritySearchWithScoreFunction } =
    useEmbedding()
  const similaritySearchWithScore = useCallback(
    async (input: string, options?: { k?: number }) => {
      try {
        if (!currentSession || !embedding || !vectorDatabase) {
          return
        }
        setLoading(true)
        const result = await similaritySearchWithScoreFunction(
          embedding,
          {
            database: {
              databaseId: vectorDatabase.id,
            },
          },
          input,
          options?.k,
        )
        return result
      } catch {
        toast({
          variant: 'destructive',
          title: t('vector_database_node.errors.similarity_search_failed'),
        })
      } finally {
        setLoading(false)
      }
    },
    [currentSession?.id, toast, t, embedding, vectorDatabase, similaritySearchWithScoreFunction],
  )

  const indexData = useCallback(
    async (
      data: {
        id?: string
        content?: string
        documents?: Document[]
        metadata: Record<string, unknown>
      },
      options?: {
        onProgressReport?: (info: { total: number; handled: number; handling: number }) => void
      },
    ) => {
      try {
        if (!currentSession || !embedding || !vectorDatabase) {
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
                  type: 'CONTEXT',
                  session_id: currentSession.id,
                  ...(data.metadata || {}),
                },
              }),
            ]
          : data.documents?.map((doc) => {
              doc.metadata = {
                ...doc.metadata,
                id: doc.id,
                type: 'CONTEXT',
                session_id: currentSession.id,
                ...(data.metadata || {}),
              }
              return doc
            })

        if (!documents?.length) {
          toast({
            variant: 'destructive',
            title: t('vector_database_node.errors.content_not_found'),
          })
          return
        }

        const chunkedDocuments = chunk(documents, 10)
        let handledCount = 0

        for (const partDocuments of chunkedDocuments) {
          options?.onProgressReport?.({
            handling: partDocuments.length,
            handled: handledCount,
            total: documents.length,
          })
          await indexFunction(
            embedding,
            {
              database: {
                databaseId: vectorDatabase.id,
              },
            },
            partDocuments,
          )
          handledCount += partDocuments.length
        }
      } catch (error) {
        logError('[IndexData] error', error)
        toast({
          variant: 'destructive',
          title: t('vector_database_node.errors.similarity_search_failed'),
        })
      } finally {
        setLoading(false)
      }
    },
    [currentSession?.id, embedding, vectorDatabase, toast, t, indexFunction],
  )

  return {
    loading,
    indexData,
    similaritySearchWithScore,
  }
}
