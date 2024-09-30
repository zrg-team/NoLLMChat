import type { UpdateResult, FindManyOptions, FindOneOptions, ObjectLiteral } from 'typeorm'
import { nanoid } from 'nanoid'
import { EntityType } from 'src/utils/orm-type'

import type { AppEntityNames } from './entities'
import { QueryOptions, transformQueryObjectToJSON } from './utils/query'

let worker: Worker
const processes: Record<
  string,
  { type: string; resolve: (data: unknown) => void; reject: (err: Error) => void }
> = {}

const handleWorkerMessages = (event: MessageEvent) => {
  const { key, type, error, result } = event.data
  switch (type) {
    case 'init':
    case 'repository-execute':
      {
        const process = processes[key]
        if (!process) {
          return console.error(`No process found for key: ${key}`)
        }
        if (error) {
          process.reject(new Error(error))
        } else {
          process.resolve(result)
        }
      }
      break
    default:
      console.error(`Unknown message type: ${type}`)
  }
}

export const initDatabase = async () => {
  if (worker) {
    worker.removeEventListener('message', handleWorkerMessages)
    worker.terminate()
  }
  worker = new Worker(new URL('./database-worker.ts', import.meta.url), {
    type: 'module',
  })
  worker.addEventListener('message', handleWorkerMessages)
  const { promise, key } = createProcessPromise('init')
  worker?.postMessage({ type: 'init', key })
  return promise
}

const createProcessPromise = (type: string) => {
  // Generate a unique key for the process
  const key = nanoid()
  const promise = new Promise((resolve, reject) => {
    processes[key] = { resolve, reject, type }
  })
    .then((data) => {
      delete processes[key]
      return data
    })
    .catch((err) => {
      delete processes[key]
      throw err
    })

  return {
    promise,
    key,
  }
}

const repositoryExecute = async <T>(entity: string | T, action: string, data?: QueryOptions<T>) => {
  let key = ''
  try {
    if (!worker) {
      throw new Error('Worker not initialized')
    }

    const response = createProcessPromise('repository-execute')
    key = response.key
    worker?.postMessage({ key, type: 'repository-execute', payload: { entity, action, data } })
    return response.promise
  } catch (err) {
    console.error('Error executing repository action:', err)
    if (key) {
      delete processes[key]
    }
    throw err
  }
}

export const getRepository = <T extends ObjectLiteral>(entity: AppEntityNames) => {
  return {
    find: (options?: FindManyOptions<T>) => {
      return repositoryExecute(
        entity,
        'find',
        transformQueryObjectToJSON(options),
      ) as unknown as Promise<T[]>
    },
    findOne: (options?: FindOneOptions<T>) => {
      return repositoryExecute(
        entity,
        'findOne',
        transformQueryObjectToJSON(options),
      ) as unknown as Promise<T | undefined>
    },
    delete: (id: string) => {
      return repositoryExecute(entity, 'delete', id) as unknown as Promise<UpdateResult>
    },
    save: (data: EntityType<T>) => {
      return repositoryExecute(entity, 'save', data) as unknown as Promise<T>
    },
    update: (id: string, update: Partial<T>) => {
      return repositoryExecute(entity, 'update', { id, update }) as unknown as Promise<UpdateResult>
    },
  }
}
