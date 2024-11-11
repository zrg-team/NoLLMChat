import { NodeProps } from '@xyflow/react'
import { LLM, LLMStatusEnum } from 'src/services/database/types'

export type LLMNodeData = { label?: string; entity: LLM; status: LLMStatusEnum }
export type LLMNodeProps = Omit<NodeProps, 'data'> & {
  data: LLMNodeData
}
