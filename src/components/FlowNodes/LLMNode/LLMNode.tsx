import { memo, useEffect, useMemo, useState } from 'react'
import { Handle, Position } from '@xyflow/react'
import { hasModelInCache } from '@mlc-ai/web-llm'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMStatusEnum } from 'src/services/database/types/llm'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/lib/utils'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { LLMNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const LLMNode = memo((props: LLMNodeProps) => {
  const { id, data, isConnectable } = props
  const [hasCache, setHasCache] = useState<boolean>()
  const { t } = useTranslation('flows')

  const { createThread, loadModel, queringThreads, queryThreads, loadingModel } = useActions(
    id,
    data,
  )
  useConnectionToHandler(id)

  useEffect(() => {
    if (typeof hasCache == 'boolean' || !data?.entity?.name) {
      return
    }
    hasModelInCache(data?.entity?.name).then((result) => {
      setHasCache(result)
    })
  }, [data?.entity?.name, hasCache])

  const llmIcon = useMemo(() => {
    switch (data.status) {
      case LLMStatusEnum.Downloading:
        return <LazyIcon className={'animate-spin'} size={24} name={'arrow-big-down-dash'} />
      case LLMStatusEnum.Loaded:
        return <LazyIcon size={24} name={'brain'} />
      case LLMStatusEnum.Loading:
        return <LazyIcon className={'animate-spin'} size={24} name={'loader-circle'} />
    }
  }, [data.status])

  const actions = useMemo(() => {
    const isLoading = [LLMStatusEnum.Loading, LLMStatusEnum.Downloading].includes(data.status)
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
        {hasCache ? (
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
          {t(hasCache ? 'llm_node.load_model_button' : 'llm_node.download_model_button')}
        </Button>
      </div>
    )
  }, [
    data.status,
    loadingModel,
    hasCache,
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
          <div className="ml-2 mt-1 pt-4">
            <AlertTitle className="flex gap-2 items-center">
              {llmIcon}
              {`${data?.entity?.name || ''}`}
            </AlertTitle>
            <AlertDescription>{`${data.label || ''}`}</AlertDescription>
            {actions}
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
