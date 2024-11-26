import { memo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/flows/NodeHeader'
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
        <NodeHeader id={id} />
        <Alert className="flex justify-center max-w-64" variant="default">
          <LazyIcon size={24} name={'chart-scatter'} />
          <div className="ml-2 pr-4">
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
