import { SetState, GetState } from 'src/utils/zustand'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import localforage from 'localforage'

import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'

import { LocalEmbeddingState } from './state'
import { WorkerEmbeddings } from '../utils/worker-embeddings'
import { getVoyDatabase, storeVoyDatabase } from 'src/utils/voy-storage'

export interface LocalEmbeddingStateActions {
  init: () => void
  index: (
    database: string,
    ...args: Parameters<VoyVectorStore['addDocuments']>
  ) => ReturnType<VoyVectorStore['addDocuments']>
  similaritySearch: (
    database: string,
    ...args: Parameters<VoyVectorStore['similaritySearch']>
  ) => ReturnType<VoyVectorStore['similaritySearch']>
  similaritySearchWithScore: (
    database: string,
    ...args: Parameters<VoyVectorStore['similaritySearchWithScore']>
  ) => ReturnType<VoyVectorStore['similaritySearchWithScore']>
}

export const getLocalEmbeddingStateActions = (
  set: SetState<LocalEmbeddingState>,
  get: GetState<LocalEmbeddingState>,
): LocalEmbeddingStateActions => {
  return {
    init: async () => {
      try {
        const embedding = get().embedding
        if (!embedding) {
          set({
            embedding: new WorkerEmbeddings({
              modelName: DEFAULT_EMBEDDING_MODEL,
            }),
          })
        }
        const embeddingStorage = get().embeddingStorage
        if (!embeddingStorage) {
          set({
            embeddingStorage: localforage.createInstance({
              name: 'vector-database',
              driver: localforage.INDEXEDDB,
              storeName: 'main',
            }),
          })
        }
      } catch (error) {
        console.warn('Failed init:', error)
      } finally {
        set({ ready: true })
      }
    },
    index: async (database, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const voyClient = await getVoyDatabase(database, embeddingStorage)
      const store = new VoyVectorStore(voyClient, embedding)
      await store.addDocuments(...args)
      await storeVoyDatabase(database, embeddingStorage, store.docstore)
    },
    similaritySearch: async (database, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const voyClient = await getVoyDatabase(database, embeddingStorage)
      const store = new VoyVectorStore(voyClient, embedding)

      const documents = await store.similaritySearch(...args)
      return documents
    },
    similaritySearchWithScore: async (database, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const voyClient = await getVoyDatabase(database, embeddingStorage)
      const store = new VoyVectorStore(voyClient, embedding)

      const documents = await store.similaritySearchWithScore(...args)
      return documents
    },
  }
}
