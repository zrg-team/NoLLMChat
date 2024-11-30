import { memo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Position } from '@xyflow/react'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { EmbeddingNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const EmbeddingNode = memo((props: EmbeddingNodeProps) => {
  const { id, data, isConnectable } = props

  useConnectionToHandler(id)

  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Alert className="flex justify-center max-w-80" variant="default">
          <LLMIcon name={data.model || 'brain'} className="w-7 h-7" />
          <div className="ml-2 pr-4 flex items-center">
            <AlertTitle>{`${data.model || ''}`}</AlertTitle>
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
