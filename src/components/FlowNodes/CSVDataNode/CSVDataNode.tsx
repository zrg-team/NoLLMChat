import { memo, useMemo, useState } from 'react'
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'src/lib/shadcn/ui/pagination'

import { Card, CardContent, CardHeader } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/string-data'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Label } from 'src/lib/shadcn/ui/label'
import { FlowNodeTypeEnum } from 'src/services/database/types'

const SHOW_LIMIT_NUMBER = 1
const SHOW_PER_PAGE = 10
export const CSVDataNode = memo((props: CSVDataNodeProps) => {
  const { id, data, isConnectable } = props
  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 1,
  })

  const csv = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    const lines = decodeLine(data.entity.csv)

    setPagination({
      page: 1,
      maxPage: Math.ceil(lines.length / SHOW_PER_PAGE),
    })

    return {
      headers: decodeSplitter(data.entity.headers),
      rows: lines.map((row) => decodeSplitter(row)),
    }
  }, [data?.entity])

  const showingRows = useMemo(() => {
    return csv.rows.slice((pagination.page - 1) * SHOW_PER_PAGE, pagination.page * SHOW_PER_PAGE)
  }, [csv.rows, pagination.page])

  const renderPagination = useMemo(() => {
    let renderLeftEllipsis = false
    let renderRightEllipsis = false
    return (
      <Pagination className="tw-mt-4 tw-mb-4 tw-ml-4 tw-mr-4 tw-w-full">
        <PaginationContent>
          {pagination.page > 1 ? (
            <PaginationItem
              onClick={() => setPagination((pre) => ({ ...pre, page: pre.page - 1 }))}
            >
              <PaginationPrevious />
            </PaginationItem>
          ) : null}
          {Array.from({ length: pagination.maxPage }, (_, index) => {
            const page = index + 1

            const isHardShow = index === 0 || index === pagination.maxPage - 1
            if (!isHardShow && page > pagination.page + SHOW_LIMIT_NUMBER && renderRightEllipsis) {
              return null
            } else if (!isHardShow && page > pagination.page + SHOW_LIMIT_NUMBER) {
              renderRightEllipsis = true
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            if (!isHardShow && page < pagination.page - SHOW_LIMIT_NUMBER && renderLeftEllipsis) {
              return null
            } else if (!isHardShow && page < pagination.page - SHOW_LIMIT_NUMBER) {
              renderLeftEllipsis = true
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem
                key={index}
                onClick={() => setPagination((pre) => ({ ...pre, page }))}
              >
                <PaginationLink isActive={index + 1 === pagination.page}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          })}
          {pagination.page < pagination.maxPage ? (
            <PaginationItem
              onClick={() => setPagination((pre) => ({ ...pre, page: pre.page + 1 }))}
            >
              <PaginationNext />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    )
  }, [pagination])

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card className="tw-min-w-32 tw-min-h-16 tw-p-4">
          <CardHeader className="!tw-p-0">
            <div className="tw-pt-2 tw-flex !tw-flex-row">
              <LazyIcon name="file-spreadsheet" className="tw-mr-2" />
              <Label className="!tw-font-medium tw-leading-none tw-tracking-tight tw-pr-8">
                {FlowNodeTypeEnum.CSVData}{' '}
                {showingRows?.length && csv?.rows?.length
                  ? `(${showingRows?.length || 0} / ${csv?.rows?.length || 0})`
                  : ''}
              </Label>
            </div>
          </CardHeader>
          <CardContent>
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
                {showingRows?.length
                  ? showingRows?.map((item, index) => (
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
            {renderPagination}
          </CardContent>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
