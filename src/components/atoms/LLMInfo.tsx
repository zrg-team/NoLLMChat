import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ModelRecord } from '@mlc-ai/web-llm'
import { RECOMMENDATION_LOCAL_LLMS } from 'src/constants/local-llm'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { useAppState } from 'src/states/app'
import { useShallow } from 'zustand/react/shallow'
import { cn } from 'src/lib/utils'

export const LLMInfo = memo(
  (props: {
    name?: string
    isFunctionCalling: boolean
    isCached: boolean
    cloud: boolean
    model?: ModelRecord
  }) => {
    const theme = useAppState(useShallow((state) => state.theme))
    const { cloud, name, model, isCached, isFunctionCalling } = props
    const { t } = useTranslation('atoms')

    const modelTypeToString = useCallback((modelType?: unknown) => {
      if (modelType === 1) {
        return 'llm_info.model_types.embedding'
      }
      if (modelType === 2) {
        return 'llm_info.model_types.vlm'
      }
      return 'llm_info.model_types.llm'
    }, [])

    const modelTypeBadges = useMemo(() => {
      if (!model) {
        return undefined
      }
      switch (model.model_type) {
        case 0:
        case 1:
          return <Badge className="">{t(modelTypeToString(model.model_type))}</Badge>
        case 2:
          return (
            <>
              <Badge className="">{t(modelTypeToString(0))}</Badge>
              <Badge className="">{t(modelTypeToString(model.model_type))}</Badge>
            </>
          )
      }
    }, [model, modelTypeToString, t])

    if (!model) {
      return undefined
    }

    return (
      <>
        {modelTypeBadges}
        {RECOMMENDATION_LOCAL_LLMS.some((item) => name && item.includes(name)) ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {t('llm_info.recommended')}
          </Badge>
        ) : null}
        {isCached ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {t('llm_info.cached')}
          </Badge>
        ) : null}
        {cloud ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {t('llm_info.cloud')}
          </Badge>
        ) : null}
        {isFunctionCalling ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {t('llm_info.function_calling')}
          </Badge>
        ) : null}
        {model?.low_resource_required ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {t('llm_info.low_resource_required')}
          </Badge>
        ) : null}
        {model?.overrides?.context_window_size ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            {model.overrides.context_window_size.toLocaleString('en-US')} Tokens
          </Badge>
        ) : null}
        {model?.vram_required_MB ? (
          <Badge
            className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}
            variant="outline"
          >
            VRAM: {model.vram_required_MB.toLocaleString('en-US')} MB
          </Badge>
        ) : null}
      </>
    )
  },
)
