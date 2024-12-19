'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { SubscriptPlugin, SuperscriptPlugin } from '@udecode/plate-basic-marks/react'
import { collapseSelection } from '@udecode/plate-common'
import { focusEditor, useEditorRef } from '@udecode/plate-common/react'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert">
          <LazyIcon name='ellipsis' />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[180px] flex-col overflow-y-auto"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggle.mark({
                key: HighlightPlugin.key,
              })
              focusEditor(editor)
            }}
          >
            <LazyIcon name='highlighter' />
            Highlight
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggle.mark({ key: KbdPlugin.key })
              collapseSelection(editor, { edge: 'end' })
              focusEditor(editor)
            }}
          >
            <LazyIcon name='keyboard' />
            Keyboard input
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggle.mark({
                key: SuperscriptPlugin.key,
                clear: [SubscriptPlugin.key, SuperscriptPlugin.key],
              })
              focusEditor(editor)
            }}
          >
            <LazyIcon name='superscript' />
            Superscript
            {/* (⌘+,) */}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              editor.tf.toggle.mark({
                key: SubscriptPlugin.key,
                clear: [SuperscriptPlugin.key, SubscriptPlugin.key],
              })
              focusEditor(editor)
            }}
          >
            <LazyIcon name='subscript' />
            Subscript
            {/* (⌘+.) */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
