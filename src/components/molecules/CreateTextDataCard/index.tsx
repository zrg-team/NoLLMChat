import { memo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useCreateCSVData } from 'src/hooks/flows/mutations/use-create-csv-data'
import LoadingButton from 'src/components/atoms/LoadingButton'

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
    <Card className="mw-full">
      <CardHeader>
        <CardTitle>{t('add_text_data.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5 mt-3">
          <Label htmlFor="name">{t('add_text_data.text')}</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value || '')}
            placeholder={t('add_text_data.text_placeholder')}
          />
        </div>
        <div className="w-full flex mt-4 justify-end">
          <Button disabled={!text} onClick={handleAdd} className="w-40">
            {t('add_text_data.add')}
          </Button>
        </div>
        <DataTable data={data || []} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <LoadingButton
          loading={loading}
          disabled={!data?.length}
          onClick={handleCreateCSVData}
          className="w-full"
        >
          {t('add_text_data.create')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
})

export default CreateTextDataCard
