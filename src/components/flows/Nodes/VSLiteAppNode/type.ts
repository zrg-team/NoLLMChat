import { NodeProps } from '@xyflow/react'
import { FlowNode } from 'src/services/database/types'

export type EditorAppNodeData = { flowNode: FlowNode }
export type EditorAppNodeProps = Omit<NodeProps, 'data'> & {
  data: EditorAppNodeData
}
