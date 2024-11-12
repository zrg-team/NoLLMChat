import type { FindOperator } from '../typeorm-wrapper'
import type {
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
  UpdateOptions,
} from '../typeorm-wrapper'

export type QueryOptions<T> =
  | T
  | string
  | number
  | FindManyOptions<T>
  | FindOneOptions<T>
  | SaveOptions
  | UpdateOptions

export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

export const isFindOperator = (value: unknown): value is FindOperator<unknown> => {
  return !!value && typeof value === 'object' && 'type' in value && '@instanceof' in value
}
