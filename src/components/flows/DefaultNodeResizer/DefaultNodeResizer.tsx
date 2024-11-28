import { memo } from 'react'
import { NodeResizer, NodeResizerProps } from '@xyflow/react'
import { cn } from 'src/lib/utils'

export const DefaultNodeResizer = memo((props: NodeResizerProps) => {
  const { lineClassName, handleClassName, ...rest } = props
  return (
    <NodeResizer
      lineClassName={cn('!border-1.5', lineClassName)}
      handleClassName={cn('!w-2 !h-2 !border-2 !rounded-full', handleClassName)}
      {...rest}
    />
  )
})
