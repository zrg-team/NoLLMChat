import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/lib/shadcn/ui/table'

export function ExampleTable({ data }: { data: { input: string; output: string }[] }) {
  const { t } = useTranslation('components')
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>{t('add_few_shot_example_card.input')}</TableHead>
          <TableHead>{t('add_few_shot_example_card.output')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={`${item.input}_${item.output}_${index}`}>
            <TableCell className="p-4">{item.input}</TableCell>
            <TableCell className="p-4">{item.output}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
