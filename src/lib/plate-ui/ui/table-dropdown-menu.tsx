'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { someNode } from '@udecode/plate-common'
import { focusEditor, useEditorPlugin, useEditorSelector } from '@udecode/plate-common/react'
import { deleteTable, insertTableRow } from '@udecode/plate-table'
import { TablePlugin, deleteColumn, deleteRow, insertTable } from '@udecode/plate-table/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

export function TableDropdownMenu(props: DropdownMenuProps) {
  const tableSelected = useEditorSelector(
    (editor) => someNode(editor, { match: { type: TablePlugin.key } }),
    [],
  )

  const { editor, tf } = useEditorPlugin(TablePlugin)

  const openState = useOpenState()

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Table" isDropdown>
          <LazyIcon name='table' />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex w-[180px] min-w-0 flex-col" align="start">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <LazyIcon name='table' />
              <span>Table</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                onSelect={() => {
                  insertTable(editor, {}, { select: true })
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='plus' />
                Insert table
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteTable(editor)
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='trash' />
                Delete table
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!tableSelected}>
              <LazyIcon name='rectangle-vertical' />
              <span>Column</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  tf.insert.tableColumn()
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='plus' />
                Insert column after
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteColumn(editor)
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='minus' />
                Delete column
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!tableSelected}>
              <LazyIcon name='rectangle-horizontal' />
              <span>Row</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  insertTableRow(editor)
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='plug' />
                Insert row after
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteRow(editor)
                  focusEditor(editor)
                }}
              >
                <LazyIcon name='minus' />
                Delete row
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
