import { NodeProps } from '@xyflow/react'
import { Thread } from 'src/services/database/types'

export type ThreadNodeData = { entity: Thread }
export type ThreadNodeProps = Omit<NodeProps, 'data'> & { data: ThreadNodeData }
