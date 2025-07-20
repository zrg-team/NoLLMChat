import { Mcp } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type McpNodeProps = DefaultNodeProps<{
  entity: Mcp
  loaded?: boolean
  tools?: { name: string; description: string; schema: unknown }[]
  error?: string
}>
