export type ParameterSchama = {
  name: string
  description: string
  required: boolean
  enum?: string[]
  type: 'string' | 'number' | 'boolean'
}
