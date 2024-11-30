import { memo, useEffect, useMemo, useState } from 'react'
import { Position } from '@xyflow/react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMStatusEnum } from 'src/services/database/types/llm'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/lib/utils'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { RECOMMENDATION_LOCAL_LLMS } from 'src/constants/local-llm'
import { Badge } from 'src/lib/shadcn/ui/badge'
import type { ModelRecord } from '@mlc-ai/web-llm'

import { LLMNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import LLMIcon from 'src/components/atoms/LLMIcon'

export const LLMNode = memo((props: LLMNodeProps) => {
  const { id, data, isConnectable } = props
  const [llmInfo, setLLMInfo] = useState<
    { hasCache: boolean; isFunctionCalling: boolean; info?: ModelRecord } | undefined
  >()
  const { t } = useTranslation('flows')

  const { createThread, loadModel, queringThreads, queryThreads, loadingModel } = useActions(
    id,
    data,
  )
  useConnectionToHandler(id)

  const isLoading = [LLMStatusEnum.Loading, LLMStatusEnum.Downloading].includes(data.status)

  useEffect(() => {
    if (llmInfo || !data?.entity?.name) {
      return
    }
    import('@mlc-ai/web-llm').then(
      async ({ hasModelInCache, functionCallingModelIds, prebuiltAppConfig }) => {
        const hasCache = await hasModelInCache(data?.entity?.name)
        setLLMInfo({
          hasCache,
          isFunctionCalling: functionCallingModelIds.includes(data?.entity?.name),
          info: prebuiltAppConfig.model_list.find((item) => item.model_id === data?.entity?.name),
        })
      },
    )
  }, [data?.entity?.name, llmInfo])

  const llmIcon = useMemo(() => {
    switch (data.status) {
      case LLMStatusEnum.Downloading:
        return <LazyIcon className={'animate-spin w-7 h-7'} name={'arrow-big-down-dash'} />
      case LLMStatusEnum.Loaded:
        return <LLMIcon name={data.entity?.name || 'brain'} className='w-7 h-7' />
      case LLMStatusEnum.Loading:
        return <LazyIcon className={'animate-spin w-7 h-7'} name={'loader-circle'} />
      default:
        return <LLMIcon name={data.entity?.name || 'brain'} className='w-7 h-7' />
    }
  }, [data.entity?.name, data.status])

  const actions = useMemo(() => {
    if (isLoading) {
      return null
    }
    if (loadingModel) {
      return (
        <Button disabled={true} className="w-full mt-4">
          <LazyIcon className={'animate-spin'} size={24} name={'loader-circle'} />
        </Button>
      )
    }
    if (data.status === LLMStatusEnum.Loaded) {
      return (
        <Button onClick={createThread} className="mt-4 w-full">
          {t('llm_node.create_thread_button')}
        </Button>
      )
    }
    return (
      <div className="flex gap-2 mt-4">
        {llmInfo?.hasCache ? (
          <Button disabled={queringThreads} onClick={queryThreads} className="">
            {
              <LazyIcon
                size={24}
                className={cn(queringThreads ? 'animate-spin' : undefined)}
                name={queringThreads ? 'loader-circle' : 'message-square-more'}
              />
            }
          </Button>
        ) : null}
        <Button disabled={loadingModel} onClick={loadModel} className="w-full">
          {t(llmInfo?.hasCache ? 'llm_node.load_model_button' : 'llm_node.download_model_button')}
        </Button>
      </div>
    )
  }, [
    isLoading,
    loadingModel,
    data.status,
    llmInfo?.hasCache,
    queringThreads,
    queryThreads,
    loadModel,
    t,
    createThread,
  ])
  return (
    <div>
      <div>
        <NodeHeader id={id} />
        <Alert className="flex justify-center">
          {llmIcon}
          <div className="ml-2 pt-1 max-w-lg">
            <AlertTitle className="flex gap-2 items-center pr-6">
              {`${data?.entity?.name || ''}`}
            </AlertTitle>
            <AlertDescription className="max-w-full">{`${data.label || ''}`}</AlertDescription>
            <div className="max-w-full">
              {RECOMMENDATION_LOCAL_LLMS.some((item) => item.includes(data?.entity?.name)) ? (
                <Badge className="ml-1 mb-1" variant="outline">
                  {t('llm_node.recommended')}
                </Badge>
              ) : null}
              {llmInfo?.isFunctionCalling ? (
                <Badge className="ml-1 mb-1" variant="outline">
                  {t('llm_node.function_calling')}
                </Badge>
              ) : null}
              {llmInfo?.info?.low_resource_required ? (
                <Badge className="ml-1" variant="outline">
                  {t('llm_node.low_resource_required')}
                </Badge>
              ) : null}
              {llmInfo?.info?.overrides?.context_window_size ? (
                <Badge className="ml-1" variant="outline">
                  {llmInfo?.info?.overrides?.context_window_size.toLocaleString('en-US')} Tokens
                </Badge>
              ) : null}
              {llmInfo?.info?.vram_required_MB ? (
                <Badge className="ml-1" variant="outline">
                  VRAM: {llmInfo?.info.vram_required_MB.toLocaleString('en-US')} MB
                </Badge>
              ) : null}
            </div>
            {actions}
          </div>
        </Alert>
        {isLoading ? <BorderBeam className="rounded-lg" /> : undefined}
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
