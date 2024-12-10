import { useMemo } from 'react'
import { withProps } from '@udecode/cn'
import type { BaseMessage } from '@langchain/core/messages'
import { AIPlugin } from '@udecode/plate-ai/react'
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { MarkdownPlugin } from '@udecode/plate-markdown'
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react'
import { Value } from '@udecode/plate-common'
import { ParagraphPlugin, PlateLeaf, usePlateEditor } from '@udecode/plate-common/react'
import { DatePlugin } from '@udecode/plate-date/react'
import { EmojiInputPlugin } from '@udecode/plate-emoji/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { TocPlugin } from '@udecode/plate-heading/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react'
import { LinkPlugin } from '@udecode/plate-link/react'
import { ImagePlugin } from '@udecode/plate-media/react'
import { SlashInputPlugin } from '@udecode/plate-slash-command/react'
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'

import { copilotPlugins } from 'src/components/organisms/editor/plugins/copilot-plugins'
import { editorPlugins } from 'src/components/organisms/editor/plugins/editor-plugins'
import { FixedToolbarPlugin } from 'src/components/organisms/editor/plugins/fixed-toolbar-plugin'
import { FloatingToolbarPlugin } from 'src/components/organisms/editor/plugins/floating-toolbar-plugin'
import { AILeaf } from 'src/lib/plate-ui/ui/ai-leaf'
import { BlockquoteElement } from 'src/lib/plate-ui/ui/blockquote-element'
import { CodeBlockElement } from 'src/lib/plate-ui/ui/code-block-element'
import { CodeLeaf } from 'src/lib/plate-ui/ui/code-leaf'
import { CodeLineElement } from 'src/lib/plate-ui/ui/code-line-element'
import { CodeSyntaxLeaf } from 'src/lib/plate-ui/ui/code-syntax-leaf'
import { ColumnElement } from 'src/lib/plate-ui/ui/column-element'
import { ColumnGroupElement } from 'src/lib/plate-ui/ui/column-group-element'
import { DateElement } from 'src/lib/plate-ui/ui/date-element'
import { EmojiInputElement } from 'src/lib/plate-ui/ui/emoji-input-element'
import { HeadingElement } from 'src/lib/plate-ui/ui/heading-element'
import { HighlightLeaf } from 'src/lib/plate-ui/ui/highlight-leaf'
import { HrElement } from 'src/lib/plate-ui/ui/hr-element'
import { ImageElement } from 'src/lib/plate-ui/ui/image-element'
import { KbdLeaf } from 'src/lib/plate-ui/ui/kbd-leaf'
import { LinkElement } from 'src/lib/plate-ui/ui/link-element'
import { ParagraphElement } from 'src/lib/plate-ui/ui/paragraph-element'
import { withPlaceholders } from 'src/lib/plate-ui/ui/placeholder'
import { SlashInputElement } from 'src/lib/plate-ui/ui/slash-input-element'
import { TableCellElement, TableCellHeaderElement } from 'src/lib/plate-ui/ui/table-cell-element'
import { TableElement } from 'src/lib/plate-ui/ui/table-element'
import { TableRowElement } from 'src/lib/plate-ui/ui/table-row-element'
import { TocElement } from 'src/lib/plate-ui/ui/toc-element'
import { ToggleElement } from 'src/lib/plate-ui/ui/toggle-element'
import { withDraggables } from 'src/lib/plate-ui/ui/with-draggables'

import { buildAIPlugins } from './plugins/ai-plugins'

export const useCreateEditor = ({
  defaultValue,
  copilotStream,
}: {
  defaultValue: Value
  copilotStream?: (
    message: string | BaseMessage[],
    onMessageUpdate: (chunk: string) => void,
  ) => void
}) => {
  const inputAIPlugins = useMemo(
    () =>
      buildAIPlugins({
        copilotStream,
      }),
    [copilotStream],
  )
  return usePlateEditor({
    override: {
      components: withDraggables(
        withPlaceholders({
          [AIPlugin.key]: AILeaf,
          [BlockquotePlugin.key]: BlockquoteElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodeLinePlugin.key]: CodeLineElement,
          [CodePlugin.key]: CodeLeaf,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [ColumnItemPlugin.key]: ColumnElement,
          [ColumnPlugin.key]: ColumnGroupElement,
          [DatePlugin.key]: DateElement,
          [EmojiInputPlugin.key]: EmojiInputElement,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
          [HighlightPlugin.key]: HighlightLeaf,
          [HorizontalRulePlugin.key]: HrElement,
          [ImagePlugin.key]: ImageElement,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
          [KbdPlugin.key]: KbdLeaf,
          [LinkPlugin.key]: LinkElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [SlashInputPlugin.key]: SlashInputElement,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TableCellPlugin.key]: TableCellElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [TocPlugin.key]: TocElement,
          [TogglePlugin.key]: ToggleElement,
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        }),
      ),
    },
    plugins: [
      ...copilotPlugins,
      ...editorPlugins,
      ...inputAIPlugins,
      FixedToolbarPlugin,
      FloatingToolbarPlugin,
      MarkdownPlugin,
    ],
    value:
      Array.isArray(defaultValue) && defaultValue?.length
        ? defaultValue
        : [
            {
              children: [{ text: 'NoLLMChat Playground' }],
              type: 'h1',
            },
          ],
  })
}
