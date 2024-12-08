import { Message } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type MessageNodeProps = DefaultNodeProps<{
  entity: Message
  content: string
  loading: boolean
}>
