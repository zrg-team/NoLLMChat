import { CSVData } from 'src/services/database/types'
import { DefaultNodeProps } from 'src/utils/flow-node'

export type CSVDataNodeProps = DefaultNodeProps<{ entity: CSVData }>
