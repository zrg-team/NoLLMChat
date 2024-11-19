export type SchemaItemType = {
  id?: string
  name: string
  description: string
  required: boolean
  enum?: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'enum'
  data?: SchemaItemType[]
  parent?: string
}
