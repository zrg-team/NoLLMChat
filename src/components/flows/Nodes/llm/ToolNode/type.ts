import { ToolDefinition } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type ToolNodeProps = DefaultNodeProps<{ entity: ToolDefinition }>
