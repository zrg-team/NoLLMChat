import { memo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { EmbeddingSetting } from 'src/components/molecules/EmbeddingSetting'
import { Embedding, EmbeddingProviderEnum, LLMProviderEnum } from 'src/services/database/types'
import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'

import { useActions } from './hooks/use-actions'
import { cn } from 'src/lib/utils'

export const EmbeddingInfoCard = memo(
  (props: {
    embedding?: Embedding
    className?: string
    readonly?: boolean
    onChangeEmbeddingOptions?: (data: {
      provider?: `${EmbeddingProviderEnum}`
      options?: Record<string, unknown>
      encrypted?: Record<string, unknown>
    }) => Promise<void>
  }) => {
    const { readonly, embedding, className, onChangeEmbeddingOptions } = props
    const { changeLLMOptions } = useActions()

    let model = 'brain'
    let modelName = DEFAULT_EMBEDDING_MODEL
    switch (`${embedding?.provider}`) {
      case LLMProviderEnum.OpenAI:
        model = 'gpt'
        modelName = 'text-embedding-3-small'
        break
      case LLMProviderEnum.GoogleGenerativeAI:
        model = 'gemma'
        modelName = 'text-embedding-004'
        break
    }

    return (
      <Alert className={cn('flex justify-center max-w-auto', className)} variant="default">
        <LLMIcon name={model} className="w-7 h-7" />
        <div className="flex-1 ml-2 flex justify-center gap-1 flex-col">
          <div className="min-h-8 flex items-center">
            <AlertTitle>{`${modelName || ''}`}</AlertTitle>
          </div>
          {readonly ? undefined : (
            <EmbeddingSetting
              supportedProviders={[LLMProviderEnum.OpenAI, LLMProviderEnum.GoogleGenerativeAI]}
              provider={embedding?.provider}
              onChangeOptions={onChangeEmbeddingOptions || changeLLMOptions}
              encrypted={embedding?.encrypted}
              options={embedding?.data}
            />
          )}
        </div>
      </Alert>
    )
  },
)
