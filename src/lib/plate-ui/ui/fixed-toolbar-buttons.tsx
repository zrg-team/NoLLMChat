'use client'

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import { useEditorReadOnly } from '@udecode/plate-common/react'
import { FontBackgroundColorPlugin, FontColorPlugin } from '@udecode/plate-font/react'
import { ListStyleType } from '@udecode/plate-indent-list'
import { ImagePlugin } from '@udecode/plate-media/react'
import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  PointerIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from 'lucide-react'

import { MoreDropdownMenu } from 'src/lib/plate-ui/ui/more-dropdown-menu'

import { AIToolbarButton } from './ai-toolbar-button'
import { AlignDropdownMenu } from './align-dropdown-menu'
import { ColorDropdownMenu } from './color-dropdown-menu'
import { EmojiDropdownMenu } from './emoji-dropdown-menu'
import { ExportToolbarButton } from './export-toolbar-button'
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button'
import { IndentListToolbarButton } from './indent-list-toolbar-button'
import { IndentTodoToolbarButton } from './indent-todo-toolbar-button'
import { IndentToolbarButton } from './indent-toolbar-button'
import { InsertDropdownMenu } from './insert-dropdown-menu'
import { LineHeightDropdownMenu } from './line-height-dropdown-menu'
import { LinkToolbarButton } from './link-toolbar-button'
import { MarkToolbarButton } from './mark-toolbar-button'
import { MediaToolbarButton } from './media-toolbar-button'
import { ModeDropdownMenu } from './mode-dropdown-menu'
import { OutdentToolbarButton } from './outdent-toolbar-button'
import { TableDropdownMenu } from './table-dropdown-menu'
import { ToggleToolbarButton } from './toggle-toolbar-button'
import { ToolbarButton, ToolbarGroup } from './toolbar'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <ToolbarButton className="cursor-grab">
              <PointerIcon size={24} />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <AIToolbarButton tooltip="AI commands">
              <WandSparklesIcon />
            </AIToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+M)">
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>

            <ColorDropdownMenu nodeType={FontColorPlugin.key} tooltip="Text color">
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu nodeType={FontBackgroundColorPlugin.key} tooltip="Background color">
              <PaintBucketIcon />
            </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu />

            <IndentListToolbarButton nodeType={ListStyleType.Disc} />
            <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
            <MediaToolbarButton nodeType={ImagePlugin.key} />
          </ToolbarGroup>

          <ToolbarGroup>
            <LineHeightDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MoreDropdownMenu />
          </ToolbarGroup>
        </>
      )}

      <ToolbarGroup>
        <ExportToolbarButton>
          <ArrowUpToLineIcon />
        </ExportToolbarButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <ModeDropdownMenu />
      </ToolbarGroup>

      <div className="grow" />
    </div>
  )
}
