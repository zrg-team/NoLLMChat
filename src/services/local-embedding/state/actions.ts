import type { Document } from '@langchain/core/documents'
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
  TokenTextSplitter,
} from 'langchain/text_splitter'
import { EmbeddedResource, Voy } from 'voy-search'
import localforage from 'localforage'
import { SetState, GetState } from 'src/utils/zustand'
import { MemoryVectorStore, MemoryVectorStoreArgs } from 'langchain/vectorstores/memory'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import {
  getDatabaseId,
  getVectorDatabaseStorage,
  storeVectorDatabaseStorage,
} from 'src/utils/vector-storage'
import { getRepository } from 'src/services/database'
import {
  VectorDatabase,
  VectorDatabaseNodeDataSource,
  VectorDatabaseProviderEnum,
} from 'src/services/database/types'
import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'
import { Embeddings } from '@langchain/core/embeddings'
import { logWarn } from 'src/utils/logger'

import { LocalEmbeddingState } from './state'
import { WorkerEmbeddings } from '../utils/worker-embeddings'
import { getLocalEmbeddingWorker } from '../worker'

export interface LocalEmbeddingStateActions {
  init: () => void
  destroy: () => void
  index: (
    info: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: `${VectorDatabaseNodeDataSource}`
      }
      embedding?: Embeddings
    },
    ...args: Parameters<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  ) => ReturnType<VoyVectorStore['addDocuments'] | MemoryVectorStore['addDocuments']>
  similaritySearch: (
    info: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: `${VectorDatabaseNodeDataSource}`
      }
      embedding?: Embeddings
    },
    ...args: Parameters<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  ) => ReturnType<VoyVectorStore['similaritySearch'] | MemoryVectorStore['similaritySearch']>
  similaritySearchWithScore: (
    info: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: `${VectorDatabaseNodeDataSource}`
      }
      embedding?: Embeddings
    },
    ...args: Parameters<
      VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
    >
  ) => ReturnType<
    VoyVectorStore['similaritySearchWithScore'] | MemoryVectorStore['similaritySearchWithScore']
  >
  getVectorDatabase: (
    info: {
      database: {
        databaseId: string
        dataSourceId?: string
        dataSourceType?: `${VectorDatabaseNodeDataSource}`
      }
      embedding?: Embeddings
    },
    args?: MemoryVectorStoreArgs,
  ) => Promise<MemoryVectorStore | VoyVectorStore>
}

const splitterDocuments = (database: VectorDatabase, documents: Document[]) => {
  try {
    const metadata = JSON.parse(database.metadata || '{}') as {
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
        return new TokenTextSplitter({
          chunkOverlap: +metadata.textSplitter.chunkOverlap,
          chunkSize: +metadata.textSplitter.chunkSize,
        }).splitDocuments(documents)
      case 'CharacterTextSplitter':
        return new CharacterTextSplitter({
          chunkOverlap: +metadata.textSplitter.chunkOverlap,
          chunkSize: +metadata.textSplitter.chunkSize,
        }).splitDocuments(documents)
      case 'RecursiveCharacterTextSplitter':
        return new RecursiveCharacterTextSplitter({
          chunkOverlap: +metadata.textSplitter.chunkOverlap,
          chunkSize: +metadata.textSplitter.chunkSize,
        }).splitDocuments(documents)
      default:
        throw new Error('Invalid text splitter')
    }
  } catch {
    return documents
  }
}

