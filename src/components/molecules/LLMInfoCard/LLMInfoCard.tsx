import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMProviderEnum, LLMStatusEnum } from 'src/services/database/types/llm'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import type { ModelRecord } from '@mlc-ai/web-llm'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { LLMInfo } from 'src/components/atoms/LLMInfo'

import { useActions } from './hooks/use-actions'
import { LLMSetting } from 'src/components/atoms/LLMSetting'
import { LLM } from 'src/services/database/types'
import { cn } from 'src/lib/utils'

export const LLMInfoCard = memo(
  (props: {
    readonly?: boolean
    llm?: LLM
    className?: string
    status?: LLMStatusEnum
    progress?: string
    loadCurrentModel?: () => Promise<void>
    onUpdate?: (llm: LLM) => Promise<void>
  }) => {
    const { readonly, status, onUpdate, progress, llm, className, loadCurrentModel } = props
    const [llmInfo, setLLMInfo] = useState<
      | { hasCache: boolean; isFunctionCalling: boolean; info?: ModelRecord; cloud?: boolean }
      | undefined
    >()
    const { t } = useTranslation('molecules')

    const { changeLLMOptions } = useActions({ llm })

    const isLoading = status
      ? [LLMStatusEnum.Loading, LLMStatusEnum.Downloading].includes(status)
      : false

    useEffect(() => {
      if (llmInfo || !llm?.name) {
        return
      }
      if (
        ![LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(llm?.provider as LLMProviderEnum)
      ) {
        setLLMInfo({
          hasCache: false,
          cloud: true,
          isFunctionCalling: true,
          info: {
            model_id: llm?.name,
            model: llm?.name,
            model_lib: llm?.provider,
            model_type: 2,
          },
        })
        return
      } else if (LLMProviderEnum.Wllama === llm?.provider) {
        import('@wllama/wllama').then(async ({ ModelManager }) => {
          const modelManager = new ModelManager()
          const models = await modelManager.getModels()
          setLLMInfo({
            hasCache: !!models.find((item) => item.url.includes(llm?.name)),
            cloud: false,
            isFunctionCalling: false,
            info: {
              model_id: llm?.name,
              model: llm?.name,
              model_lib: llm?.provider,
              model_type: 2,
            },
          })
        })
        setLLMInfo({
          hasCache: false,
          cloud: false,
          isFunctionCalling: true,
          info: {
            model_id: llm?.name,
            model: llm?.name,
            model_lib: llm?.provider,
            model_type: 2,
          },
        })
        return
      }

      import('@mlc-ai/web-llm').then(
        async ({ hasModelInCache, functionCallingModelIds, prebuiltAppConfig }) => {
          const hasCache = await hasModelInCache(llm?.name)
          setLLMInfo({
            hasCache,
            isFunctionCalling: functionCallingModelIds.includes(llm?.name),
            info: prebuiltAppConfig.model_list.find((item) => item.model_id === llm?.name),
          })
        },
      )
    }, [llm?.name, llm?.provider, llmInfo])

    const onChangeOptions = useCallback(
      async (options: Record<string, unknown>) => {
        const llm = await changeLLMOptions(options)
        if (llm) {
          onUpdate?.(llm)
        }
      },
      [changeLLMOptions],
    )

    const llmIcon = useMemo(() => {
      switch (status) {
        case LLMStatusEnum.Downloading:
          return <LazyIcon className={'animate-spin w-7 h-7'} name={'arrow-big-down-dash'} />
        case LLMStatusEnum.Loaded:
          return <LLMIcon name={llm?.name || 'brain'} className="w-7 h-7" />
        case LLMStatusEnum.Loading:
          return <LazyIcon className={'animate-spin w-7 h-7'} name={'loader-circle'} />
        default:
          return <LLMIcon name={llm?.name || 'brain'} className="w-7 h-7" />
      }
    }, [llm?.name, status])

    const actions = useMemo(() => {
      if (
        status === LLMStatusEnum.Loaded ||
        !llm?.provider ||
        ![LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(llm?.provider as LLMProviderEnum)
      ) {
        return null
      }
      if (isLoading) {
        return (
          <Button disabled={true} className="w-full mt-4">
            <LazyIcon className={'animate-spin'} size={24} name={'loader-circle'} />
          </Button>
        )
      }
      return (
        <div className="flex gap-2 mt-4">
          <Button disabled={isLoading} onClick={() => loadCurrentModel?.()} className="w-full">
            {t(llmInfo?.hasCache ? 'llm_card.load_model_button' : 'llm_card.download_model_button')}
          </Button>
        </div>
      )
    }, [isLoading, status, loadCurrentModel, llmInfo?.hasCache, t])
    return (
      <Alert className={cn('flex justify-center relative max-w-auto', className)} variant="default">
        {isLoading ? <BorderBeam /> : null}
        {llmIcon}
        <div className="flex-1 ml-2 flex justify-center gap-1 flex-col">
          <div className="min-h-8 flex items-center">
            <AlertTitle className="flex gap-2 items-center pr-6">{`${llm?.name || ''}`}</AlertTitle>
          </div>
          <AlertDescription className="max-w-full">{`${progress || ''}`}</AlertDescription>
          <div className="max-w-full flex-wrap flex gap-1">
            <LLMInfo
              model={llmInfo?.info}
              isFunctionCalling={llmInfo?.isFunctionCalling || false}
              name={llm?.name}
              isCached={llmInfo?.hasCache || false}
              cloud={llmInfo?.cloud || false}
            />
          </div>
          {readonly ? undefined : (
            <>
              <LLMSetting options={llm?.options} onChangeOptions={onChangeOptions} />
              {actions}
            </>
          )}
        </div>
      </Alert>
    )
  },
)
