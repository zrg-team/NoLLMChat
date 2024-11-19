import { md5 } from 'js-md5'
import { Voy } from 'voy-search'
import localforage from 'localforage'
import { SetState, GetState } from 'src/utils/zustand'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { getVectorDatabaseStorage, storeVectorDatabaseStorage } from 'src/utils/vector-storage'
import { getRepository } from 'src/services/database'
import { VectorDatabaseProviderEnum } from 'src/services/database/types'
import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'

import { LocalEmbeddingState } from './state'
import { WorkerEmbeddings } from '../utils/worker-embeddings'

export interface LocalEmbeddingStateActions {
  init: () => void
  index: (
    database: string,
    ...args: Parameters<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  ) => ReturnType<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  similaritySearch: (
    database: string,
    ...args: Parameters<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  ) => ReturnType<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  similaritySearchWithScore: (
    database: string,
    ...args: Parameters<
      VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
    >
  ) => ReturnType<
    VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
  >
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
    index: async (databaseId, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({ where: { id: databaseId } })
      if (!database) {
        throw new Error('Database not found.')
      }

      const hashDatabaseName = md5(database.name)
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy:
          {
            const data = await getVectorDatabaseStorage(
              database.provider,
              database.name,
              embeddingStorage,
            )
            const voyClient = new Voy({
              embeddings: data,
            })
            const store = new VoyVectorStore(voyClient, embedding)
            await store.addDocuments(...(args as Parameters<VoyVectorStore['addDocuments']>))
            await storeVectorDatabaseStorage(hashDatabaseName, embeddingStorage, store.docstore)
          }
          break
        case VectorDatabaseProviderEnum.Memory:
          {
            const store = new MemoryVectorStore(embedding)
            await store.addDocuments(...(args as Parameters<MemoryVectorStore['addDocuments']>))
            await storeVectorDatabaseStorage(
              hashDatabaseName,
              embeddingStorage,
              store.memoryVectors,
            )
          }
          break
      }
    },
    similaritySearch: async (databaseId, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({ where: { id: databaseId } })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }

      const hashDatabaseName = md5(database.name)
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy: {
          const data = await getVectorDatabaseStorage(
            database.provider,
            hashDatabaseName,
            embeddingStorage,
          )
          const voyClient = new Voy({
            embeddings: data,
          })
          const store = new VoyVectorStore(voyClient, embedding)
          const documents = await store.similaritySearch(
            ...(args as Parameters<VoyVectorStore['similaritySearch']>),
          )
          return documents
        }
        case VectorDatabaseProviderEnum.Memory: {
          const data = await getVectorDatabaseStorage(
            database.provider,
            hashDatabaseName,
            embeddingStorage,
          )
          const store = new MemoryVectorStore(embedding)
          store.memoryVectors = data
          const documents = await store.similaritySearch(
            ...(args as Parameters<MemoryVectorStore['similaritySearch']>),
          )
          return documents
        }
        default:
          throw new Error('Invalid provider')
      }
    },
    similaritySearchWithScore: async (databaseId, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({ where: { id: databaseId } })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }

      const hashDatabaseName = md5(database.name)
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy: {
          const data = await getVectorDatabaseStorage(
            database.provider,
            hashDatabaseName,
            embeddingStorage,
          )
          const voyClient = new Voy({
            embeddings: data,
          })
          const store = new VoyVectorStore(voyClient, embedding)
          const documents = await store.similaritySearchWithScore(
            ...(args as Parameters<VoyVectorStore['similaritySearchWithScore']>),
          )
          return documents
        }
        case VectorDatabaseProviderEnum.Memory: {
          const data = await getVectorDatabaseStorage(
            database.provider,
            hashDatabaseName,
            embeddingStorage,
          )
          const store = new MemoryVectorStore(embedding)
          store.memoryVectors = data
          const documents = await store.similaritySearchWithScore(
            ...(args as Parameters<MemoryVectorStore['similaritySearchWithScore']>),
          )
          return documents
        }
        default:
          throw new Error('Invalid provider')
      }
    },
  }
}
