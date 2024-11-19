import { useInternalNode } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import { VectorDatabase } from 'src/services/database/entities'
import { useLocalEmbeddingState } from 'src/services/local-embedding'

export const useActions = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('flows')
  const { toast } = useToast()
  const node = useInternalNode(id)
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
        setLoading(true)
        return similaritySearchWithScoreFunction(entity.id, input, options?.k)
      } catch {
        toast({
          variant: 'destructive',
          title: t('vector_database_node.errors.similarity_search_failed'),
        })
      } finally {
        setLoading(false)
      }
    },
    [node?.data?.entity, similaritySearchWithScoreFunction, toast, t],
  )

  return {
    loading,
    similaritySearchWithScore,
  }
}
