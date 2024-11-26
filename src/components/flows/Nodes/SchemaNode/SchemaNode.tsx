import { memo, useEffect, useRef } from 'react'
import { Position, useInternalNode } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { getRepository } from 'src/services/database'
import { useFlowState } from 'src/states/flow'
import { convertToTypeScriptInterface, convertToZodSchemaString } from 'src/utils/schema-format'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import { Card } from 'src/lib/shadcn/ui/card'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { SchemaNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const SchemaNode = memo((props: SchemaNodeProps) => {
  const { t } = useTranslation('flows')
  const { id, data, isConnectable } = props
  const loadingRef = useRef(false)
  const node = useInternalNode(id)
  const updateNodes = useFlowState((state) => state.updateNodes)

  useConnectionToHandler(id)

  useEffect(() => {
    const schema = data?.entity
    if (!schema || !node || loadingRef.current || schema?.schema_items?.length || data.loaded)
      return

    loadingRef.current = true
    getRepository('SchemaItem')
      .find({
        where: {
          schema_id: schema.id,
        },
      })
      .then((schemaItems) => {
        updateNodes([
          {
            id: node.id,
            type: 'replace',
            item: {
              ...node,
              data: {
                ...(node?.data || {}),
                loaded: true,
                entity: {
                  ...data.entity,
                  schema_items: schemaItems,
                },
              },
            },
          },
        ])
      })
      .finally(() => {
        loadingRef.current = false
      })
  }, [data.entity, data.loaded, node, updateNodes])

  return (
    <div>
      <div>
        <NodeHeader id={id} />
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">{t('schema_node.typescript')}</TabsTrigger>
            <TabsTrigger value="password">{t('schema_node.zod')}</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="p-4">
              <pre>{convertToTypeScriptInterface(data?.entity?.schema_items || [])}</pre>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card className="p-4">
              <pre>{convertToZodSchemaString(data?.entity?.schema_items || [])}</pre>
            </Card>
          </TabsContent>
        </Tabs>
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
