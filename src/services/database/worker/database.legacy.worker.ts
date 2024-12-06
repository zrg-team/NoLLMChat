// import 'reflect-metadata'
import './database-polyfill.worker'
import { DataSource, FindManyOptions, ObjectLiteral } from 'typeorm'
// @ts-expect-error - This is legacy
import initSqlJs from 'sql.js'
import wasm from 'sql.js/dist/sql-wasm.wasm?url'
import localforage from 'localforage'

import { DATABASE_LOG_CONFIG } from 'src/constants/dev'
import { logDebug, logInfo } from 'src/utils/logger'
import { BaseMessagePayload, init, listenForMessages } from 'src/utils/worker-base'

import { entitiesMap } from '../entities'
import { QueryOptions } from '../utils/serialize.base'
import { transformBridgeJSONObjectToQuery } from '../utils/serialize.worker'
import { AppEntityNames } from '../types'
import { WorkerExecutionType } from '../utils/bridge.base'

let appDataSource: DataSource | undefined
let initProcess: Promise<void> | undefined

const initDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: () => wasm,
  })
  const injectedData = (await localforage.getItem('injected_db')) as Uint8Array
  appDataSource = new DataSource({
    type: 'sqljs',
    database: injectedData ? injectedData : undefined,
    driver: SQL,
    autoSave: true,
    entities: Object.values(entitiesMap),
    location: injectedData ? undefined : 'db',
    logging: [...DATABASE_LOG_CONFIG.logging],
    useLocalForage: true,
    autoSaveCallback: injectedData
      ? (data: unknown) => {
          localforage.setItem('injected_db', data)
        }
      : undefined,
    synchronize: false,
    logger: DATABASE_LOG_CONFIG.logger,
    entitySkipConstructor: true,
  })
  await appDataSource.initialize()
  initProcess = undefined
  logDebug('Database initialized with log config:', DATABASE_LOG_CONFIG)
}

const getRepositoryAction = async (
  entity: string,
  action: string,
  data: QueryOptions<ObjectLiteral> | QueryOptions<ObjectLiteral[]>,
) => {
  if (!appDataSource) {
    throw new Error('Database not initialized')
  }
  if (!entitiesMap[entity]) {
    throw new Error(`Entity not found: ${entity}`)
  }
  switch (action) {
    case 'find':
      return appDataSource
        .getRepository(entitiesMap[entity])
        .find(transformBridgeJSONObjectToQuery(data) as FindManyOptions)
    case 'findOne':
      return appDataSource
        .getRepository(entitiesMap[entity])
        .findOne(transformBridgeJSONObjectToQuery(data) as ObjectLiteral)
    case 'count':
      return appDataSource
        .getRepository(entitiesMap[entity])
        .count(transformBridgeJSONObjectToQuery(data) as FindManyOptions)
    case 'save':
      return appDataSource.getRepository(entitiesMap[entity]).save(data as ObjectLiteral)
    case 'update':
      if (typeof data !== 'object' || !('id' in data) || !('update' in data)) {
        throw new Error('Invalid data for update')
      }
      return appDataSource
        .getRepository(entitiesMap[entity])
        .update(data.id, data.update as ObjectLiteral)
    case 'delete':
      if (typeof data !== 'string' && typeof data !== 'number') {
        throw new Error('Invalid data for delete')
      }
      return appDataSource.getRepository(entitiesMap[entity]).delete(data)
    default:
      throw new Error(`Unknown action: ${action}`)
  }
}

type DatabasePayload = (
  | {
      type: WorkerExecutionType.INIT
      payload: unknown
    }
  | {
      type: WorkerExecutionType.REPOSITORY_EXECUTE
      payload: [AppEntityNames, string, QueryOptions<ObjectLiteral> | QueryOptions<ObjectLiteral[]>]
    }
  | {
      type: WorkerExecutionType.RAW_QUERY_EXECUTE
      payload: Parameters<DataSource['query']>
    }
) &
  BaseMessagePayload

async function handlePayload(data: DatabasePayload) {
  const messageId = data.messageId
  if (!messageId) {
    return
  }
  logDebug('Database worker received message:', data)
  switch (data.type) {
    case WorkerExecutionType.INIT: {
      if (appDataSource || initProcess) {
        return 'Database already initialized'
      }
      initProcess = init()
      await initProcess
      initProcess = undefined

      return 'Database initialized'
    }
    case WorkerExecutionType.REPOSITORY_EXECUTE: {
      if (initProcess) {
        await initProcess
      }
      if (!appDataSource) {
        throw new Error('Database not initialized')
      }
      const [entity, action, options] = data.payload
      return getRepositoryAction(entity, action, options)
    }
    case WorkerExecutionType.RAW_QUERY_EXECUTE: {
      if (initProcess) {
        await initProcess
      }
      if (!appDataSource) {
        throw new Error('Database not initialized')
      }

      return appDataSource.query(...data.payload)
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<DatabasePayload>(handlePayload)

logInfo('Database worker initialized')

init(async () => {
  initProcess = initDatabase()
})
