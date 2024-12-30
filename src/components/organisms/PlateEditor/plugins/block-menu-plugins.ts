'use client'

import { BlockMenuPlugin } from '@udecode/plate-selection/react'

import { BlockContextMenu } from 'src/lib/plate-ui/ui/block-context-menu'

import { blockSelectionPlugins } from './block-selection-plugins'

export const blockMenuPlugins = [
  ...blockSelectionPlugins,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
] as const
