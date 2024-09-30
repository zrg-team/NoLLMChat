import type {
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  SaveOptions,
  UpdateOptions,
} from 'typeorm'

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

export const transformQueryObjectToJSON = <T>(data?: QueryOptions<T>): QueryOptions<T> => {
  if (data === undefined || data === null || typeof data === 'string' || typeof data === 'number') {
    return data as QueryOptions<T>
  }

  if (typeof data === 'object') {
    // Handle arrays separately
    if (Array.isArray(data)) {
      return data.map((item) => transformQueryObjectToJSON(item)) as QueryOptions<T>
    }

    const transformed: Record<string, unknown> = {}
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]

      if (isFindOperator(value)) {
        transformed[key] = {
          '@instanceof': 'FindOperator',
          // @ts-expect-error - This is a private property
          type: value.type,
          // @ts-expect-error - This is a private property
          value: value.value,
          // @ts-expect-error - This is a private property
          useParameter: value.useParameter,
          // @ts-expect-error - This is a private property
          multipleParameters: value.multipleParameters,
          // @ts-expect-error - This is a private property
          getSql: typeof value.getSql === 'function' ? value.getSql.toString() : undefined,
          // @ts-expect-error - This is a private property
          objectLiteralParameters: value.objectLiteralParameters,
        }
      } else if (value && typeof value === 'object' && value !== null) {
        transformed[key] = transformQueryObjectToJSON(value)
      } else {
        transformed[key] = value
      }
    })

    return transformed as QueryOptions<T>
  }

  return data
}
