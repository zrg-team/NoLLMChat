import { JSONLData } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type JSONLDataNodeProps = DefaultNodeProps<{ entity: JSONLData }>
