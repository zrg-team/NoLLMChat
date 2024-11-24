import { memo, useMemo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/molecules/NodeHeader'

import { JSONLDataNodeProps } from './type'
import { Card, CardContent, CardHeader } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/string-data'
import { Label } from 'src/lib/shadcn/ui/label'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { DataViewer } from 'src/components/molecules/Nodes/DataViewer'

const LIMIT_LENGTH_BY_COLUMNS = {
  embedding: 32,
}
export const JSONLDataNode = memo((props: JSONLDataNodeProps) => {
  const { id, data, isConnectable } = props

  const jsonl = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    const headers = decodeSplitter(data.entity.headers || '')
    const lines = decodeLine(data.entity.jsonl)
    return {
      headers,
      rows: lines.map((row) => {
        try {
          const data = JSON.parse(row)
          return data
        } catch {
          return []
        }
      }),
    }
  }, [data?.entity])

  return (
    <div className="min-w-80">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card className="min-w-32 min-h-16 p-4">
          <CardHeader className="!p-0">
            <div className="pt-2 flex !flex-row">
              <LazyIcon name="file-json" className="mr-2" />
              <Label className="!font-medium leading-none tracking-tight pr-8">
                {FlowNodeTypeEnum.JSONLData}{' '}
                {jsonl?.rows?.length ? `(${jsonl?.rows?.length || 0})` : ''}
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataViewer
              data={jsonl.rows}
              headers={jsonl.headers}
              limitLengthByColumns={LIMIT_LENGTH_BY_COLUMNS}
            />
          </CardContent>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
