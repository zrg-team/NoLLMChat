import type { FlowNodePlaceholder } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type EmbeddingNodeProps = DefaultNodeProps<{ model: string; entity: FlowNodePlaceholder }>
