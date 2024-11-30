import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { ModelRecord } from '@mlc-ai/web-llm'
import { RECOMMENDATION_LOCAL_LLMS } from 'src/constants/local-llm'
import { Badge } from 'src/lib/shadcn/ui/badge'

export const LLMInfo = memo(
  (props: {
    name?: string
    isFunctionCalling: boolean
    isCached: boolean
    model?: ModelRecord
  }) => {
    const { name, model, isCached, isFunctionCalling } = props
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

    if (!model) {
      return undefined
    }

    return (
      <>
        <Badge className="">{t(modelTypeToString(model.model_type))}</Badge>
        {RECOMMENDATION_LOCAL_LLMS.some((item) => name && item.includes(name)) ? (
          <Badge className="" variant="outline">
            {t('llm_info.recommended')}
          </Badge>
        ) : null}
        {isCached ? (
          <Badge className="" variant="outline">
            {t('llm_info.cached')}
          </Badge>
        ) : null}
        {isFunctionCalling ? (
          <Badge className="" variant="outline">
            {t('llm_info.function_calling')}
          </Badge>
        ) : null}
        {model?.low_resource_required ? (
          <Badge className="" variant="outline">
            {t('llm_info.low_resource_required')}
          </Badge>
        ) : null}
        {model?.overrides?.context_window_size ? (
          <Badge className="" variant="outline">
            {model.overrides.context_window_size.toLocaleString('en-US')} Tokens
          </Badge>
        ) : null}
        {model?.vram_required_MB ? (
          <Badge className="" variant="outline">
            VRAM: {model.vram_required_MB.toLocaleString('en-US')} MB
          </Badge>
        ) : null}
      </>
    )
  },
)
