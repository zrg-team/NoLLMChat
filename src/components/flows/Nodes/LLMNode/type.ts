import { LLM, LLMStatusEnum } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type LLMNodeProps = DefaultNodeProps<{ label?: string; entity: LLM; status: LLMStatusEnum }>
