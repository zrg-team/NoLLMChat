import { VectorDatabaseProviderEnum, VectorDatabaseStorageEnum } from 'src/services/database/types'

export const SUPPORTED_VECTOR_DATABASE_PROVIDERS = [VectorDatabaseProviderEnum.Memory]

export const SUPPORTED_VECTOR_DATABASE_SOURCE_TYPE = [VectorDatabaseStorageEnum.DataNode]

export const SUPPORTED_TEXT_SPLITTERS = [
  'TokenTextSplitter',
  'CharacterTextSplitter',
  'RecursiveCharacterTextSplitter',
]
