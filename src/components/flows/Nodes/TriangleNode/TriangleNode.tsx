import { memo } from 'react'
import { Position, NodeResizer, NodeProps } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const TriangleNode = memo((props: NodeProps) => {
  const { id, selected, width, height, isConnectable } = props
  useConnectionToHandler(id)
  return (
    <>
      <NodeResizer isVisible={!!selected} minWidth={40} minHeight={40} />
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div
        className="w-0 h-0 border-l-transparent border-r-transparent border-b-gray-100"
        style={{
          borderLeftWidth: (width || 0) / 2,
          borderRightWidth: (width || 0) / 2,
          borderBottomWidth: height || 0,
        }}
      />
      <NodeHeader id={id} className="absolute top-0 right-0" />
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  )
})