export const getLocalEmbeddingStateActions = (
  set: SetState<LocalEmbeddingState>,
  get: GetState<LocalEmbeddingState>,
): LocalEmbeddingStateActions => {
  return {
    destroy: () => {
      try {
        const worker = get().worker
        if (worker) {
          worker.terminate()
        }
        set({
          localEmbedding: undefined,
          embeddingStorage: undefined,
          worker: undefined,
        })
      } catch (error) {
        logWarn('Destroy Local Embedding Thread', error)
      }
    },
    init: async () => {
      try {
        const worker = get().worker
        if (worker) {
          worker.terminate()
        }
        const newWorker = getLocalEmbeddingWorker()
        const localEmbedding = new WorkerEmbeddings({
          modelName: DEFAULT_EMBEDDING_MODEL,
          worker: newWorker,
        })
        const embeddingStorage = localforage.createInstance({
          name: 'vector-database',
          driver: localforage.INDEXEDDB,
          storeName: 'main',
        })

        set({
          worker: newWorker,
          localEmbedding,
          embeddingStorage,
        })
      } catch (error) {
        logWarn('Init Local Embedding Thread', error)
      } finally {
        set({ ready: true })
      }
    },
    index: async (info, documents) => {
      const embedding = info?.embedding || get().localEmbedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: info.database.databaseId },
      })
      if (!database) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        info.database.dataSourceId && info.database.dataSourceType
          ? await getRepository(info.database.dataSourceType).findOne({
              where: { id: info.database.dataSourceId },
            })
          : undefined

      const databaseName = getDatabaseId(database.name)
      const splittedDocuments = await splitterDocuments(database, documents)
      const data = await getVectorDatabaseStorage({
        databaseName,
        storageType: database.storage || 'IndexedDB',
        provider: database.provider,
        storageService: embeddingStorage,
        storageDataNode: database || dataSource,
      })
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy:
          {
            const voyClient = new Voy({
              embeddings: data as EmbeddedResource[],
            })
            const store = new VoyVectorStore(voyClient, embedding)
            await store.addDocuments(splittedDocuments)
            await storeVectorDatabaseStorage({
              databaseName,
              provider: database.provider,
              embeddingStorage,
              docstore: store.docstore,
              storageType: database.storage || 'IndexedDB',
              storageDataNode: dataSource || database,
            })
          }
          break
        case VectorDatabaseProviderEnum.Memory:
          {
            const store = new MemoryVectorStore(embedding)
            store.memoryVectors = data as unknown as MemoryVectorStore['memoryVectors']
            await store.addDocuments(splittedDocuments)
            await storeVectorDatabaseStorage({
              databaseName,
              provider: database.provider,
              embeddingStorage,
              docstore: store.memoryVectors,
              storageType: database.storage || 'IndexedDB',
              storageDataNode: dataSource || database,
            })
          }
          break
      }
    },
    getVectorDatabase: async (info, ...args) => {
      const embedding = info.embedding || get().localEmbedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: info.database.databaseId },
      })
      if (!database) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        info.database.dataSourceId && info.database.dataSourceType
          ? await getRepository(info.database.dataSourceType).findOne({
              where: { id: info.database.dataSourceId },
            })
          : undefined

      const databaseName = getDatabaseId(database.name)
      const data = await getVectorDatabaseStorage({
        databaseName,
        storageType: database.storage || 'IndexedDB',
        provider: database.provider,
        storageService: get().embeddingStorage,
        storageDataNode: dataSource,
      })
      switch (database.provider) {
        case VectorDatabaseProviderEnum.Voy: {
          const voyClient = new Voy({
            embeddings: data as EmbeddedResource[],
          })
          return new VoyVectorStore(voyClient, embedding)
        }
        case VectorDatabaseProviderEnum.Memory: {
          const store = new MemoryVectorStore(embedding, args as MemoryVectorStoreArgs)
          store.memoryVectors = data as unknown as MemoryVectorStore['memoryVectors']
          return store
        }
        default:
          throw new Error('Invalid provider')
      }
    },
    similaritySearch: async (info, ...args) => {
      const embedding = info.embedding || get().localEmbedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: info.database.databaseId },
      })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        info.database.dataSourceId && info.database.dataSourceType
          ? await getRepository(info.database.dataSourceType).findOne({
              where: { id: info.database.dataSourceId },
            })
          : undefined

      const databaseName = getDatabaseId(database.name)
      const data = await getVectorDatabaseStorage({
        databaseName,
        storageDataNode: dataSource || database,
        provider: database.provider,
        storageService: embeddingStorage,
        storageType: database.storage || 'IndexedDB',
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
    similaritySearchWithScore: async (info, ...args) => {
      const embedding = info.embedding || get().localEmbedding
      const embeddingStorage = get().embeddingStorage
      if (!embedding || !embeddingStorage) {
        throw new Error('Missing embedding model or storage.')
      }
      const database = await getRepository('VectorDatabase').findOne({
        where: { id: info.database.databaseId },
      })
      if (!database || !database.provider) {
        throw new Error('Database not found.')
      }
      if (!database.provider) {
        throw new Error('Database provider not found.')
      }
      const dataSource =
        info.database.dataSourceId && info.database.dataSourceType
          ? await getRepository(info.database.dataSourceType).findOne({
              where: { id: info.database.dataSourceId },
            })
          : undefined

      const databaseName = getDatabaseId(database.name)
      const data = await getVectorDatabaseStorage({
        databaseName,
        provider: database.provider,
        storageDataNode: dataSource || database,
        storageService: embeddingStorage,
        storageType: database.storage || 'IndexedDB',
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
