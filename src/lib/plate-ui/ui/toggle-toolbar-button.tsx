'use client'

import { withRef } from '@udecode/cn'
import { useToggleToolbarButton, useToggleToolbarButtonState } from '@udecode/plate-toggle/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { ToolbarButton } from './toolbar'

export const ToggleToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const state = useToggleToolbarButtonState()
  const { props } = useToggleToolbarButton(state)

  return (
    <ToolbarButton ref={ref} tooltip="Toggle" {...props} {...rest}>
      <LazyIcon name='list-collapse' />
    </ToolbarButton>
  )
})
