import { md5 } from 'js-md5'
import { Document } from 'langchain/document'
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  TokenTextSplitter,
} from 'langchain/text_splitter'
import { EmbeddedResource, Voy } from 'voy-search'
import localforage from 'localforage'
import { SetState, GetState } from 'src/utils/zustand'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { getVectorDatabaseStorage, storeVectorDatabaseStorage } from 'src/utils/vector-storage'
import { getRepository } from 'src/services/database'
import {
  VectorDatabase,
  VectorDatabaseNodeDataSource,
  VectorDatabaseProviderEnum,
} from 'src/services/database/types'
import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'

import { LocalEmbeddingState } from './state'
import { WorkerEmbeddings } from '../utils/worker-embeddings'

export interface LocalEmbeddingStateActions {
  init: () => void
  index: (
    database: {
      databaseId: string
      dataSourceId?: string
      dataSourceType?: `${VectorDatabaseNodeDataSource}`
    },
    ...args: Parameters<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  ) => ReturnType<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  similaritySearch: (
    database: {
      databaseId: string
      dataSourceId?: string
      dataSourceType?: `${VectorDatabaseNodeDataSource}`
    },
    ...args: Parameters<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  ) => ReturnType<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  similaritySearchWithScore: (
    database: {
      databaseId: string
      dataSourceId?: string
      dataSourceType?: `${VectorDatabaseNodeDataSource}`
    },
    ...args: Parameters<
      VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
    >
  ) => ReturnType<
    VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
  >
}

const splitterDocuments = (database: VectorDatabase, documents: Document[]) => {
  const metadata = database.metadata as {
    textSplitter?: {
      type: string
      chunkSize: number
      chunkOverlap: number
    }
  }
  if (!metadata?.textSplitter) {
    return documents
  }
  switch (metadata?.textSplitter?.type) {
    case 'TokenTextSplitter':
      return new TokenTextSplitter(metadata.textSplitter).splitDocuments(documents)
    case 'CharacterTextSplitter':
      return new CharacterTextSplitter(metadata.textSplitter).splitDocuments(documents)
    case 'RecursiveCharacterTextSplitter':
      return new RecursiveCharacterTextSplitter(metadata.textSplitter).splitDocuments(documents)
    default:
      throw new Error('Invalid text splitter')
  }
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
    index: async (databaseInfo, documents) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: databaseInfo.databaseId },
      })
      if (!database) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        databaseInfo.dataSourceId && databaseInfo.dataSourceType
          ? await getRepository(databaseInfo.dataSourceType).findOne({
              where: { id: databaseInfo.dataSourceId },
            })
          : undefined

      const hashDatabaseName = md5(database.name)
      const data = await getVectorDatabaseStorage({
        storageType: database.storage || 'IndexedDB',
        provider: database.provider,
        databaseName: hashDatabaseName,
        storageService: embeddingStorage,
        storageDataNode: dataSource,
      })
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy:
          {
            const voyClient = new Voy({
              embeddings: data as EmbeddedResource[],
            })
            const store = new VoyVectorStore(voyClient, embedding)
            await store.addDocuments(await splitterDocuments(database, documents))
            await storeVectorDatabaseStorage({
              database: hashDatabaseName,
              provider: database.provider,
              embeddingStorage,
              docstore: store.docstore,
              storageType: database.storage || 'IndexedDB',
              storageDataNode: dataSource,
            })
          }
          break
        case VectorDatabaseProviderEnum.Memory:
          {
            const store = new MemoryVectorStore(embedding)
            store.memoryVectors = data as unknown as MemoryVectorStore['memoryVectors']
            await store.addDocuments(await splitterDocuments(database, documents))
            await storeVectorDatabaseStorage({
              database: hashDatabaseName,
              provider: database.provider,
              embeddingStorage,
              docstore: store.memoryVectors,
              storageType: database.storage || 'IndexedDB',
              storageDataNode: dataSource,
            })
          }
          break
      }
    },
    similaritySearch: async (databaseInfo, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: databaseInfo.databaseId },
      })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        databaseInfo.dataSourceId && databaseInfo.dataSourceType
          ? await getRepository(databaseInfo.dataSourceType).findOne({
              where: { id: databaseInfo.dataSourceId },
            })
          : undefined

      const hashDatabaseName = md5(database.name)
      const data = await getVectorDatabaseStorage({
        storageType: database.storage || 'IndexedDB',
        provider: database.provider,
        databaseName: hashDatabaseName,
        storageService: embeddingStorage,
        storageDataNode: dataSource,
      })
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy: {
          const voyClient = new Voy({
            embeddings: data as EmbeddedResource[],
          })
          const store = new VoyVectorStore(voyClient, embedding)
          const documents = await store.similaritySearch(
            ...(args as Parameters<VoyVectorStore['similaritySearch']>),
          )
          return documents
        }
        case VectorDatabaseProviderEnum.Memory: {
          const store = new MemoryVectorStore(embedding)
          store.memoryVectors = data as unknown as MemoryVectorStore['memoryVectors']
          const documents = await store.similaritySearch(
            ...(args as Parameters<MemoryVectorStore['similaritySearch']>),
          )
          return documents
        }
        default:
          throw new Error('Invalid provider')
      }
    },
    similaritySearchWithScore: async (databaseInfo, ...args) => {
      const embedding = get().embedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: databaseInfo.databaseId },
      })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        databaseInfo.dataSourceId && databaseInfo.dataSourceType
          ? await getRepository(databaseInfo.dataSourceType).findOne({
              where: { id: databaseInfo.dataSourceId },
            })
          : undefined

      const hashDatabaseName = md5(database.name)
      const data = await getVectorDatabaseStorage({
        storageType: database.storage || 'IndexedDB',
        provider: database.provider,
        databaseName: hashDatabaseName,
        storageService: embeddingStorage,
        storageDataNode: dataSource,
      })
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy: {
          const voyClient = new Voy({
            embeddings: data as EmbeddedResource[],
          })
          const store = new VoyVectorStore(voyClient, embedding)
          const documents = await store.similaritySearchWithScore(
            ...(args as Parameters<VoyVectorStore['similaritySearchWithScore']>),
          )
          return documents
        }
        case VectorDatabaseProviderEnum.Memory: {
          const store = new MemoryVectorStore(embedding)
          store.memoryVectors = data as unknown as MemoryVectorStore['memoryVectors']
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
