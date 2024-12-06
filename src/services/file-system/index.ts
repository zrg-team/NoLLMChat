import { logWarn } from 'src/utils/logger'

let appFileSystem: IDBDatabase | undefined
let process: Promise<IDBDatabase> | undefined

const FILE_SYSTEM_DB_NAME = 'file_system'

export const initIndexedDb = () => {
  if (process) {
    return process
  }
  process = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(FILE_SYSTEM_DB_NAME, 1)
    request.onerror = (event) => {
      if (event?.target && 'error' in event.target) {
        reject(event.target?.error)
      }
    }
    request.onsuccess = (event) => {
      if (event?.target && 'result' in event.target) {
        resolve(event.target.result as IDBDatabase)
      }
    }
    request.onupgradeneeded = (event) => {
      // FILES SYSTEM DO NOT REUIRE MIGRATION
      if (event?.target && 'result' in event.target) {
        const db = event.target?.result as IDBDatabase
        const objectStore = db.createObjectStore('files', {
          keyPath: 'path',
        })
        objectStore.createIndex('path', 'path', { unique: true })
      }
    }
  }).then((db) => {
    appFileSystem = db
    process = undefined
    return appFileSystem
  })
  return process
}

const getBaseStore = async () => {
  if (process) {
    await process
  }
  if (!appFileSystem) {
    throw new Error('File system not initialized')
  }
  return appFileSystem.transaction('files', 'readwrite').objectStore('files')
}
const readFileInternal = (store: IDBObjectStore, path: string) => {
  return new Promise<Blob | undefined>((resolve, reject) => {
    try {
      const request = store.get(path)
      request.onsuccess = () => {
        if (!request.result) {
          return resolve(undefined)
        }
        resolve(request.result.file)
      }
      request.onerror = () => reject(request.error)
    } catch (error) {
      reject(error)
    }
  })
}
const writeFileInternal = (store: IDBObjectStore, path: string, file: Blob) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const request = store.put({ path, file })
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    } catch (error) {
      reject(error)
    }
  })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mkdir = async (_path: string) => {
  try {
    await getBaseStore()
  } catch (error) {
    logWarn('[Error] mkdir', error)
    throw error
  }
}
const writeFile = async (path: string, file: Blob) => {
  try {
    const store = await getBaseStore()
    return writeFileInternal(store, path, file)
  } catch (error) {
    logWarn('[Error] writeFile', error)
    throw error
  }
}
const readFile = async (path: string) => {
  try {
    const store = await getBaseStore()
    return readFileInternal(store, path)
  } catch (error) {
    logWarn('[Error] readFile', error)
    throw error
  }
}
const deleteFileInternal = (store: IDBObjectStore, path: string) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const request = store.delete(path)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    } catch (error) {
      logWarn('[Error] deleteFileInternal', error)
      reject(error)
    }
  })
}
const unlink = async (path: string) => {
  try {
    const store = await getBaseStore()
    return deleteFileInternal(store, path)
  } catch (error) {
    logWarn('[Error] unlink', error)
    throw error
  }
}
const exists = async (path: string) => {
  try {
    const store = await getBaseStore()
    const file = await readFileInternal(store, path)
    return !!file
  } catch (error) {
    logWarn('[Error] exists', error)
    throw error
  }
}
const stats = async (path: string) => {
  try {
    const store = await getBaseStore()
    const file = await readFileInternal(store, path)
    return file
  } catch (error) {
    logWarn('[Error] stats', error)
    throw error
  }
}
export const fs = {
  mkdir,
  writeFile,
  readFile,
  unlink,
  exists,
  stats,
}
