import { memo, useEffect, useMemo, useState } from 'react'

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
import { useModal } from '@ebay/nice-modal-react'
import ViewDataDetailDialog from 'src/components/molecules/dialogs/ViewDataDetailDialog'
import LazyIcon from 'src/components/atoms/LazyIcon'

export const DataViewer = memo(
  (props: {
    headers: string[]
    data: string[][]
    paginationShowLimit?: number
    showPerPage?: number
    limitLengthByColumns?: Record<string, number>
    contentLengthLimit?: number
  }) => {
    const {
      data,
      headers,
      limitLengthByColumns,
      showPerPage = 7,
      paginationShowLimit = 1,
      contentLengthLimit = 64,
    } = props
    const [pagination, setPagination] = useState({
      page: 1,
      maxPage: 1,
    })
    const viewDetailDialog = useModal(ViewDataDetailDialog)

    useEffect(() => {
      setPagination((pre) => ({
        ...pre,
        maxPage: Math.ceil(data.length / showPerPage),
      }))
    }, [data.length, showPerPage])

    const showingRows = useMemo(() => {
      return data.slice((pagination.page - 1) * showPerPage, pagination.page * showPerPage)
    }, [data, pagination.page, showPerPage])

    const renderPagination = useMemo(() => {
      let renderLeftEllipsis = false
      let renderRightEllipsis = false
      return (
        <Pagination className="mt-4 mb-4 ml-4 mr-4 w-full">
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
              if (
                !isHardShow &&
                page > pagination.page + paginationShowLimit &&
                renderRightEllipsis
              ) {
                return null
              } else if (!isHardShow && page > pagination.page + paginationShowLimit) {
                renderRightEllipsis = true
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              if (
                !isHardShow &&
                page < pagination.page - paginationShowLimit &&
                renderLeftEllipsis
              ) {
                return null
              } else if (!isHardShow && page < pagination.page - paginationShowLimit) {
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
    }, [pagination.maxPage, pagination.page, paginationShowLimit])

    const renderRow = (item: string[] | Record<string, unknown>, index: number) => {
      if (!item) {
        return
      }
      const columns = Array.isArray(item) ? item : headers.map((header) => item[header])
      return (
        <TableRow key={`${index}`}>
          <TableCell>
            <div className="font-bold">{index + 1}</div>
          </TableCell>
          {columns.map((cell, cellIndex) => {
            const value = typeof cell === 'string' ? cell : JSON.stringify(cell)
            const field = headers[cellIndex]
            const columnLimit = limitLengthByColumns?.[field] || contentLengthLimit
            const isTruncated = value.length > columnLimit
            return (
              <TableCell key={`${cellIndex}`} className="p-4">
                <div
                  onClick={
                    isTruncated
                      ? () => viewDetailDialog.show({ title: field, content: value })
                      : undefined
                  }
                  className="flex gap-4"
                >
                  {isTruncated ? `${value.substring(0, columnLimit)}...` : value}
                  {isTruncated ? <LazyIcon className="w-6 mt-[-2px]" name="chevron-right" /> : null}
                </div>
              </TableCell>
            )
          })}
        </TableRow>
      )
    }

    return (
      <>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead key={'index'} />
              {headers
                ? headers.map((header) => (
                    <TableHead key={header}>
                      <div className="font-bold">{header}</div>
                    </TableHead>
                  ))
                : undefined}
            </TableRow>
          </TableHeader>
          <TableBody>{showingRows?.length ? showingRows?.map(renderRow) : undefined}</TableBody>
        </Table>
        {renderPagination}
      </>
    )
  },
)
