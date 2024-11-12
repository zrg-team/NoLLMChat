import { VoyVectorStore } from '@langchain/community/vectorstores/voy'
import { Voy } from 'voy-search'
import localforage from 'localforage'

export const getVoyDatabase = async (database: string, embeddingStorage: typeof localforage) => {
  const currentData = (await embeddingStorage.getItem(database)) as
    | VoyVectorStore['docstore']
    | null
  const voyClient = new Voy(
    currentData
      ? {
          embeddings: currentData.map((item, i) => ({
            id: item.document.id || item.document.metadata?.id || i,
            title: JSON.stringify(item.document.metadata),
            url: `/${database}/items/${item.document.id || item.document.metadata?.id || i}`,
            embeddings: item.embeddings,
          })),
        }
      : undefined,
  )
  return voyClient
}

export const storeVoyDatabase = async (
  database: string,
  embeddingStorage: typeof localforage,
  docstore: VoyVectorStore['docstore'],
) => {
  await embeddingStorage.setItem(database, docstore)
}
