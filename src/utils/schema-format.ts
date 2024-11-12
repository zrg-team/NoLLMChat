import z, { ZodTypeAny } from 'zod'
import { SchemaItem } from 'src/services/database/types'

export const convertToTypeScriptInterface = (data: SchemaItem[]): string => {
  const generateInterfaceString = (items: SchemaItem[], parentId: string | null = null): string => {
    let interfaceString = '{\n'

    items
      .filter((item) => item.parent_id === parentId)
      .forEach((item) => {
        if (item.type === 'object') {
          const nestedItems = data.filter((nestedItem) => nestedItem.parent_id === item.id)
          const nestedInterface = generateInterfaceString(nestedItems, item.id)
          interfaceString += `  ${item.name}${item.required ? '' : '?'}: ${nestedInterface}\n`
        } else {
          interfaceString += `  // ${item.description || ''}\n  ${item.name}${item.required ? '' : '?'}: ${item.type};\n`
        }
      })

    interfaceString += '}'
    return interfaceString
  }

  return generateInterfaceString(data)
}

export const convertToJSON = (data: SchemaItem[]): string => {
  const generateSchemaString = (items: SchemaItem[], parentId: string | null = null): string => {
    let schemaString = ''

    items
      .filter((item) => item.parent_id === parentId)
      .forEach((item) => {
        if (item.type === 'object') {
          const nestedSchema = generateSchemaString(items, item.id)
          schemaString += `    "${item.name}": ${nestedSchema},\n`
        } else {
          schemaString += `    "${item.name}": { "required": ${item.required}, "explain": "${item.description}", "type": "${item.type}" },\n`
        }
      })

    return schemaString
  }

  let schemaString = '{\n'

  schemaString += generateSchemaString(data)

  schemaString += '}'
  return schemaString
}

export const convertToZodSchemaString = (data: SchemaItem[]): string => {
  const generateSchemaString = (items: SchemaItem[], parentId: string | null = null): string => {
    let schemaString = ''

    items
      .filter((item) => item.parent_id === parentId)
      .forEach((item) => {
        if (item.type === 'object') {
          const nestedSchema = generateSchemaString(items, item.id)
          schemaString += `    ${item.name}: z.object({\n${nestedSchema}    })${item.required ? '' : '.optional()'}.describe('${item.description || ''}'),\n`
        } else {
          schemaString += `    ${item.name}: z.${item.type}()${item.required ? '' : '.optional()'}.describe('${item.description || ''}'),\n`
        }
      })

    return schemaString
  }

  let schemaString = 'const schema = z.object({\n'

  schemaString += generateSchemaString(data)

  schemaString += '});'
  return schemaString
}

export const convertToZodSchema = (data: SchemaItem[]) => {
  const schemaObject: { [key: string]: ZodTypeAny } = {}

  const typeMap: { [key in Exclude<SchemaItem['type'], 'object' | 'array'>]: () => ZodTypeAny } = {
    string: z.string,
    number: z.number,
    boolean: z.boolean,
    enum: () => z.enum(['']),
  }

  data.forEach((item) => {
    if (!item.parent_id) {
      if (item.type === 'object') {
        const nestedItems = data.filter((nestedItem) => nestedItem.parent_id === item.id)
        const nestedSchemaObject: { [key: string]: ZodTypeAny } = {}
        nestedItems.forEach((nestedItem) => {
          if (nestedItem.type === 'object' || nestedItem.type === 'array') {
            return
          }
          nestedSchemaObject[nestedItem.name] = typeMap[nestedItem.type]()
          if (!nestedItem.required) {
            nestedSchemaObject[nestedItem.name] = nestedSchemaObject[nestedItem.name].optional()
          }
        })
        schemaObject[item.name] = z.object(nestedSchemaObject)
        if (!item.required) {
          schemaObject[item.name] = schemaObject[item.name].optional()
        }
      } else if (item.type === 'array') {
        schemaObject[item.name] = z.array(z.string())
        if (!item.required) {
          schemaObject[item.name] = schemaObject[item.name].optional()
        }
      } else if (item.type === 'enum') {
        schemaObject[item.name] = z.enum((item.enum || '').split(',') as [string, ...string[]]) // Replace with actual enum values
        if (!item.required) {
          schemaObject[item.name] = schemaObject[item.name].optional()
        }
      } else {
        schemaObject[item.name] = typeMap[item.type]()
        if (!item.required) {
          schemaObject[item.name] = schemaObject[item.name].optional()
        }
      }
    }
  })

  return z.object(schemaObject)
}
