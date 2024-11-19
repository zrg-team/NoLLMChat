import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import localforage from 'localforage'
import { EmbeddedResource } from 'voy-search'

type VectorDatabaseType<T extends 'memory' | 'voy'> = T extends 'memory'
  ? MemoryVectorStore['memoryVectors']
  : EmbeddedResource[]

export const getVectorDatabaseStorage = async <T extends 'memory' | 'voy'>(
  provider: T,
  databaseName: string,
  storageService: typeof localforage,
): Promise<VectorDatabaseType<T>> => {
  const storedData = await storageService.getItem(databaseName)
  switch (provider) {
    case 'voy':
      return (storedData as VoyVectorStore['docstore']).map((entry, index) => ({
        id: entry.document.id || entry.document.metadata?.id || index,
        title: JSON.stringify(entry.document.metadata),
        url: `/${databaseName}/items/${entry.document.id || entry.document.metadata?.id || index}`,
        embeddings: entry.embeddings,
      })) as unknown as VectorDatabaseType<T>
    case 'memory':
      return storedData as VectorDatabaseType<T>
    default:
      throw new Error('Invalid provider')
  }
}

export const storeVectorDatabaseStorage = async (
  database: string,
  embeddingStorage: typeof localforage,
  docstore: VoyVectorStore['docstore'] | MemoryVectorStore['memoryVectors'],
) => {
  await embeddingStorage.setItem(database, docstore)
}
