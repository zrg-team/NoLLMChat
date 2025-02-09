import { memo, useMemo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Position, useNodes } from '@xyflow/react'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { EmbeddingSetting } from 'src/components/atoms/EmbeddingSetting'
import { FlowNodeTypeEnum, LLMProviderEnum } from 'src/services/database/types'

import { EmbeddingNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'

export const EmbeddingNode = memo((props: EmbeddingNodeProps) => {
  const { id, data, isConnectable } = props
  const nodes = useNodes()
  const { changeLLMOptions } = useActions(id)

  useConnectionToHandler(id)

  const supportedEmbeddingProviders = useMemo(() => {
    return nodes
      .filter(
        (node) =>
          node.type === FlowNodeTypeEnum.LLM &&
          node.data?.entity &&
          typeof node.data.entity === 'object' &&
          'provider' in node.data.entity &&
          [LLMProviderEnum.OpenAI, LLMProviderEnum.GoogleGenerativeAI].includes(
            `${node.data?.entity?.provider}` as LLMProviderEnum,
          ),
      )
      .map((node) =>
        node.data?.entity && typeof node.data.entity === 'object' && 'provider' in node.data.entity
          ? `${node.data?.entity?.provider}`
          : '',
      )
  }, [nodes])

  let model = 'brain'
  let modelName = data.model
  switch (`${data?.entity?.data?.provider}`) {
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
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Alert className="flex justify-center max-w-auto" variant="default">
          <LLMIcon name={model} className="w-7 h-7" />
          <div className="ml-2 pr-4 flex justify-center gap-1 flex-col">
            <div className="min-h-8 flex items-center">
              <AlertTitle>{`${modelName || ''}`}</AlertTitle>
            </div>
            <EmbeddingSetting
              supportedProviders={supportedEmbeddingProviders}
              onChangeOptions={changeLLMOptions}
              options={data.entity.data}
            />
          </div>
        </Alert>
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
