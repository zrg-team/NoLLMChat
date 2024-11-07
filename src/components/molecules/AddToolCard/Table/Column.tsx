import { ColumnDef } from '@tanstack/react-table'
import { ParameterSchama } from './type'
import { Checkbox } from 'src/lib/shadcn/ui/checkbox'
import LazyIcon from 'src/components/atoms/LazyIcon'

export const columns: ColumnDef<ParameterSchama>[] = [
  {
    id: 'select',
    header: '',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('name')}</div>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      return <div>{row.getValue('type')}</div>
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div className="capitalize">{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'required',
    header: 'Required',
    cell: ({ row }) => (
      <div className="tw-flex">
        {row.getValue('required') ? <LazyIcon size={18} name="check" /> : null}
      </div>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: () => {
      return <LazyIcon size={18} name="trash-2" />
    },
  },
]
