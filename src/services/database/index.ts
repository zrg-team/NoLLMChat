import type {
  FindManyOptions,
  UpdateResult,
  FindOneOptions,
  UpdateOptions,
  SaveOptions,
} from './typeorm-wrapper'
import { nanoid } from 'nanoid'
import { EntityType } from 'src/utils/orm-type'

import type { AppEntityNames, EntityTypesMap } from './types'
import { QueryOptions } from './utils/serialize.base'
import { transformQueryObjectToBridgeJSON } from './utils/serialize.main'
import { WorkerExecutionType } from './utils/bridge.base'

let worker: Worker
const processes: Record<
  string,
  { type: string; resolve: (data: unknown) => void; reject: (err: Error) => void }
> = {}

const handleWorkerMessages = (event: MessageEvent) => {
  const { key, type, error, result } = event.data
  switch (type) {
    case WorkerExecutionType.INIT:
    case WorkerExecutionType.REPOSITORY_EXECUTE:
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
    case WorkerExecutionType.RAW_QUERY_EXECUTE:
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
  const { promise, key } = createProcessPromise(WorkerExecutionType.INIT)
  worker?.postMessage({ type: WorkerExecutionType.INIT, key })
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

const repositoryExecute = async <T>(
  entity: string | T,
  action: string,
  data?: QueryOptions<T> | SaveOptions | UpdateOptions,
) => {
  let key = ''
  try {
    if (!worker) {
      throw new Error('Worker not initialized')
    }

    const response = createProcessPromise(WorkerExecutionType.REPOSITORY_EXECUTE)
    key = response.key
    worker?.postMessage({
      key,
      type: WorkerExecutionType.REPOSITORY_EXECUTE,
      payload: { entity, action, data },
    })
    return response.promise
  } catch (err) {
    console.error(`Error executing ${WorkerExecutionType.REPOSITORY_EXECUTE} action:`, err)
    if (key) {
      delete processes[key]
    }
    throw err
  }
}

export const rawQuery = async (query: string, params?: (string | number | boolean)[]) => {
  let key = ''
  try {
    if (!worker) {
      throw new Error('Worker not initialized')
    }

    const response = createProcessPromise(WorkerExecutionType.RAW_QUERY_EXECUTE)
    key = response.key
    worker?.postMessage({
      key,
      type: WorkerExecutionType.RAW_QUERY_EXECUTE,
      payload: { query, params },
    })
    return response.promise
  } catch (err) {
    console.error(`Error executing ${WorkerExecutionType.RAW_QUERY_EXECUTE} action:`, err)
    if (key) {
      delete processes[key]
    }
    throw err
  }
}

export const getRepository = <N extends AppEntityNames>(entity: N) => {
  type T = EntityTypesMap[N]

  return {
    find: (options?: FindManyOptions<T>) => {
      return repositoryExecute(
        entity,
        'find',
        transformQueryObjectToBridgeJSON<FindManyOptions<T>>(options),
      ) as unknown as Promise<T[]>
    },
    findOne: (options?: FindOneOptions<T>) => {
      return repositoryExecute(
        entity,
        'findOne',
        transformQueryObjectToBridgeJSON<FindOneOptions<T>>(options),
      ) as unknown as Promise<T | undefined>
    },
    count: (options?: FindManyOptions<T>) => {
      return repositoryExecute(
        entity,
        'count',
        transformQueryObjectToBridgeJSON<FindManyOptions<T>>(options),
      ) as unknown as Promise<number>
    },
    delete: (id: string) => {
      return repositoryExecute<T>(entity, 'delete', id) as unknown as Promise<UpdateResult>
    },
    save: (data: EntityType<T> | EntityType<T>[]) => {
      return repositoryExecute<T>(entity, 'save', data as SaveOptions) as unknown as Promise<T>
    },
    update: (id: string, update: Partial<T>) => {
      return repositoryExecute<T>(entity, 'update', {
        id,
        update,
      } as UpdateOptions) as unknown as Promise<UpdateResult>
    },
  }
}
