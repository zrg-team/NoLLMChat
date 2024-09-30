// import 'reflect-metadata'
import './database-worker-polyfill'
import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  DataSource,
  Equal,
  FindManyOptions,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  Raw,
} from 'typeorm'
import initSqlJs from 'sql.js'
import wasm from 'sql.js/dist/sql-wasm.wasm?url'
import localforage from 'localforage'
import { QueryOptions, isFindOperator, isPlainObject } from './utils/query'

import { entitiesMap } from './entities/entry'

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
    location: injectedData ? undefined : 'swef_db',
    logging: ['query', 'schema'],
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

const reconstructFindOperator = (obj: { value: unknown[] | unknown }) => {
  if (isPlainObject(obj) && isFindOperator(obj)) {
    switch (obj.type) {
      case 'moreThan':
        return MoreThan(obj.value)
      case 'lessThan':
        return LessThan(obj.value)
      case 'equal':
        return Equal(obj.value)
      case 'like':
        return Like(obj.value)
      case 'in':
        return In(obj.value as unknown[])
      case 'not':
        return Not(obj.value)
      case 'isNull':
        return IsNull()
      case 'between':
        return Between((obj.value as unknown[])[0], (obj.value as unknown[])[1])
      case 'lessThanOrEqual':
        return LessThanOrEqual(obj.value)
      case 'moreThanOrEqual':
        return MoreThanOrEqual(obj.value)
      case 'any':
        return Any(obj.value as unknown[])
      case 'arrayContainedBy':
        return ArrayContainedBy(obj.value as unknown[])
      case 'arrayContains':
        return ArrayContains(obj.value as unknown[])
      case 'arrayOverlap':
        return ArrayOverlap(obj.value as unknown[])
      case 'raw':
        return Raw(`${obj.value}`)
      // Add other FindOperator types as needed
      default:
        throw new Error(`Unsupported FindOperator type: ${obj.type}`)
    }
  }
  return obj
}

const transformJSONObjectToQuery = (
  data?: QueryOptions<ObjectLiteral>,
): QueryOptions<ObjectLiteral> => {
  if (data === undefined || data === null || typeof data === 'string' || typeof data === 'number') {
    return data as QueryOptions<ObjectLiteral>
  }

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map((item) => transformJSONObjectToQuery(item)) as QueryOptions<ObjectLiteral>
    }

    const transformed: Record<string, unknown> = {}
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]

      if (isFindOperator(value)) {
        transformed[key] = reconstructFindOperator(value)
      } else if (value && typeof value === 'object' && value !== null) {
        transformed[key] = transformJSONObjectToQuery(value)
      } else {
        transformed[key] = value
      }
    })

    return transformed as QueryOptions<ObjectLiteral>
  }

  return data as QueryOptions<ObjectLiteral>
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
        .find(transformJSONObjectToQuery(data) as FindManyOptions)
    case 'findOne':
      return appDataSource
        .getRepository(entitiesMap[entity])
        .findOne(transformJSONObjectToQuery(data) as ObjectLiteral)
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
    case 'init':
      try {
        if (appDataSource || initProcess) {
          return self.postMessage({ key, type: 'init', result: 'Database already initialized' })
        }
        initProcess = init()
        await initProcess
        initProcess = undefined
        self.postMessage({ key, type: 'init', result: 'Database initialized' })
      } catch (error) {
        console.error('[INIT] Error initializing database: ', error)
        self.postMessage({ key, type: 'init', error: error })
      }
      break
    case 'repository-execute':
      if (initProcess) {
        await initProcess
      }
      if (!appDataSource) {
        self.postMessage({ key, type: 'repository-execute', error: 'Database not initialized' })
        return
      }
      try {
        const { entity, action, data } = payload

        const result = await getRepositoryAction(entity, action, data)
        self.postMessage({ key, type: 'repository-execute', result })
      } catch (error) {
        console.error('[REPOSITORY-EXECUTE] Error: ', error)
        self.postMessage({ key, type: 'repository-execute', error, context: payload })
      }
      break
    default:
      console.error(`Unknown message type: ${type}`)
  }
}
