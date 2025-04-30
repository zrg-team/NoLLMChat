import { useCallback, useState } from 'react'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { useLangchainEmbedding } from 'src/hooks/mutations/use-langchain-embedding'
import { EmbeddingProviderEnum } from 'src/services/database/types'

export const useEmbedding = () => {
  const [loading, setLoading] = useState(false)
  const indexLocalEmbedding = useLocalEmbeddingState((state) => state.index)
  const similaritySearchWithScoreLocalEmbedding = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const getLocalVectorDatabase = useLocalEmbeddingState((state) => state.getVectorDatabase)
  const { getEmbedding } = useLangchainEmbedding()
  const similaritySearchWithScore = useCallback(
    async (
      embbedingEntity?:
        | { encrypted?: Record<string, unknown>; provider?: string; passphrase?: string }
        | undefined,
      ...args: Parameters<typeof similaritySearchWithScoreLocalEmbedding>
    ) => {
      try {
        const [info, options] = args
        setLoading(true)
        if (
          !embbedingEntity ||
          !embbedingEntity.provider ||
          embbedingEntity.provider === EmbeddingProviderEnum.Local
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
      embbedingEntity: Parameters<typeof getEmbedding>[0],
      ...args: Parameters<typeof indexLocalEmbedding>
    ) => {
      try {
        const [info, documents] = args
        setLoading(true)
        if (
          !embbedingEntity ||
          !embbedingEntity.provider ||
          embbedingEntity.provider === EmbeddingProviderEnum.Local
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

  const getVectorDatabase = useCallback(
    async (
      embbedingEntity: Parameters<typeof getEmbedding>[0],
      ...args: Parameters<typeof getLocalVectorDatabase>
    ) => {
      setLoading(true)
      const [info] = args
      setLoading(true)
      if (
        !embbedingEntity ||
        !embbedingEntity.provider ||
        embbedingEntity.provider === EmbeddingProviderEnum.Local
      ) {
        return getLocalVectorDatabase({
          ...info,
          embedding: undefined,
        })
      }

      const embedding = await getEmbedding({
        ...embbedingEntity,
      })

      return getLocalVectorDatabase({
        ...info,
        embedding,
      })
    },
    [],
  )

  return {
    loading,
    index,
    getVectorDatabase,
    similaritySearchWithScore,
  }
}
