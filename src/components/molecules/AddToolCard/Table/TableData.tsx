// import { z } from 'zod'
import { memo, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/lib/shadcn/ui/table'
import { Input } from 'src/lib/shadcn/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { columns } from './Column'
import { ParameterSchama } from './type'
import { Label } from 'src/lib/shadcn/ui/label'
import { Checkbox } from 'src/lib/shadcn/ui/checkbox'

const TableData = memo(() => {
  const [rowSelection, setRowSelection] = useState({})
  const data: ParameterSchama[] = useMemo(
    () => [
      {
        name: 'location',
        description: 'The city and state, e.g. San Francisco, CA',
        required: true,
        type: 'string',
      },
      {
        name: 'unit',
        description: '',
        required: true,
        enum: ['celsius', 'fahrenheit'],
        type: 'string',
      },
    ],
    [],
  )
  const table = useReactTable({
    data,
    columns,
    getRowId: (row, index) => `${row.name}_${index}`,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })
  const selectedRow = useMemo(() => {
    const key = Object.keys(rowSelection)[0]
    if (!key) return
    return table.getRowModel().rows.find((row, index) => {
      return `${row.getValue('name')}_${index}` === key
    })
  }, [rowSelection, table])
  console.log('rowSelection', selectedRow)
  return (
    <>
      {Object.keys(rowSelection)?.length ? (
        <div className="tw-p-4">
          <div>
            <Label>Name</Label>
            <Input
              id="name"
              placeholder={'Parametter name'}
              value={selectedRow?.getValue('name')}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              id="description"
              placeholder={'Parametter description'}
              value={selectedRow?.getValue('description')}
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={selectedRow?.getValue('type')}>
              <SelectTrigger>
                <SelectValue placeholder="Select column type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="object">Object</SelectItem>
                <SelectItem value="array">Array</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="tw-flex tw-items-center tw-h-10">
            <Label>Required</Label>
            <Checkbox
              className="tw-ml-2"
              aria-label="Select row"
              checked={selectedRow?.getValue('required')}
            />
          </div>
        </div>
      ) : null}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
})

export default TableData
