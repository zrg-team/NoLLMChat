import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/lib/shadcn/ui/table'

export function DataTable({ data }: { data: { text: string }[] }) {
  const { t } = useTranslation('components')
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>{t('add_text_data.text')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={`${item.text}_${index}`}>
            <TableCell className="p-4">{item.text}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
