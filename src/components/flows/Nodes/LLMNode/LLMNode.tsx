import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Position } from '@xyflow/react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMProviderEnum, LLMStatusEnum } from 'src/services/database/types/llm'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import type { ModelRecord } from '@mlc-ai/web-llm'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { LLMInfo } from 'src/components/atoms/LLMInfo'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { LLMNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { LLMSetting } from 'src/components/atoms/LLMSetting'

export const LLMNode = memo((props: LLMNodeProps) => {
  const { id, data, isConnectable } = props
  const [llmInfo, setLLMInfo] = useState<
    | { hasCache: boolean; isFunctionCalling: boolean; info?: ModelRecord; cloud?: boolean }
    | undefined
  >()
  const { t } = useTranslation('flows')

  const { createThread, loadModel, queringThreads, queryThreads, loadingModel, changeLLMOptions } =
    useActions(id, data)
  useConnectionToHandler(id)

  const isLoading = [LLMStatusEnum.Loading, LLMStatusEnum.Downloading].includes(data.status)

  useEffect(() => {
    if (llmInfo || !data?.entity?.name) {
      return
    }
    if (
      ![LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(
        data?.entity?.provider as LLMProviderEnum,
      )
    ) {
      setLLMInfo({
        hasCache: false,
        cloud: true,
        isFunctionCalling: true,
        info: {
          model_id: data?.entity?.name,
          model: data?.entity?.name,
          model_lib: data?.entity?.provider,
          model_type: 2,
        },
      })
      return
    } else if (LLMProviderEnum.Wllama === data?.entity?.provider) {
      import('@wllama/wllama').then(async ({ ModelManager }) => {
        const modelManager = new ModelManager()
        const models = await modelManager.getModels()
        setLLMInfo({
          hasCache: !!models.find((item) => item.url.includes(data?.entity?.name)),
          cloud: false,
          isFunctionCalling: false,
          info: {
            model_id: data?.entity?.name,
            model: data?.entity?.name,
            model_lib: data?.entity?.provider,
            model_type: 2,
          },
        })
      })
      setLLMInfo({
        hasCache: false,
        cloud: false,
        isFunctionCalling: true,
        info: {
          model_id: data?.entity?.name,
          model: data?.entity?.name,
          model_lib: data?.entity?.provider,
          model_type: 2,
        },
      })
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
  }, [data?.entity?.name, data?.entity?.provider, llmInfo])

  const onChangeOptions = useCallback(
    async (options: Record<string, unknown>) => {
      await changeLLMOptions(options)
    },
    [changeLLMOptions],
  )

  const llmIcon = useMemo(() => {
    switch (data.status) {
      case LLMStatusEnum.Downloading:
        return <LazyIcon className={'animate-spin w-7 h-7'} name={'arrow-big-down-dash'} />
      case LLMStatusEnum.Loaded:
        return <LLMIcon name={data.entity?.name || 'brain'} className="w-7 h-7" />
      case LLMStatusEnum.Loading:
        return <LazyIcon className={'animate-spin w-7 h-7'} name={'loader-circle'} />
      default:
        return <LLMIcon name={data.entity?.name || 'brain'} className="w-7 h-7" />
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
          <LoadingButton loading={queringThreads} onClick={queryThreads}>
            <LazyIcon size={24} name={'message-square-more'} />
          </LoadingButton>
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
            <div className="max-w-full mt-2 flex-wrap flex gap-1">
              <LLMInfo
                model={llmInfo?.info}
                isFunctionCalling={llmInfo?.isFunctionCalling || false}
                name={data?.entity?.name}
                isCached={llmInfo?.hasCache || false}
                cloud={llmInfo?.cloud || false}
              />
            </div>
            <LLMSetting
              options={data?.entity?.options}
              onChangeOptions={onChangeOptions}
              className="mt-2"
            />
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
