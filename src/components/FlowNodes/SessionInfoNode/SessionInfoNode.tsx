import dayjs from 'dayjs'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, XAxis, CartesianGrid, BarChart } from 'recharts'
import { functionCallingModelIds, prebuiltAppConfig } from '@mlc-ai/web-llm'
import { Badge } from 'src/lib/shadcn/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/lib/shadcn/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/lib/shadcn/ui/chart'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { formatBytes } from 'src/utils/bytes-format'
import { Button } from 'src/lib/shadcn/ui/button'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useLocalLLMState } from 'src/services/local-llm'

export const SessionInfoNode = memo(() => {
  const { t } = useTranslation('flows')
  const cachedLLMURLs = useLocalLLMState((state) => state.cachedLLMURLs)
  const currentSession = useSessionState((state) => state.currentSession)
  const [latestUpdate, setLatestUpdate] = useState<Date>()
  const [usedBytes, setUsedBytes] = useState('')
  const [countInfo, setCountInfo] = useState<
    [
      {
        name: string
        nodes: number
        edges: number
        llms?: number
        threads?: number
        prompts?: number
        schemas?: number
        tools?: number
      },
    ]
  >()

  const chartConfig = useMemo(() => {
    return {
      nodes: {
        label: t('session_info_node.entities.nodes'),
        color: '#2563eb',
      },
      edges: {
        label: t('session_info_node.entities.edges'),
        color: '#60a5fa',
      },
      threads: {
        label: t('session_info_node.entities.threads'),
        color: '#d1e5fe',
      },
      llms: {
        label: t('session_info_node.entities.llms'),
        color: '#93c5fd',
      },
      prompts: {
        label: t('session_info_node.entities.prompts'),
        color: '#f0f4fc',
      },
      tools: {
        label: t('session_info_node.entities.tools'),
        color: '#f0f4fc',
      },
      schemas: {
        label: t('session_info_node.entities.schemas'),
        color: '#f0f4fc',
      },
    } satisfies ChartConfig
  }, [t])

  const cachedModdels = useMemo(() => {
    return cachedLLMURLs?.map((url) =>
      prebuiltAppConfig.model_list.find((model) => url.includes(model.model)),
    )
  }, [cachedLLMURLs])

  const fetchSessionInfo = useCallback(async () => {
    navigator.storage.estimate().then((estimate) => {
      if (estimate) {
        setUsedBytes(
          t('session_info_node.used_bytes', {
            used: formatBytes(estimate.usage),
            total: formatBytes(estimate?.quota),
          }),
        )
      }
    })
    if (!currentSession?.id) {
      return
    }

    Promise.all([
      getRepository('FlowNode').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('FlowEdge').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('Thread').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('Prompt').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('LLM').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('Schema').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('ToolDefinition').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
    ]).then((response) => {
      const maxUpdatedAt = response.reduce(
        (acc, item) => {
          if (item?.updated_at && (!acc || new Date(item.updated_at) > acc)) {
            return new Date(item.updated_at)
          }
          return acc
        },
        currentSession.updated_at ? new Date(currentSession.updated_at) : undefined,
      )
      setLatestUpdate(maxUpdatedAt)
    })

    Promise.all([
      getRepository('FlowNode').count({ where: { session_id: currentSession?.id } }),
      getRepository('FlowEdge').count({ where: { session_id: currentSession?.id } }),
      getRepository('Thread').count({ where: { session_id: currentSession?.id } }),
      getRepository('Prompt').count({ where: { session_id: currentSession?.id } }),
      getRepository('LLM').count({ where: { session_id: currentSession?.id } }),
      getRepository('ToolDefinition').count({ where: { session_id: currentSession?.id } }),
      getRepository('Schema').count({ where: { session_id: currentSession?.id } }),
    ]).then(([nodes, edges, threads, prompts, llms, tools, schemas]) => {
      setCountInfo([
        {
          name: t('session_info_node.count_info.title'),
          nodes: nodes || 0,
          edges: edges || 0,
          threads: threads || 0,
          prompts: prompts || 0,
          llms: llms || 0,
          tools: tools || 0,
          schemas: schemas || 0,
        },
      ])
    })
  }, [currentSession?.id, currentSession?.updated_at, t])

  const handleReload = useCallback(() => {
    fetchSessionInfo()
  }, [fetchSessionInfo])

  useEffect(() => {
    fetchSessionInfo()
  }, [fetchSessionInfo])
  return (
    <div>
      <div>
        <Card className="tw-w-96">
          <CardHeader>
            <CardTitle>{t('session_info_node.title')}</CardTitle>
            <CardDescription>
              {latestUpdate || currentSession?.updated_at
                ? dayjs(latestUpdate || currentSession?.updated_at).fromNow()
                : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="tw-grid tw-gap-4">
            <div className="tw-flex tw-items-center tw-space-x-4 tw-rounded-md tw-border tw-p-4">
              <div className="tw-flex-1 tw-space-y-1">
                <p className="tw-text-sm tw-font-medium tw-leading-none">
                  {t('session_info_node.disk_size')}
                </p>
                <p className="tw-text-sm tw-text-muted-foreground">{usedBytes}</p>
              </div>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-4 tw-rounded-md tw-border tw-p-4">
              <div className="tw-flex-1 tw-space-y-1">
                <div className="tw-text-sm tw-font-medium tw-leading-none">
                  {t('session_info_node.cached_llms')}
                  <Badge className="tw-ml-2">{cachedModdels?.length || 0}</Badge>
                </div>
                {cachedModdels?.map((llm) => (
                  <div key={llm?.model_id} className="tw-text-sm tw-text-muted-foreground tw-gap-1">
                    {llm?.model_id}
                    {llm?.model_id && functionCallingModelIds.includes(llm?.model_id) ? (
                      <Badge className="tw-ml-1" variant="outline">
                        {t('session_info_node.function_calling')}
                      </Badge>
                    ) : null}
                    {llm?.vram_required_MB ? (
                      <Badge className="tw-ml-1" variant="outline">
                        VRAM: {llm.vram_required_MB.toLocaleString('en-US')} MB
                      </Badge>
                    ) : null}
                    {llm?.low_resource_required ? (
                      <Badge className="tw-ml-1" variant="default">
                        {t('session_info_node.low_resource_required')}
                      </Badge>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ChartContainer config={chartConfig} className="tw-min-h-28 tw-w-full">
                <BarChart accessibilityLayer data={countInfo}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {Object.entries(chartConfig).map(([key, item]) => (
                    <Bar key={key} dataKey={key} fill={item.color} radius={4} />
                  ))}
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="tw-w-full" onClick={handleReload}>
              <LazyIcon size={24} name={'refresh-ccw'} />
              {t('session_info_node.reload')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
})
