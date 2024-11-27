import { memo } from 'react'
import { Position, NodeResizer, NodeProps } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const ShapeNode = memo((props: NodeProps) => {
  const { id, selected, isConnectable } = props
  useConnectionToHandler(id)
  return (
    <>
      <NodeResizer isVisible={!!selected} minWidth={40} minHeight={40} />
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="min-w-10 min-h-10 w-full h-full bg-white border">
        <NodeHeader id={id} />
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  )
})
