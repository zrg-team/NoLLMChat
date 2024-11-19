import { memo, useMemo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/molecules/NodeHeader'

import { CSVDataNodeProps } from './type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/lib/shadcn/ui/table'
import { Card } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/csv-data'

export const CSVDataNode = memo((props: CSVDataNodeProps) => {
  const { id, data, isConnectable } = props

  const csv = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    return {
      headers: decodeSplitter(data.entity.headers),
      rows: decodeLine(data.entity.data).map((row) => decodeSplitter(row)),
    }
  }, [data?.entity])

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card>
          <Table className="tw-w-full">
            <TableHeader>
              <TableRow>
                {csv?.headers
                  ? csv?.headers.map((header) => (
                      <TableHead key={header}>
                        <div className="tw-font-bold">{header}</div>
                      </TableHead>
                    ))
                  : undefined}
              </TableRow>
            </TableHeader>
            <TableBody>
              {csv?.rows
                ? csv?.rows?.map((item, index) => (
                    <TableRow key={`${index}`}>
                      {item
                        ? item.map((cell, cellIndex) => (
                            <TableCell key={`${cellIndex}`} className="tw-p-4">
                              {cell}
                            </TableCell>
                          ))
                        : undefined}
                    </TableRow>
                  ))
                : undefined}
            </TableBody>
          </Table>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
