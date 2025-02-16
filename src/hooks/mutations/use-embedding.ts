import { useCallback, useState } from 'react'
import type { FlowNodePlaceholder } from 'src/services/database/entities'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { useLangchainEmbedding } from 'src/hooks/mutations/use-langchain-embedding'

export const useEmbedding = () => {
  const [loading, setLoading] = useState(false)
  const indexLocalEmbedding = useLocalEmbeddingState((state) => state.index)
  const similaritySearchWithScoreLocalEmbedding = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const { getEmbedding } = useLangchainEmbedding()
  const similaritySearchWithScore = useCallback(
    async (
      embbedingEntity?: FlowNodePlaceholder | undefined,
      ...args: Parameters<typeof similaritySearchWithScoreLocalEmbedding>
    ) => {
      try {
        const [info, options] = args
        setLoading(true)
        if (
          !embbedingEntity ||
          !embbedingEntity.data?.provider ||
          embbedingEntity.data?.provider === 'local_transformers'
        ) {
          return similaritySearchWithScoreLocalEmbedding(info, options)
        }

        const embedding = await getEmbedding(embbedingEntity)

        return similaritySearchWithScoreLocalEmbedding(
          {
            ...info,
            embedding,
          },
          options,
        )
      } finally {
        setLoading(false)
      }
    },
    [getEmbedding, similaritySearchWithScoreLocalEmbedding],
  )

  const index = useCallback(
    async (
      embbedingEntity?: FlowNodePlaceholder | undefined,
      ...args: Parameters<typeof indexLocalEmbedding>
    ) => {
      try {
        const [info, documents] = args
        setLoading(true)
        if (
          !embbedingEntity ||
          !embbedingEntity.data?.provider ||
          embbedingEntity.data?.provider === 'local_transformers'
        ) {
          return indexLocalEmbedding(info, documents)
        }

        const embedding = await getEmbedding(embbedingEntity)

        return indexLocalEmbedding(
          {
            ...info,
            embedding,
          },
          documents,
        )
      } finally {
        setLoading(false)
      }
    },
    [getEmbedding, indexLocalEmbedding],
  )

  return {
    loading,
    index,
    similaritySearchWithScore,
  }
}
