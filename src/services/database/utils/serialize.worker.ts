import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  Equal,
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
import { isFindOperator, isPlainObject, QueryOptions } from './serialize.base'

export const reconstructFindOperator = (obj: { value: unknown[] | unknown }) => {
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

export const transformBridgeJSONObjectToQuery = (
  data?: QueryOptions<ObjectLiteral>,
): QueryOptions<ObjectLiteral> => {
  if (data === undefined || data === null || typeof data === 'string' || typeof data === 'number') {
    return data as QueryOptions<ObjectLiteral>
  }

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map((item) =>
        transformBridgeJSONObjectToQuery(item),
      ) as QueryOptions<ObjectLiteral>
    }

    const transformed: Record<string, unknown> = {}
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]

      if (isFindOperator(value)) {
        transformed[key] = reconstructFindOperator(value)
      } else if (value && typeof value === 'object' && value !== null) {
        transformed[key] = transformBridgeJSONObjectToQuery(value)
      } else {
        transformed[key] = value
      }
    })

    return transformed as QueryOptions<ObjectLiteral>
  }

  return data as QueryOptions<ObjectLiteral>
}
