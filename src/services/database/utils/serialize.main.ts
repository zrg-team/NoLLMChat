import type { QueryOptions } from './serialize.base'
import { isFindOperator } from './serialize.base'

export const transformQueryObjectToBridgeJSON = <T>(data?: QueryOptions<T>): QueryOptions<T> => {
  if (data === undefined || data === null || typeof data === 'string' || typeof data === 'number') {
    return data as QueryOptions<T>
  }

  if (typeof data === 'object') {
    // Handle arrays separately
    if (Array.isArray(data)) {
      return data.map((item) => transformQueryObjectToBridgeJSON(item)) as QueryOptions<T>
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
        transformed[key] = transformQueryObjectToBridgeJSON(value)
      } else {
        transformed[key] = value
      }
    })

    return transformed as QueryOptions<T>
  }

  return data
}
