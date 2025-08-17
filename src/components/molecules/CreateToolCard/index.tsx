import { lazy, memo, Suspense, useMemo, useState } from 'react'
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
import FieldList from '../CreateSchemaCard/Field/FieldList'
import { SchemaItemType } from '../CreateSchemaCard/Field/type'
import { Tabs, TabsContent, TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { PREDEFINE_TOOLS } from './constants'
import { generateUUID } from 'src/utils/uuid'

const CodeEditor = lazy(() => import('src/components/atoms/CodeEditor'))

const CreateToolCard = memo((props: NodeProps) => {
  const { t } = useTranslation('components')
  const { toast } = useToast()
  const { id } = props
  const node = useInternalNode(id)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState<SchemaItemType[]>([])
  const [handler, setHandler] = useState('')

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
        await createTool(node, { name, description, schema: data, handler })
        setName('')
        setDescription('')
      } catch (error) {
        logWarn('Create Tool', error)
        toast({
          variant: 'destructive',
          title: t('add_tool_card.errors.create_tool_failed'),
        })
      }
    }
  }

  const handleSelectPredifineTool = (value: string) => {
    if (value === '_EMPTY_') {
      setName('')
      setDescription('')
      setData([])
      setHandler('')
      return
    }
    const tool = PREDEFINE_TOOLS.find((tool) => tool.name === value)
    if (tool) {
      setName(tool.name)
      setDescription(tool.description)
      setData(
        tool.schema.map((item) => ({
          ...item,
          id: item.id || generateUUID(),
        })),
      )
      setHandler(tool.handler)
    } else {
      logWarn('Create Tool', `Predefined tool "${value}" not found`)
      toast({
        variant: 'destructive',
        title: t('add_tool_card.errors.predefine_tool_not_found'),
      })
    }
  }

  const editorOptions = useMemo(() => {
    return { minimap: { enabled: false } }
  }, [])

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
        <div className="mt-4">
          <Select onValueChange={handleSelectPredifineTool}>
            <SelectTrigger className="">
              <SelectValue placeholder={t('add_tool_card.predefine_tool_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={'_EMPTY_'} value={'_EMPTY_'}>
                Empty
              </SelectItem>
              {PREDEFINE_TOOLS.map((provider) => (
                <SelectItem key={provider.name} value={provider.name}>
                  {provider.name}
                  <br />
                  <span className="text-xs text-muted-foreground">{provider.description}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="account" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">{t('add_tool_card.tool_schema')}</TabsTrigger>
            <TabsTrigger value="password">{t('add_tool_card.handler')}</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="p-4">
              <FieldList className="mt-0" data={data} setData={setData} />
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="p-4 max-w-full">
              <Suspense>
                <CodeEditor
                  content={handler}
                  setContent={setHandler}
                  className="h-40"
                  language="javascript"
                  options={editorOptions}
                />
              </Suspense>
            </Card>
          </TabsContent>
        </Tabs>
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
