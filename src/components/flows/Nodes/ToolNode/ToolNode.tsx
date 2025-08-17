import { lazy, memo, Suspense, useCallback, useMemo } from 'react'
import { Position } from '@xyflow/react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { ToolNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { NodeHeader } from '../../NodeHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import { Card } from 'src/lib/shadcn/ui/card'
import FieldList from 'src/components/molecules/CreateSchemaCard/Field/FieldList'
import { SchemaItemType } from 'src/components/molecules/CreateSchemaCard/Field/type'
import { useTranslation } from 'react-i18next'

const CodeEditor = lazy(() => import('src/components/atoms/CodeEditor'))

export const ToolNode = memo(({ id, data, isConnectable }: ToolNodeProps) => {
  const { t } = useTranslation('components')
  useConnectionToHandler(id)

  const schema = useMemo<SchemaItemType[]>(() => {
    try {
      return (data.entity?.schema || []) as SchemaItemType[]
    } catch {
      return []
    }
  }, [data.entity?.schema])

  const noop = useCallback(() => {}, [])

  const editorOptions = useMemo(() => {
    return { readOnly: true, minimap: { enabled: false } }
  }, [])

  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Alert className="flex justify-center">
          <NodeHeader id={id} />
          <LazyIcon size={24} name="wrench" />
          <div className="ml-2">
            <AlertTitle>{`${data.entity?.name || ''}`}</AlertTitle>
            <AlertDescription>{`${data.entity?.description || ''}`}</AlertDescription>
            <Tabs defaultValue="account" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">{t('add_tool_card.tool_schema')}</TabsTrigger>
                <TabsTrigger value="password">{t('add_tool_card.handler')}</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card className="p-4">
                  <FieldList className="mt-0" data={schema} />
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card className="p-4 max-w-full">
                  <Suspense>
                    <CodeEditor
                      content={data?.entity?.handler || ''}
                      setContent={noop}
                      className="h-40"
                      language="javascript"
                      options={editorOptions}
                    />
                  </Suspense>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Alert>
      </div>
      <DefaultHandle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  )
})
