import { NodeProps } from '@xyflow/react'
import { FlowNodePlaceholder } from 'src/services/database/types'

export type PlaceholderNodeData = { entity: FlowNodePlaceholder }
export type PlaceholderNodeProps = Omit<NodeProps, 'data'> & { data: PlaceholderNodeData }
