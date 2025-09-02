import { md5 } from 'js-md5'
import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import localforage from 'localforage'
import {
  CSVData,
  JSONData,
  JSONLData,
  VectorDatabase,
  VectorDatabaseStorageEnum,
} from 'src/services/database/types'
import { EmbeddedResource } from 'voy-search'
import {
  decodeCSVData,
  decodeLine,
  decodeSplitter,
  encodeLine,
  encodeSplitter,
} from './string-data'
import { getRepository } from 'src/services/database/database'

export type VectorData = {
  id?: string
  embedding?: number[]
  content: string
  metadata?: Record<string, unknown>
}

type VectorDatabaseType<T extends 'memory' | 'voy'> = T extends 'memory'
  ? MemoryVectorStore['memoryVectors']
  : EmbeddedResource[]

type VectorDatabaseDocType<T extends 'memory' | 'voy'> = T extends 'memory'
  ? MemoryVectorStore['memoryVectors']
  : VoyVectorStore['docstore']

const mapVectorDataByProvider = async <T extends 'memory' | 'voy'>({
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
export const getVectorDatabaseStorage = async <T extends 'memory' | 'voy'>({
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
  storageDataNode?: JSONData | CSVData | JSONLData | VectorDatabase
}): Promise<VectorDatabaseType<T>> => {
  switch (storageType) {
    case VectorDatabaseStorageEnum.DataNode: {
      if (!storageDataNode) {
        throw new Error('Storage data node not found')
      }
      if ('csv' in storageDataNode) {
        const { rows } = decodeCSVData(storageDataNode?.headers || '', storageDataNode?.csv || '')
        return mapVectorDataByProvider({
          provider,
          storedData: rows as {
            id?: string
            embedding?: number[]
            content: string
            metadata?: Record<string, unknown>
          }[],
          databaseName,
        })
      }
      if ('json' in storageDataNode) {
        return mapVectorDataByProvider({
          provider,
          storedData: JSON.parse(storageDataNode?.json || '[]') as {
            id?: string
            embedding?: number[]
            content: string
            metadata?: Record<string, unknown>
          }[],
          databaseName,
        })
      }
      if ('jsonl' in storageDataNode) {
        return mapVectorDataByProvider({
          provider,
          storedData: decodeLine(storageDataNode?.jsonl).map((item) => JSON.parse(item)) as {
            id?: string
            embedding?: number[]
            content: string
            metadata?: Record<string, unknown>
          }[],
          databaseName,
        })
      }
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
  storageDataNode?: JSONData | CSVData | JSONLData | VectorDatabase
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
    case VectorDatabaseStorageEnum.DataNode:
      {
        storageDataNode = storageDataNode as CSVData | JSONData | JSONLData
        if (!storageDataNode) {
          throw new Error('Storage data node not found')
        }
        const storageDataNodeType = getStorageDataSource(storageDataNode)
        if (storageDataNodeType === 'CSVData') {
          await getRepository(storageDataNodeType).update(storageDataNode.id, {
            csv: encodeLine(
              data.map((item) => {
                const headers = decodeSplitter(
                  (storageDataNode as CSVData | JSONData | JSONLData).headers,
                )
                const row = headers.map((header) => item[header as keyof typeof item])
                return encodeSplitter(row)
              }),
            ),
          })
        }
        if (storageDataNodeType === 'JSONData') {
          await getRepository(storageDataNodeType).update(storageDataNode.id, {
            json: JSON.stringify(data),
          })
        }
        if (storageDataNodeType === 'JSONLData') {
          await getRepository(storageDataNodeType).update(storageDataNode.id, {
            jsonl: encodeLine(data.map((item) => JSON.stringify(item))),
          })
        }
      }
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

export const getStorageDataSource = (dataSource: CSVData | JSONData | JSONLData) => {
  return 'csv' in dataSource
    ? 'CSVData'
    : 'json' in dataSource
      ? 'JSONData'
      : 'jsonl' in dataSource
        ? 'JSONLData'
        : undefined
}

export const getDatabaseId = (name: string) => md5(name)
