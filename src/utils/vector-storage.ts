import { md5 } from 'js-md5'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import localforage from 'localforage'
import { VectorDatabase, VectorDatabaseStorageEnum } from 'src/services/database/types'
import { EmbeddedResource } from 'voy-search'
import { decodeLine, encodeLine } from './string-data'
import { getRepository } from 'src/services/database'

export type VectorData = {
  id?: string
  embedding?: number[]
  content: string
  metadata?: Record<string, unknown>
}

type VectorDatabaseType<T extends 'memory' | 'voy' | 'pgvector'> = T extends 'memory'
  ? MemoryVectorStore['memoryVectors']
  : EmbeddedResource[]

type VectorDatabaseDocType<T extends 'memory' | 'voy'> = T extends 'memory'
  ? MemoryVectorStore['memoryVectors']
  : VoyVectorStore['docstore']

const mapVectorDataByProvider = async <T extends 'memory' | 'voy' | 'pgvector'>({
  provider,
  storedData,
  databaseName,
}: {
  provider: T
  storedData: {
    id?: string
    embedding?: number[]
    content: string
    metadata?: Record<string, unknown>
  }[]
  databaseName: string
}) => {
  switch (provider) {
    case 'voy':
      return storedData.map((entry, index) => ({
        id: entry.id || entry.metadata?.id || index,
        title: JSON.stringify({
          pageContent: entry.content,
          metadata: entry.metadata,
        }),
        url: `/${databaseName}/items/${entry.id || entry.metadata?.id || index}`,
        embeddings: entry.embedding,
      })) as VectorDatabaseType<T>
    case 'memory':
      return storedData.map((entry, index) => ({
        content: entry.content,
        embedding: entry.embedding,
        metadata: entry.metadata,
        id: entry.id || entry.metadata?.id || index,
      })) as VectorDatabaseType<T>
    default:
      throw new Error('Invalid provider')
  }
}
export const getVectorDatabaseStorage = async <T extends 'memory' | 'voy' | 'pgvector'>({
  storageType,
  provider,
  databaseName,
  storageService,
  storageDataNode,
}: {
  storageType: `${VectorDatabaseStorageEnum}`
  provider: T
  databaseName: string
  storageService?: typeof localforage
  storageDataNode?: VectorDatabase
}): Promise<VectorDatabaseType<T>> => {
  switch (storageType) {
    case VectorDatabaseStorageEnum.Database: {
      // TODO: add support for pgvector
      return []
    }
    case VectorDatabaseStorageEnum.DatabaseNode: {
      const entity = storageDataNode as VectorDatabase
      return mapVectorDataByProvider({
        provider,
        storedData: decodeLine(entity?.raw).map((item) => JSON.parse(item)) as {
          id?: string
          embedding?: number[]
          content: string
          metadata?: Record<string, unknown>
        }[],
        databaseName,
      })
    }
    case VectorDatabaseStorageEnum.IndexedDB: {
      const storedData = (await storageService?.getItem(databaseName)) as {
        id?: string
        embedding?: number[]
        content: string
        metadata?: Record<string, unknown>
      }[]
      if (!storedData) {
        return []
      }
      return mapVectorDataByProvider({ provider, storedData, databaseName })
    }
    default:
      throw new Error('Invalid storage type')
  }
}

export const storeVectorDatabaseStorage = async <T extends 'memory' | 'voy'>({
  docstore,
  storageType,
  databaseName,
  embeddingStorage,
  storageDataNode,
}: {
  storageType: `${VectorDatabaseStorageEnum}`
  provider: T
  databaseName: string
  embeddingStorage: typeof localforage
  docstore: VectorDatabaseDocType<T>
  storageDataNode?: VectorDatabase
}) => {
  const data = docstore.map((entry) => {
    if ('embedding' in entry) {
      return {
        id: entry.id,
        embedding: entry.embedding,
        content: entry.content,
        metadata: entry.metadata,
      }
    }
    return {
      id: entry.document.metadata.id,
      content: entry.document.pageContent,
      metadata: entry.document.metadata,
      embedding: entry.embeddings,
    }
  })
  switch (storageType) {
    case VectorDatabaseStorageEnum.Database:
      break
    case VectorDatabaseStorageEnum.DatabaseNode:
      {
        const entity = storageDataNode as VectorDatabase
        await getRepository('VectorDatabase').update(entity.id, {
          raw: encodeLine(data.map((item) => JSON.stringify(item))),
        })
      }
      break
    case VectorDatabaseStorageEnum.IndexedDB:
      {
        await embeddingStorage.setItem(databaseName, data)
      }
      break
  }
  return data
}

export const getDatabaseId = (name: string) => md5(name)
