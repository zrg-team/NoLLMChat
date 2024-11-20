import { memo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useCreateCSVData } from 'src/hooks/mutations/use-create-csv-data'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { DataTable } from './DataTable'

const CreateTextDataCard = memo((props: NodeProps) => {
  const { id } = props
  const { t } = useTranslation('components')
  const [data, setData] = useState<{ text: string }[]>([])
  const [text, setText] = useState('')
  const node = useInternalNode(id)
  const { createCSVData, loading } = useCreateCSVData()

  const handleAdd = () => {
    setData((prevData) => [...prevData, { text }])
    setText('')
  }
  const handleCreateCSVData = async () => {
    if (node) {
      await createCSVData(
        node,
        ['text'],
        data.map((item) => [item.text]),
      )
    }
  }
  return (
    <Card className="tw-mw-full">
      <CardHeader>
        <CardTitle>{t('add_text_data.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mt-3">
          <Label htmlFor="name">{t('add_text_data.text')}</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value || '')}
            placeholder={t('add_text_data.text_placeholder')}
          />
        </div>
        <div className="tw-w-full tw-flex tw-mt-4 tw-justify-end">
          <Button disabled={!text} onClick={handleAdd} className="tw-w-40">
            {t('add_text_data.add')}
          </Button>
        </div>
        <DataTable data={data || []} />
      </CardContent>
      <CardFooter className="tw-flex tw-justify-between">
        <Button
          onClick={handleCreateCSVData}
          disabled={loading || !data?.length}
          className="tw-w-full"
        >
          {loading ? (
            <LazyIcon name="loader-circle" className="tw-animate-spin" />
          ) : (
            t('add_text_data.create')
          )}
        </Button>
      </CardFooter>
    </Card>
  )
})

export default CreateTextDataCard