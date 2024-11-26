import { NodeProps } from '@xyflow/react'
import { VectorDatabase } from 'src/services/database/types'

export type VectorDatabaseNodeData = { entity: VectorDatabase }
export type VectorDatabaseNodeProps = Omit<NodeProps, 'data'> & { data: VectorDatabaseNodeData }
