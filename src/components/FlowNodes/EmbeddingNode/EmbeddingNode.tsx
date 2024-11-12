import { memo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/molecules/NodeHeader'

import { EmbeddingNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const EmbeddingNode = memo((props: EmbeddingNodeProps) => {
  const { id, data, isConnectable } = props

  useConnectionToHandler(id)

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="tw-flex tw-justify-center tw-max-w-64" variant="default">
          <LazyIcon size={24} name={'chart-scatter'} />
          <div className="tw-ml-2 tw-pr-2">
            <AlertTitle>{`${data.model || ''}`}</AlertTitle>
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
