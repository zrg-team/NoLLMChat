import { NodeProps } from '@xyflow/react'

export type EmbeddingNodeData = { model: string }
export type EmbeddingNodeProps = Omit<NodeProps, 'data'> & { data: EmbeddingNodeData }
