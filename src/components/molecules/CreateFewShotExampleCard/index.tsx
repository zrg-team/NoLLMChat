import { memo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useCreateCSVData } from 'src/hooks/mutations/use-create-csv-data'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { ExampleTable } from './ExampleTable'

const CreateFewShotExampleCard = memo((props: NodeProps) => {
  const { id } = props
  const { t } = useTranslation('components')
  const [data, setData] = useState<{ input: string; output: string }[]>([])
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const node = useInternalNode(id)
  const { createCSVData, loading } = useCreateCSVData()

  const handleAdd = () => {
    setData((prevData) => [...prevData, { input, output }])
    setInput('')
    setOutput('')
  }
  const handleCreateCSVData = async () => {
    if (node) {
      await createCSVData(
        node,
        ['input', 'output'],
        data.map((item) => [item.input, item.output]),
      )
    }
  }
  return (
    <Card className="mw-full">
      <CardHeader>
        <CardTitle>{t('add_few_shot_example_card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">{t('add_few_shot_example_card.input')}</Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value || '')}
            id="name"
            placeholder={t('add_few_shot_example_card.input_placeholder')}
          />
        </div>
        <div className="flex flex-col space-y-1.5 mt-3">
          <Label htmlFor="name">{t('add_few_shot_example_card.output')}</Label>
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value || '')}
            placeholder={t('add_few_shot_example_card.output_placeholder')}
          />
        </div>
        <div className="w-full flex mt-4 justify-end">
          <Button disabled={!input || !output} onClick={handleAdd} className="w-40">
            {t('add_few_shot_example_card.add')}
          </Button>
        </div>
        <ExampleTable data={data || []} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handleCreateCSVData}
          disabled={loading || !data?.length}
          className="w-full"
        >
          {loading ? (
            <LazyIcon name="loader-circle" className="animate-spin" />
          ) : (
            t('add_few_shot_example_card.create')
          )}
        </Button>
      </CardFooter>
    </Card>
  )
})

export default CreateFewShotExampleCard