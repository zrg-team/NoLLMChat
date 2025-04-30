import localforage from 'localforage'

export const embeddingStorage = localforage.createInstance({
  name: 'vector-database',
  driver: localforage.INDEXEDDB,
  storeName: 'main',
})
