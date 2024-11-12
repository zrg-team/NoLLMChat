import { NodeProps } from '@xyflow/react'
import { ToolDefinition } from 'src/services/database/types'

export type ToolNodeData = { entity: ToolDefinition }
export type ToolNodeProps = Omit<NodeProps, 'data'> & { data: ToolNodeData }
