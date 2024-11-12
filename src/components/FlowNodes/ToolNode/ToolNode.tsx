import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { ToolNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const ToolNode = memo(({ id, data, isConnectable }: ToolNodeProps) => {
  useConnectionToHandler(id)

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Alert className="tw-flex tw-justify-center">
          <LazyIcon size={24} name="wrench" />
          <div className="tw-ml-2">
            <AlertTitle>{`${data.entity?.name || ''}`}</AlertTitle>
            <AlertDescription>{`${data.entity?.description || ''}`}</AlertDescription>
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
