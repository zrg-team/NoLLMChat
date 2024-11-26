import { NodeProps } from '@xyflow/react'
import { JSONLData } from 'src/services/database/types'

export type JSONLDataNodeData = { entity: JSONLData }
export type JSONLDataNodeProps = Omit<NodeProps, 'data'> & {
  data: JSONLDataNodeData
}
