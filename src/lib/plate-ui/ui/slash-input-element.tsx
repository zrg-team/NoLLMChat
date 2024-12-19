'use client'

import { withRef } from '@udecode/cn'
import { AIChatPlugin } from '@udecode/plate-ai/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { CodeBlockPlugin } from '@udecode/plate-code-block/react'
import { type PlateEditor, ParagraphPlugin } from '@udecode/plate-common/react'
import { DatePlugin } from '@udecode/plate-date/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { TocPlugin } from '@udecode/plate-heading/react'
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list'
import { TablePlugin } from '@udecode/plate-table/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { insertBlock, insertInlineElement } from 'src/components/organisms/editor/transforms'

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox'
import { PlateElement } from './plate-element'

type Group = {
  group: string
  items: Item[]
}

interface Item {
  icon: React.ReactNode

  onSelect: (editor: PlateEditor, value: string) => void

  value: string
  className?: string
  focusEditor?: boolean
  keywords?: string[]
  label?: string
}

const groups: Group[] = [
  {
    group: 'AI',
    items: [
      {
        focusEditor: false,
        icon: <LazyIcon name='sparkles' />,
        value: 'AI',
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show()
        },
      },
    ],
  },
  {
    group: 'Basic blocks',
    items: [
      {
        icon: <LazyIcon name='pilcrow' />,
        keywords: ['paragraph'],
        label: 'Text',
        value: ParagraphPlugin.key,
      },
      {
        icon: <LazyIcon name='heading-1' />,
        keywords: ['title', 'h1'],
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        icon: <LazyIcon name='heading-2' />,
        keywords: ['subtitle', 'h2'],
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        icon: <LazyIcon name='heading-3' />,
        keywords: ['subtitle', 'h3'],
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
      },
      {
        icon: <LazyIcon name='list' />,
        keywords: ['unordered', 'ul', '-'],
        label: 'Bulleted',
        value: ListStyleType.Disc,
      },
      {
        icon: <LazyIcon name='list-ordered' />,
        keywords: ['ordered', 'ol', '1'],
        label: 'Numbered',
        value: ListStyleType.Decimal,
      },
      {
        icon: <LazyIcon name='square' />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'To-do list',
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <LazyIcon name='chevron-right' />,
        keywords: ['collapsible', 'expandable'],
        label: 'Toggle',
        value: TogglePlugin.key,
      },
      {
        icon: <LazyIcon name='code' />,
        keywords: ['```'],
        label: 'Code Block',
        value: CodeBlockPlugin.key,
      },
      {
        icon: <LazyIcon name='table' />,
        label: 'Table',
        value: TablePlugin.key,
      },
      {
        icon: <LazyIcon name='quote' />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: 'Blockquote',
        value: BlockquotePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },
  {
    group: 'Advanced blocks',
    items: [
      {
        icon: <LazyIcon name='table-of-contents' />,
        keywords: ['toc'],
        label: 'Table of contents',
        value: TocPlugin.key,
      },
      {
        icon: <LazyIcon name='columns-3' />,
        label: '3 columns',
        value: 'action_three_columns',
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value)
      },
    })),
  },
  {
    group: 'Inline',
    items: [
      {
        focusEditor: true,
        icon: <LazyIcon name='calendar' />,
        keywords: ['time'],
        label: 'Date',
        value: DatePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value)
      },
    })),
  },
]

export const SlashInputElement = withRef<typeof PlateElement>(({ ...props }, ref) => {
  const { children, editor, element } = props

  return (
    <PlateElement ref={ref} as="span" data-slate-value={element.value} {...props}>
      <InlineCombobox element={element} trigger="/">
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(({ focusEditor, icon, keywords, label, value, onSelect }) => (
                <InlineComboboxItem
                  key={value}
                  value={value}
                  onClick={() => onSelect(editor, value)}
                  label={label}
                  focusEditor={focusEditor}
                  group={group}
                  keywords={keywords}
                >
                  <div className="mr-2 text-muted-foreground">{icon}</div>
                  {label ?? value}
                </InlineComboboxItem>
              ))}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {children}
    </PlateElement>
  )
})
