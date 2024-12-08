import { Schema } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type SchemaNodeProps = DefaultNodeProps<{ entity: Schema; loaded?: boolean }>
