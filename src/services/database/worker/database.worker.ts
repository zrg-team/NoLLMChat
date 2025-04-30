import { DataSource, FindManyOptions, ObjectLiteral } from 'typeorm'

import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp'
import { vector } from '@electric-sql/pglite/vector'
import { DATABASE_LOG_CONFIG } from 'src/constants/dev'
import { logDebug, logError, logInfo } from 'src/utils/logger'
import { PGliteDriver } from 'src/lib/typeorm-pglite-browser'
import { BaseMessagePayload, init, listenForMessages } from 'src/utils/worker-base'

import { entitiesMap } from '../entities'
import { QueryOptions } from '../utils/serialize.base'
import { transformBridgeJSONObjectToQuery } from '../utils/serialize.worker'
import { AppEntityNames } from '../types'
import { WorkerExecutionType } from '../utils/bridge.base'

import { EnablePGVector1742763753765 } from '../migrations/enable-pgvector-1742763753765'
import { PGlite } from '@electric-sql/pglite'

const SERVICE_NAME = 'DATABASE_WORKER'
let appDataSource: DataSource | undefined
let initProcess: Promise<void> | undefined
const pgLiteInstance = new PGlite({
  dataDir: 'idb://local-db',
  extensions: { uuid_ossp, vector },
})

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
  | {
      type: WorkerExecutionType.PGLITE_QUERY_EXECUTE
      payload: [string, Record<string, unknown>[]]
    }
) &
  BaseMessagePayload

const initDatabase = async () => {
  appDataSource = new DataSource({
    type: 'postgres',
    driver: new PGliteDriver(undefined, pgLiteInstance).driver,
    entities: Object.values(entitiesMap),
    logging: [...DATABASE_LOG_CONFIG.logging],
    synchronize: true,
    logger: DATABASE_LOG_CONFIG.logger,
    entitySkipConstructor: true,
  })

  if (!appDataSource) {
    throw new Error('Database not initialized')
  }

  await appDataSource.initialize()
  // Await manual migrations
  const manualMigrationRunner = appDataSource.createQueryRunner()
  try {
    await manualMigrationRunner.startTransaction('SERIALIZABLE')
    const runEnablePGVector = new EnablePGVector1742763753765()
    await runEnablePGVector.up(manualMigrationRunner)
    await manualMigrationRunner.commitTransaction()
    logDebug('Migration completed')
  } catch (error) {
    logError('Manual migrations failed', error)
    await manualMigrationRunner.rollbackTransaction()
  }

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

async function handlePayload(data: DatabasePayload) {
  const messageId = data.messageId
  if (!messageId || !Object.keys(data).length) {
    return
  }
  logDebug(`[${SERVICE_NAME}][Database worker received message]`, data, data.type)
  switch (data.type) {
    case WorkerExecutionType.INIT: {
      if (appDataSource || initProcess) {
        return 'Database already initialized'
      }
      initProcess = init(SERVICE_NAME)
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
    case WorkerExecutionType.PGLITE_QUERY_EXECUTE: {
      if (initProcess) {
        await initProcess
      }
      if (!pgLiteInstance) {
        throw new Error('Database not initialized')
      }
      const [query, params] = data.payload
      return pgLiteInstance.query(query, params)
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<DatabasePayload>(SERVICE_NAME, handlePayload)

logInfo('Database worker initialized')

init(SERVICE_NAME, async () => {
  initProcess = initDatabase()
})
