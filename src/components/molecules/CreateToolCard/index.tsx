import { memo, useState } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { useToast } from 'src/lib/hooks/use-toast'
import { useCreateTool } from 'src/hooks/flows/mutations/use-create-tool'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { logWarn } from 'src/utils/logger'

const CreateToolCard = memo((props: NodeProps) => {
  const { t } = useTranslation('components')
  const { toast } = useToast()
  const { id } = props
  const node = useInternalNode(id)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const { createTool, loading } = useCreateTool()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async () => {
    if (node && name && description) {
      try {
        await createTool(node, { name, description })
        setName('')
        setDescription('')
      } catch (error) {
        logWarn(error)
        toast({
          variant: 'destructive',
          title: t('add_tool_card.errors.create_tool_failed'),
        })
      }
    }
  }

  return (
    <Card className="mw-full">
      <CardHeader>
        <CardTitle>{t('add_tool_card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">{t('add_tool_card.tool_name')}</Label>
          <Input
            onChange={handleChangeName}
            id="name"
            placeholder={t('add_tool_card.name_placeholder')}
          />
        </div>
        <div className="flex flex-col space-y-1.5 mt-3">
          <Label htmlFor="name">{t('add_tool_card.tool_description')}</Label>
          <Textarea
            onChange={handleChangeDescription}
            placeholder={t('add_tool_card.description_placeholder')}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <LoadingButton loading={loading} onClick={handleSubmit} className="w-full">
          {t('add_tool_card.create')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
})

export default CreateToolCard
