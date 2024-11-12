import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, NodeProps, Position } from '@xyflow/react'
import LazyIcon, { IconNames } from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'

function AlertNode({ data, isConnectable }: NodeProps) {
  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <Alert
          className="tw-flex tw-justify-center"
          variant={`${data.variant || ''}` as 'default' | 'destructive'}
        >
          {data.icon ? (
            <LazyIcon
              className={cn(data.iconSpin ? 'tw-animate-spin' : undefined)}
              size={data.size ? +data.size : 24}
              name={`${data.icon}` as IconNames}
            />
          ) : null}
          <div className="tw-ml-2">
            <AlertTitle>{`${data.title || ''}`}</AlertTitle>
            <AlertDescription>{`${data.label || ''}`}</AlertDescription>
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
}

export default AlertNode
