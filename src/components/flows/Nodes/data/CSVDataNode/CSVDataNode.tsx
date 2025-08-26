import { memo, useMemo } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { Card, CardContent, CardHeader } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/string-data'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Label } from 'src/lib/shadcn/ui/label'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { DataViewer } from 'src/components/molecules/Nodes/DataViewer'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { CSVDataNodeProps } from './type'

export const CSVDataNode = memo((props: CSVDataNodeProps) => {
  const { id, data, isConnectable } = props

  const csv = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    const lines = decodeLine(data.entity.csv)

    return {
      headers: decodeSplitter(data.entity.headers),
      rows: lines.map((row) => decodeSplitter(row)),
    }
  }, [data?.entity])

  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card className="min-w-32 min-h-16 p-4">
          <CardHeader className="!p-0">
            <div className="pt-2 flex !flex-row">
              <LazyIcon name="file-spreadsheet" className="mr-2" />
              <Label className="!font-medium leading-none tracking-tight pr-8">
                {FlowNodeTypeEnum.CSVData} {csv?.rows?.length ? `(${csv?.rows?.length || 0})` : ''}
              </Label>
            </div>
          </CardHeader>
          <CardContent className="pb-0">
            <DataViewer data={csv.rows} headers={csv.headers} />
          </CardContent>
        </Card>
      </div>
      <DefaultHandle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  )
})
