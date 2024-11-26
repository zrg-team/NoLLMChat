import { memo } from 'react'
import { Handle, HandleProps, Position } from '@xyflow/react'
import { cn } from 'src/lib/utils'

export const DefaultHandle = memo((props: HandleProps) => {
  const { className, ...rest } = props
  return (
    <Handle
      className={cn(
        '!w-2 !h-2 !border-none !rounded-full !bg-slate-700',
        props.position === Position.Top ? '!top-[-2px]' : '',
        className,
      )}
      {...rest}
    />
  )
})
