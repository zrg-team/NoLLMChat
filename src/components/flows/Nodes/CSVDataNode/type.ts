import { NodeProps } from '@xyflow/react'
import { CSVData } from 'src/services/database/types'

export type CSVDataNodeData = { entity: CSVData }
export type CSVDataNodeProps = Omit<NodeProps, 'data'> & {
  data: CSVDataNodeData
}
