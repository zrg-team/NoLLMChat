/* eslint-disable @typescript-eslint/no-explicit-any */
import { slateToRemark } from 'remark-slate-transformer'
import { unified } from 'unified'
import { Node as SlateNode } from 'slate'
import gfm from 'remark-gfm'
import stringify from 'remark-stringify'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, TCodeBlockElement } from '@udecode/plate-code-block'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { MARK_BOLD, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_CODE } from '@udecode/plate-basic-marks'
import { ELEMENT_LINK } from '@udecode/plate-link'
import { ELEMENT_UL, ELEMENT_OL, ELEMENT_LI, ELEMENT_LIC } from '@udecode/plate-list'
import { ELEMENT_MENTION, ELEMENT_MENTION_INPUT, TMentionElement } from '@udecode/plate-mention'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { TElement } from '@udecode/plate-common'
import { visit } from 'unist-util-visit'
import { map } from 'unist-util-map'

type SlateBuilder = (node: unknown, next: (children: any[]) => any) => object | undefined

const buildBlockquote: SlateBuilder = (node, next) => ({
  type: 'blockquote',
  children: next((node as TElement).children),
})

const buildCodeBlock: SlateBuilder = (node) => {
  let value = ''
  visit(
    { type: 'root', children: (node as TCodeBlockElement).children },
    ELEMENT_CODE_LINE,
    (node, index, parent) => {
      value += (node as TElement).children?.at(0)?.text ?? ''
      if (index < (parent as TCodeBlockElement).children?.length - 1) {
        value += '\n'
      }
    },
  )
  return {
    type: 'code',
    lang: (node as TElement).lang,
    value,
  }
}

const buildLink: SlateBuilder = (node, next) => ({
  type: 'link',
  url: (node as TElement).url,
  children: next((node as TElement).children),
})
const buildH1: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 1,
  children: next((node as TElement).children),
})
const buildH2: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 2,
  children: next((node as TElement).children),
})
const buildH3: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 3,
  children: next((node as TElement).children),
})
const buildH4: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 4,
  children: next((node as TElement).children),
})
const buildH5: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 5,
  children: next((node as TElement).children),
})
const buildH6: SlateBuilder = (node, next) => ({
  type: 'heading',
  depth: 6,
  children: next((node as TElement).children),
})
const buildUl: SlateBuilder = (node, next) => ({
  type: 'list',
  ordered: false,
  spread: false,
  children: next((node as TElement).children),
})
const buildOl: SlateBuilder = (node, next) => ({
  type: 'list',
  ordered: true,
  spread: false,
  children: next((node as TElement).children),
})
const buildLi: SlateBuilder = (node, next) => ({
  type: 'listItem',
  spread: false,
  children: next((node as TElement).children),
})
const buildMention: SlateBuilder = (node, next) => ({
  type: 'paragraph',
  children: next([
    { text: `@${(node as TMentionElement).value}`, inlineCode: true },
    { text: ' ' },
  ]),
})
const buildMentionInput: SlateBuilder = (node, next) => ({
  type: 'paragraph',
  children: next((node as TElement).children),
})
const buildParagraph: SlateBuilder = (node, next) => ({
  type: 'paragraph',
  children: next((node as TElement).children),
})

const PLATE_MODIFIER_TO_SLATE: Record<string, string> = {
  [MARK_BOLD]: 'strong',
  [MARK_ITALIC]: 'emphasis',
  [MARK_STRIKETHROUGH]: 'delete',
  [MARK_CODE]: 'inlineCode',
}

const toCorrectSlateDecoration = (nodeList: TElement[]) =>
  // @ts-expect-error TODO: fix type checking
  map<TElement>({ type: 'root', children: nodeList }, (node) => {
    if (typeof node.text === 'string') {
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => [PLATE_MODIFIER_TO_SLATE[key] ?? key, value]),
      )
    }
    return node
  }).children as SlateNode[]

const trimTextPlugin = () => {
  return (tree: any) => {
    visit(tree, 'text', (node) => {
      node.value = node.value.trim()
    })
  }
}

const toRemarkProcessor = unified().use(gfm).use(stringify).use(trimTextPlugin)

export function toMd(value: SlateNode[]) {
  const slate = toCorrectSlateDecoration(value as TElement[])
  const mdast = toRemarkProcessor.runSync(
    slateToRemark(slate, {
      overrides: {
        [ELEMENT_BLOCKQUOTE]: buildBlockquote,
        [ELEMENT_CODE_BLOCK]: buildCodeBlock,
        [ELEMENT_LINK]: buildLink,
        [ELEMENT_H1]: buildH1,
        [ELEMENT_H2]: buildH2,
        [ELEMENT_H3]: buildH3,
        [ELEMENT_H4]: buildH4,
        [ELEMENT_H5]: buildH5,
        [ELEMENT_H6]: buildH6,
        [ELEMENT_UL]: buildUl,
        [ELEMENT_OL]: buildOl,
        [ELEMENT_LI]: buildLi,
        [ELEMENT_LIC]: buildParagraph,
        [ELEMENT_MENTION]: buildMention,
        [ELEMENT_MENTION_INPUT]: buildMentionInput,
        [ELEMENT_PARAGRAPH]: buildParagraph,
      },
    }),
  )
  // @ts-expect-error TODO: fix type checking
  return toRemarkProcessor.stringify(mdast)
}
