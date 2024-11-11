import { NodeProps } from '@xyflow/react'
import { Schema } from 'src/services/database/types'

export type SchemaNodeData = { entity: Schema; loaded?: boolean }
export type SchemaNodeProps = Omit<NodeProps, 'data'> & { data: SchemaNodeData }
