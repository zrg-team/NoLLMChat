import { NodeProps } from '@xyflow/react'
import { Message } from 'src/services/database/types'

export type MessageNodeData = { entity: Message; content: string; loading: boolean }
export type MessageNodeProps = Omit<NodeProps, 'data'> & {
  data: MessageNodeData
}
