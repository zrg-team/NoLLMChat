import type {
  FindManyOptions,
  UpdateResult,
  FindOneOptions,
  UpdateOptions,
  SaveOptions,
} from './typeorm-wrapper'
import { nanoid } from 'nanoid'
import { EntityType } from 'src/utils/orm-type'
import { sendToWorker, workerMessagesHandler } from 'src/utils/worker-base'
import { getEmptyPromise } from 'src/utils/promise'
import { logWarn } from 'src/utils/logger'

import type { AppEntityNames, EntityTypesMap } from './types'
import { QueryOptions } from './utils/serialize.base'
import { transformQueryObjectToBridgeJSON } from './utils/serialize.main'
import { WorkerExecutionType } from './utils/bridge.base'
import { worker } from './worker'

const refProcesses: Map<
  string,
  {
    promise: Promise<unknown>
    resolve: unknown
    reject: (reason?: unknown) => void
  }
> = new Map()

const handleWorkerMessages = (
  event: MessageEvent<{ messageId: string; type: string; payload: unknown }>,
) => {
  return workerMessagesHandler<
    { messageId: string; type: string; payload: unknown },
    typeof refProcesses
  >(event, refProcesses, {
    onWorkerInit: () => {
      // TODO: database is ready
    },
  })
}

export const initDatabase = async () => {
  if (worker) {
    worker.removeEventListener('message', handleWorkerMessages)
  }
  worker.addEventListener('message', handleWorkerMessages)
}

const createProcessPromise = () => {
  // Generate a unique key for the process
  const messageId = nanoid()
  const promiseInfo = getEmptyPromise()
  refProcesses.set(messageId, {
    promise: promiseInfo.promise,
    resolve: promiseInfo.resolve,
    reject: promiseInfo.reject,
  })

  return {
    promise: promiseInfo.promise,
    messageId,
  }
}

const repositoryExecute = async <T>(
  entity: string | T,
  action: string,
  data?: QueryOptions<T> | SaveOptions | UpdateOptions,
) => {
  let messageId = ''
  try {
    if (!worker) {
      throw new Error('Worker not initialized')
    }

    const response = createProcessPromise()
    messageId = response.messageId
    sendToWorker(worker, WorkerExecutionType.REPOSITORY_EXECUTE, messageId, [entity, action, data])
    return response.promise
  } catch (err) {
    logWarn(`Error executing ${WorkerExecutionType.REPOSITORY_EXECUTE} action:`, err)
    if (messageId) {
      refProcesses.delete(messageId)
    }
    throw err
  }
}

export const rawQuery = async (query: string, params?: (string | number | boolean)[]) => {
  let messageId = ''
  try {
    if (!worker) {
      throw new Error('Worker not initialized')
    }

    const response = createProcessPromise()
    messageId = response.messageId
    sendToWorker(worker, WorkerExecutionType.RAW_QUERY_EXECUTE, messageId, [query, params])
    return response.promise
  } catch (err) {
    logWarn(`Error executing ${WorkerExecutionType.RAW_QUERY_EXECUTE} action:`, err)
    if (messageId) {
      refProcesses.delete(messageId)
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

initDatabase()
