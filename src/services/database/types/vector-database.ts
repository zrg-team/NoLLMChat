export enum VectorDatabaseTypeEnum {
  Local = 'local',
  Remote = 'remote',
}

export enum VectorDatabaseProviderEnum {
  Voy = 'voy',
  Memory = 'memory',
}

export enum VectorDatabaseStorageEnum {
  DataNode = 'DataNode',
  DatabaseNode = 'DatabaseNode',
  IndexedDB = 'IndexedDB',
}

export type VectorDatabaseNodeDataSource = 'CSVData' | 'JSONData' | 'JSONLData'
