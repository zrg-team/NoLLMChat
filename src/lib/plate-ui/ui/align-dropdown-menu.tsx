'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { useAlignDropdownMenu, useAlignDropdownMenuState } from '@udecode/plate-alignment/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

const items = [
  {
    icon: 'align-left' as const,
    value: 'left',
  },
  {
    icon: 'align-center' as const,
    value: 'center',
  },
  {
    icon: 'align-right' as const,
    value: 'right',
  },
  {
    icon: 'align-justify' as const,
    value: 'justify',
  },
]

export function AlignDropdownMenu({ ...props }: DropdownMenuProps) {
  const state = useAlignDropdownMenuState()
  const { radioGroupProps } = useAlignDropdownMenu(state)

  const openState = useOpenState()
  const iconName = items.find((item) => item.value === radioGroupProps.value)?.icon ?? 'align-left'

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Align" isDropdown>
          <LazyIcon name={iconName} />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-0" align="start">
        <DropdownMenuRadioGroup {...radioGroupProps}>
          {items.map(({ icon, value: itemValue }) => (
            <DropdownMenuRadioItem key={itemValue} value={itemValue} hideIcon>
              <LazyIcon name={icon} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
