'use client'

import React from 'react'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { CodeBlockPlugin } from '@udecode/plate-code-block/react'
import {
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
  useSelectionFragmentProp,
} from '@udecode/plate-common/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { getBlockType, setBlockType } from 'src/lib/plate-ui/utils/transforms'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

const turnIntoItems = [
  {
    icon: <LazyIcon name="pilcrow" />,
    keywords: ['paragraph'],
    label: 'Text',
    value: ParagraphPlugin.key,
  },
  {
    icon: <LazyIcon name="heading-1" />,
    keywords: ['title', 'h1'],
    label: 'Heading 1',
    value: HEADING_KEYS.h1,
  },
  {
    icon: <LazyIcon name="heading-2" />,
    keywords: ['subtitle', 'h2'],
    label: 'Heading 2',
    value: HEADING_KEYS.h2,
  },
  {
    icon: <LazyIcon name="heading-3" />,
    keywords: ['subtitle', 'h3'],
    label: 'Heading 3',
    value: HEADING_KEYS.h3,
  },
  {
    icon: <LazyIcon name="list" />,
    keywords: ['unordered', 'ul', '-'],
    label: 'Bulleted',
    value: ListStyleType.Disc,
  },
  {
    icon: <LazyIcon name="list-ordered" />,
    keywords: ['ordered', 'ol', '1'],
    label: 'Numbered ',
    value: ListStyleType.Decimal,
  },
  {
    icon: <LazyIcon name="square" />,
    keywords: ['checklist', 'task', 'checkbox', '[]'],
    label: 'To-do list',
    value: INDENT_LIST_KEYS.todo,
  },
  {
    icon: <LazyIcon name="chevron-right" />,
    keywords: ['collapsible', 'expandable'],
    label: 'Toggle list',
    value: TogglePlugin.key,
  },
  {
    icon: <LazyIcon name="file-code" />,
    keywords: ['```'],
    label: 'Code',
    value: CodeBlockPlugin.key,
  },
  {
    icon: <LazyIcon name="quote" />,
    keywords: ['citation', 'blockquote', '>'],
    label: 'Quote',
    value: BlockquotePlugin.key,
  },
  {
    icon: <LazyIcon name="columns-3" />,
    label: '3 columns',
    value: 'action_three_columns',
  },
]

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef()
  const openState = useOpenState()

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProp: (node) => getBlockType(node as any),
  })
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find((item) => item.value === (value ?? ParagraphPlugin.key)) ??
      turnIntoItems[0],
    [value],
  )

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Turn into" isDropdown>
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ignore-click-outside/toolbar min-w-0" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type)
            focusEditor(editor)
          }}
          label="Turn into"
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem key={itemValue} className="min-w-[180px]" value={itemValue}>
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
