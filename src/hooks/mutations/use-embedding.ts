import { useCallback, useState } from 'react'
import type { FlowNodePlaceholder } from 'src/services/database/entities'
import { useLocalEmbeddingState } from 'src/services/local-embedding'

export const useEmbedding = () => {
  const [loading, setLoading] = useState(false)
  const indexFunction = useLocalEmbeddingState((state) => state.index)
  const similaritySearchWithScoreFunction = useLocalEmbeddingState(
    (state) => state.similaritySearchWithScore,
  )
  const similaritySearchWithScore = useCallback(
    async (
      embeddingNode: FlowNodePlaceholder | undefined,
      ...args: Parameters<typeof similaritySearchWithScoreFunction>
    ) => {
      try {
        setLoading(true)
        if (!embeddingNode) {
          const [info, options] = args
          return similaritySearchWithScoreFunction(info, options)
        }
      } finally {
        setLoading(false)
      }
    },
    [similaritySearchWithScoreFunction],
  )

  const index = useCallback(
    async (
      embeddingNode: FlowNodePlaceholder | undefined,
      ...args: Parameters<typeof indexFunction>
    ) => {
      try {
        setLoading(true)
        if (!embeddingNode) {
          const [info, options] = args
          return indexFunction(info, options)
        }
      } finally {
        setLoading(false)
      }
    },
    [indexFunction],
  )

  return {
    loading,
    index,
    similaritySearchWithScore,
  }
}
