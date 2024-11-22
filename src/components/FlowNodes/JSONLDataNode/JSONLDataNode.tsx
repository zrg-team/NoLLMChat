import { memo, useMemo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'src/lib/shadcn/ui/pagination'

import { JSONLDataNodeProps } from './type'
import { Card, CardContent, CardHeader } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/string-data'
import { Label } from 'src/lib/shadcn/ui/label'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { FlowNodeTypeEnum } from 'src/services/database/types'

const SHOW_LIMIT_NUMBER = 1
const SHOW_PER_PAGE = 10
export const JSONLDataNode = memo((props: JSONLDataNodeProps) => {
  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 1,
  })
  const { id, data, isConnectable } = props

  const jsonl = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    const lines = decodeLine(data.entity.jsonl)
    setPagination({
      page: 1,
      maxPage: Math.ceil(lines.length / SHOW_PER_PAGE),
    })
    return {
      headers: decodeSplitter(data.entity.headers || ''),
      rows: lines.map((row) => JSON.parse(row)),
    }
  }, [data?.entity])

  const showingRows = useMemo(() => {
    return jsonl.rows.slice((pagination.page - 1) * SHOW_PER_PAGE, pagination.page * SHOW_PER_PAGE)
  }, [jsonl.rows, pagination.page])

  const renderPagination = useMemo(() => {
    let renderLeftEllipsis = false
    let renderRightEllipsis = false
    return (
      <Pagination className="tw-mt-4">
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
    <div className="tw-min-w-80">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card className="tw-min-w-32 tw-min-h-16 tw-p-4">
          <CardHeader className="!tw-p-0">
            <div className="tw-pt-2 tw-flex !tw-flex-row">
              <LazyIcon name="file-json" className="tw-mr-2" />
              <Label className="!tw-font-medium tw-leading-none tw-tracking-tight tw-pr-8">
                {FlowNodeTypeEnum.JSONLData}{' '}
                {showingRows?.length && jsonl?.rows?.length
                  ? `(${showingRows?.length || 0} / ${jsonl?.rows?.length || 0})`
                  : ''}
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {showingRows?.map((row, index) => {
                return (
                  <AccordionItem key={`${index}`} value={`${index}`}>
                    <AccordionTrigger>{`${row.content}`.substring(0, 32)}...</AccordionTrigger>
                    <AccordionContent>
                      <pre>{row.content}</pre>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
            {renderPagination}
          </CardContent>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
