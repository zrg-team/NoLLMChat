import { Thread } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type ThreadNodeProps = DefaultNodeProps<{ entity: Thread }>
