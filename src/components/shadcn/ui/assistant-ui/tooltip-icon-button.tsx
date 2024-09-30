'use client'

import { forwardRef } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/shadcn/ui/tooltip'
import { Button, ButtonProps } from 'src/components/shadcn/ui/button'
import { cn } from 'src/lib/utils'

export type TooltipIconButtonProps = ButtonProps & {
  tooltip: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const TooltipIconButton = forwardRef<HTMLButtonElement, TooltipIconButtonProps>(
  ({ children, tooltip, side = 'bottom', className, ...rest }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              {...rest}
              className={cn('tw-size-6 tw-p-1', className)}
              ref={ref}
            >
              {children}
              <span className="tw-sr-only">{tooltip}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
)

TooltipIconButton.displayName = 'TooltipIconButton'
