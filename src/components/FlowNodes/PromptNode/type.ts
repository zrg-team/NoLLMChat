import { NodeProps } from '@xyflow/react'
import { Prompt } from 'src/services/database/types'

export type PromptNodeData = { entity: Prompt }
export type PromptNodeProps = Omit<NodeProps, 'data'> & { data: PromptNodeData }
