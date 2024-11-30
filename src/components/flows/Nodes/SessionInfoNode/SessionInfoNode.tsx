import dayjs from 'dayjs'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, XAxis, CartesianGrid, BarChart } from 'recharts'
import { Badge } from 'src/lib/shadcn/ui/badge'
import type { ModelRecord } from '@mlc-ai/web-llm'
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
import { LLMInfo } from 'src/components/atoms/LLMInfo'

export const SessionInfoNode = memo(() => {
  const { t } = useTranslation('flows')
  const [cachedModdels, setCachedModels] =
    useState<{ model_id: string; info: ModelRecord; isFunctionCalling: boolean }[]>()
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
        vectorDatabases?: number
        jsonlDatas?: number
        csvDatas?: number
      },
    ]
  >()

  const chartConfig = useMemo(() => {
    return {
      nodes: {
        label: t('session_info_node.entities.nodes'),
        color: '#2563eb', // Original color
      },
      edges: {
        label: t('session_info_node.entities.edges'),
        color: '#34d399', // New color
      },
      threads: {
        label: t('session_info_node.entities.threads'),
        color: '#fbbf24', // New color
      },
      llms: {
        label: t('session_info_node.entities.llms'),
        color: '#f87171', // New color
      },
      prompts: {
        label: t('session_info_node.entities.prompts'),
        color: '#a78bfa', // New color
      },
      tools: {
        label: t('session_info_node.entities.tools'),
        color: '#ffcccb', // Lighter and more colorful
      },
      schemas: {
        label: t('session_info_node.entities.schemas'),
        color: '#ffb6c1', // Lighter and more colorful
      },
      vectorDatabases: {
        label: t('session_info_node.entities.vector_databases'),
        color: '#ff69b4', // Lighter and more colorful
      },
      jsonlDatas: {
        label: t('session_info_node.entities.jsonl_data'),
        color: '#ff1493', // Lighter and more colorful
      },
      csvDatas: {
        label: t('session_info_node.entities.csv_data'),
        color: '#db7093', // Lighter and more colorful
      },
    } satisfies ChartConfig
  }, [t])

  useEffect(() => {
    import('@mlc-ai/web-llm').then(({ functionCallingModelIds, prebuiltAppConfig }) => {
      setCachedModels(
        cachedLLMURLs?.map((url) => {
          const item = prebuiltAppConfig.model_list.find((model) => url.includes(model.model))
          if (!item) {
            return
          }
          return {
            model_id: item?.model_id || '',
            info: item,
            isFunctionCalling: functionCallingModelIds.includes(item?.model_id || ''),
          }
        }) as { model_id: string; info: ModelRecord; isFunctionCalling: boolean }[],
      )
    })
  }, [cachedLLMURLs, currentSession?.id])

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
      getRepository('VectorDatabase').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('JSONLData').findOne({
        where: { session_id: currentSession?.id },
        order: { updated_at: 'DESC' },
      }),
      getRepository('CSVData').findOne({
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
      getRepository('VectorDatabase').count({ where: { session_id: currentSession?.id } }),
      getRepository('JSONLData').count({ where: { session_id: currentSession?.id } }),
      getRepository('CSVData').count({ where: { session_id: currentSession?.id } }),
    ]).then(
      ([
        nodes,
        edges,
        threads,
        prompts,
        llms,
        tools,
        schemas,
        vectorDatabases,
        jsonlDatas,
        csvDatas,
      ]) => {
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
            vectorDatabases: vectorDatabases || 0,
            jsonlDatas: jsonlDatas || 0,
            csvDatas: csvDatas || 0,
          },
        ])
      },
    )
  }, [currentSession?.id, currentSession?.updated_at, t])

  const handleReload = useCallback(() => {
    fetchSessionInfo()
  }, [fetchSessionInfo])

  useEffect(() => {
    fetchSessionInfo()
  }, [fetchSessionInfo])
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{t('session_info_node.title')}</CardTitle>
        <CardDescription>
          {latestUpdate || currentSession?.updated_at
            ? dayjs(latestUpdate || currentSession?.updated_at).fromNow()
            : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{t('session_info_node.disk_size')}</p>
            <p className="text-sm text-muted-foreground">{usedBytes}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <div className="text-sm font-medium leading-none">
              {t('session_info_node.cached_llms')}
              <Badge className="ml-2">{cachedModdels?.length || 0}</Badge>
            </div>
            {cachedModdels?.map((llm) => (
              <div key={llm?.model_id} className="text-sm text-muted-foreground gap-1">
                {llm?.model_id}
                <div className="max-w-full gap-1 flex flex-wrap mt-1">
                  <LLMInfo
                    model={llm?.info}
                    isFunctionCalling={llm?.isFunctionCalling || false}
                    isCached={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ChartContainer config={chartConfig} className="min-h-28 w-full">
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
        <Button className="w-full" onClick={handleReload}>
          <LazyIcon size={24} name={'refresh-ccw'} />
          {t('session_info_node.reload')}
        </Button>
      </CardFooter>
    </Card>
  )
})
