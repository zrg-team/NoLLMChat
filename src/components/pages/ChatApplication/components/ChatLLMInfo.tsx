import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMStatusEnum } from 'src/services/database/types/llm'
import type { ModelRecord } from '@mlc-ai/web-llm'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { LLMInfo } from 'src/components/atoms/LLMInfo'

import { LLM } from 'src/services/database/types'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'

export const ChatLLMInfo = memo(
  ({
    llm,
    status,
    loadLLM,
    progress,
  }: {
    llm?: LLM
    progress?: string
    status?: LLMStatusEnum
    loadLLM?: () => Promise<void>
  }) => {
    const { t } = useTranslation('flows')
    const [llmInfo, setLLMInfo] = useState<
      { hasCache: boolean; isFunctionCalling: boolean; info?: ModelRecord } | undefined
    >()

    useEffect(() => {
      if (llmInfo || !llm?.name) {
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
    }, [llm?.name, llmInfo])

    const handleLoadLLM = useCallback(async () => {
      await loadLLM?.()
    }, [loadLLM])

    const llmIcon = useMemo(() => {
      switch (status) {
        case LLMStatusEnum.Downloading:
          return <LazyIcon className={'animate-spin w-7 h-7'} name={'arrow-big-down-dash'} />
        case LLMStatusEnum.Loaded:
          return <LLMIcon name={llm?.name || 'brain'} className="w-7 h-7" />
        default:
          return <LLMIcon name={llm?.name || 'brain'} className="w-7 h-7" />
      }
    }, [llm?.name, status])
    return (
      <Alert className="flex justify-center max-w-xl">
        {llmIcon}
        <div className="ml-2 pt-1 max-w-lg">
          <AlertTitle className="flex gap-2 items-center pr-6">{`${llm?.name || ''}`}</AlertTitle>
          <div className="max-w-full mt-2 flex-wrap flex gap-1">
            <LLMInfo
              model={llmInfo?.info}
              isFunctionCalling={llmInfo?.isFunctionCalling || false}
              name={llm?.name}
              isCached={llmInfo?.hasCache || false}
            />
            {status !== LLMStatusEnum.Loaded ? (
              <Button
                variant={progress ? 'ghost' : 'default'}
                disabled={status === LLMStatusEnum.Loading}
                onClick={handleLoadLLM}
                className="mt-4 w-full"
              >
                {progress ||
                  t(
                    llmInfo?.hasCache
                      ? 'llm_node.load_model_button'
                      : 'llm_node.download_model_button',
                  )}
              </Button>
            ) : undefined}
          </div>
        </div>
      </Alert>
    )
  },
)
