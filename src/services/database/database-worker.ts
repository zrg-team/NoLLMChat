// import 'reflect-metadata'
import './database-worker-polyfill'
import { DataSource, FindManyOptions, ObjectLiteral } from 'typeorm'
import initSqlJs from 'sql.js'
import wasm from 'sql.js/dist/sql-wasm.wasm?url'
import localforage from 'localforage'

import { entitiesMap } from './entities'
import { QueryOptions } from './utils/serialize.base'
import { transformBridgeJSONObjectToQuery } from './utils/serialize.worker'
import { WorkerExecutionType } from './utils/bridge.base'

let appDataSource: DataSource | undefined
let initProcess: Promise<void> | undefined

const init = async () => {
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
    logging: ['query', 'error'],
    useLocalForage: true,
    autoSaveCallback: injectedData
      ? (data: unknown) => {
          localforage.setItem('injected_db', data)
        }
      : undefined,
    synchronize: true,
    logger: 'debug',
    entitySkipConstructor: true,
  })
  await appDataSource.initialize()
  initProcess = undefined
}

const getRepositoryAction = async (
  entity: string,
  action: string,
  data: QueryOptions<ObjectLiteral>,
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

self.onmessage = async (event) => {
  const { key, type, payload } = event.data
  if (!key) {
    console.error('No key provided in message')
    return self.postMessage({ key, type, error: 'No key provided in message' })
  }
  switch (type) {
    case WorkerExecutionType.INIT:
      try {
        if (appDataSource || initProcess) {
          return self.postMessage({
            key,
            type: WorkerExecutionType.INIT,
            result: 'Database already initialized',
          })
        }
        initProcess = init()
        await initProcess
        initProcess = undefined
        self.postMessage({ key, type: WorkerExecutionType.INIT, result: 'Database initialized' })
      } catch (error) {
        console.error('[INIT] Error initializing database: ', error)
        self.postMessage({ key, type: WorkerExecutionType.INIT, error: error })
      }
      break
    case WorkerExecutionType.REPOSITORY_EXECUTE:
      if (initProcess) {
        await initProcess
      }
      if (!appDataSource) {
        self.postMessage({
          key,
          type: WorkerExecutionType.REPOSITORY_EXECUTE,
          error: 'Database not initialized',
        })
        return
      }
      try {
        const { entity, action, data } = payload

        const result = await getRepositoryAction(entity, action, data)
        self.postMessage({ key, type: WorkerExecutionType.REPOSITORY_EXECUTE, result })
      } catch (error) {
        console.error('[REPOSITORY-EXECUTE] Error: ', error)
        self.postMessage({
          key,
          type: WorkerExecutionType.REPOSITORY_EXECUTE,
          error,
          context: payload,
        })
      }
      break
    case WorkerExecutionType.RAW_QUERY_EXECUTE:
      if (initProcess) {
        await initProcess
      }
      if (!appDataSource) {
        self.postMessage({
          key,
          type: WorkerExecutionType.RAW_QUERY_EXECUTE,
          error: 'Database not initialized',
        })
        return
      }
      try {
        const { query, params } = payload

        const result = await appDataSource.query(query, params)
        self.postMessage({ key, type: WorkerExecutionType.RAW_QUERY_EXECUTE, result })
      } catch (error) {
        console.error('[RAW-QUERY-EXECUTE] Error: ', error)
        self.postMessage({
          key,
          type: WorkerExecutionType.RAW_QUERY_EXECUTE,
          error,
          context: payload,
        })
      }
      break
    default:
      console.error(`Unknown message type: ${type}`)
      self.postMessage({ key, type, error: `Unknown message type: ${type}`, context: payload })
  }
}
