import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Position, useInternalNode } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { useFlowState } from 'src/states/flow'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { McpNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Label } from 'src/lib/shadcn/ui/label'
import { getMCPClientTools } from 'src/services/mcp'
import zodToJsonSchema from 'zod-to-json-schema'
import { ZodObject, ZodRawShape } from 'zod'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { Button } from 'src/lib/shadcn/ui/button'

export const McpNode = memo((props: McpNodeProps) => {
  const { t } = useTranslation('flows')
  const { id, data, isConnectable } = props
  const [viewAll, setViewAll] = useState(false)
  const loadingRef = useRef(false)
  const node = useInternalNode(id)
  const updateNodes = useFlowState((state) => state.updateNodes)

  useConnectionToHandler(id)

  useEffect(() => {
    const mcp = data?.entity
    if (!mcp || !node || loadingRef.current || data.loaded) return

    loadingRef.current = true
    getMCPClientTools([mcp], {
      globalThrowOnLoadError: true,
    })
      .then((tools) => {
        loadingRef.current = false

        updateNodes([
          {
            id: node.id,
            type: 'replace',
            item: {
              ...node,
              data: {
                ...(node?.data || {}),
                loaded: true,
                tools: tools.map((tool) => ({
                  name: `${tool.name}`,
                  description: tool.description || '',
                  schema: zodToJsonSchema(tool.schema as ZodObject<ZodRawShape>),
                })),
              },
            },
          },
        ])
      })
      .catch((error) => {
        loadingRef.current = false
        updateNodes([
          {
            id: node.id,
            type: 'replace',
            item: { ...node, data: { ...data, loaded: true, error: error.message } },
          },
        ])
      })
  }, [data.loaded, data?.entity, node, t, updateNodes, data])

  const toolList = useMemo(() => {
    if (!data?.tools || !data.loaded) {
      return {
        tools: [],
        total: 0,
      }
    }

    if (viewAll) {
      return {
        tools: data.tools,
        total: data.tools.length,
      }
    }
    return {
      tools: data.tools.slice(0, 5),
      total: data.tools.length,
    }
  }, [data?.tools, data.loaded, viewAll])

  return (
    <div>
      <div>
        <NodeHeader id={id} />
        <Alert className="flex justify-center max-w-md" variant="default">
          <LazyIcon size={24} name={'tool-case'} />
          <div className="ml-2 max-w-full break-words break-all">
            <AlertTitle>{`${data.entity?.key || ''}`}</AlertTitle>
            <AlertDescription>
              <Label>{`${data.entity?.url || ''}`}</Label>
              <Separator className="my-2" />
              {data.error ? <Label className="text-red-500">{data.error}</Label> : undefined}
              {toolList?.tools?.length ? (
                <div>
                  <ul className="list-disc pl-5">
                    {toolList.tools.map((tool, index) => (
                      <li key={index}>
                        <Label>
                          {tool.name}: {tool.description}
                        </Label>
                      </li>
                    ))}
                  </ul>
                  {toolList.total > toolList?.tools?.length ? (
                    <Button
                      onClick={() => setViewAll(true)}
                      className="align-self-center mt-2"
                      variant="ghost"
                    >
                      <LazyIcon name="chevron-down" className="mt-1" />
                      {t('mcp_node.view_all', { count: toolList.total })}
                    </Button>
                  ) : toolList.total > 5 ? (
                    <Button
                      onClick={() => setViewAll(false)}
                      className="align-self-center mt-2"
                      variant="ghost"
                    >
                      <LazyIcon name="chevron-up" className="mt-1" />
                      {t('mcp_node.view_less')}
                    </Button>
                  ) : null}
                </div>
              ) : data?.loaded && !data?.error ? (
                <Label>{t('mcp_node.no_tools')}</Label>
              ) : data?.error ? undefined : (
                <Label>{t('mcp_node.loading_tools')}</Label>
              )}
            </AlertDescription>
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
