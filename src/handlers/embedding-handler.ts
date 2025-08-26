import type { Document } from '@langchain/core/documents'
import type { FlowNodePlaceholder, VectorDatabaseNodeDataSource } from 'src/services/database/types'
import { useLocalEmbeddingState } from 'src/services/local-embedding'
import { Embeddings } from '@langchain/core/embeddings'
import { OpenAIEmbeddings } from '@langchain/openai'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import secureSession from 'src/utils/secure-session'
import { decryptSymmetric } from 'src/utils/aes'

/**
 * Non-hook embedding handler that can be used anywhere in the application
 * Follows the same pattern as llm-handler.ts but for embedding operations
 */
export const embeddingHandler = {
  /**
   * Perform similarity search with score using the appropriate embedding provider
   */
  async similaritySearchWithScore(
    embeddingEntity: FlowNodePlaceholder | undefined,
    options: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: string
      }
    },
    query: string,
    k: number = 4,
  ): Promise<Array<[Document, number]> | null> {
    try {
      // Get the local embedding state and actions
      const localEmbeddingState = useLocalEmbeddingState.getState()
      const { similaritySearchWithScore: localSimilaritySearch } = localEmbeddingState

      // If no embedding entity provided or using local transformers, use local embedding
      if (
        !embeddingEntity ||
        !embeddingEntity.data?.provider ||
        embeddingEntity.data?.provider === 'local_transformers'
      ) {
        return await localSimilaritySearch(
          {
            database: {
              databaseId: options.database.databaseId,
              dataSourceId: options.database.dataSourceId,
              dataSourceType: options.database.dataSourceType as
                | `${VectorDatabaseNodeDataSource}`
                | undefined,
            },
          },
          query,
          k,
        )
      }

      // For other providers, get the langchain embedding and use it
      const embedding = await this.getEmbeddingModel(embeddingEntity)

      return await localSimilaritySearch(
        {
          database: {
            databaseId: options.database.databaseId,
            dataSourceId: options.database.dataSourceId,
            dataSourceType: options.database.dataSourceType as
              | `${VectorDatabaseNodeDataSource}`
              | undefined,
          },
          embedding,
        },
        query,
        k,
      )
    } catch (error) {
      console.error('Embedding similarity search failed:', error)
      return null
    }
  },

  /**
   * Get embedding model instance for a given embedding entity
   * This replicates the exact logic from useLangchainEmbedding hook
   */
  async getEmbeddingModel(embeddingEntity: FlowNodePlaceholder): Promise<Embeddings | undefined> {
    try {
      const encrypted = embeddingEntity?.encrypted
      const provider = embeddingEntity.data?.provider

      if (!encrypted?.provider && !encrypted?.key) {
        throw new Error('API Key is not found.')
      }

      const passphrase = await secureSession.get('passphrase')
      if (!passphrase) {
        throw new Error('Passphrase is not found')
      }

      const apiKey = await decryptSymmetric(`${encrypted.key}`, passphrase!)
      if (!apiKey || !provider) {
        throw new Error('API Key or provider is not found.')
      }

      switch (provider) {
        case 'OpenAI':
          return new OpenAIEmbeddings({
            apiKey,
            model: 'text-embedding-3-small',
          })
        case 'GoogleGenerativeAI':
          return new GoogleGenerativeAIEmbeddings({
            apiKey,
            model: 'text-embedding-004',
          })
        default:
          throw new Error(`Provider ${provider} is not supported`)
      }
    } catch (error) {
      console.error('Failed to get embedding model:', error)
      throw error
    }
  },

  /**
   * Index documents into a vector database
   */
  async index(
    embeddingEntity: FlowNodePlaceholder | undefined,
    options: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: string
      }
    },
    documents: Document[],
  ): Promise<void> {
    try {
      const localEmbeddingState = useLocalEmbeddingState.getState()
      const { index: localIndex } = localEmbeddingState

      if (
        !embeddingEntity ||
        !embeddingEntity.data?.provider ||
        embeddingEntity.data?.provider === 'local_transformers'
      ) {
        return await localIndex(
          {
            database: {
              databaseId: options.database.databaseId,
              dataSourceId: options.database.dataSourceId,
              dataSourceType: options.database.dataSourceType as
                | `${VectorDatabaseNodeDataSource}`
                | undefined,
            },
          },
          documents,
        )
      }

      // For other providers, get the langchain embedding and use it
      const embedding = await this.getEmbeddingModel(embeddingEntity)

      return await localIndex(
        {
          database: {
            databaseId: options.database.databaseId,
            dataSourceId: options.database.dataSourceId,
            dataSourceType: options.database.dataSourceType as
              | `${VectorDatabaseNodeDataSource}`
              | undefined,
          },
          embedding,
        },
        documents,
      )
    } catch (error) {
      console.error('Embedding indexing failed:', error)
      throw error
    }
  },
}

export default embeddingHandler
