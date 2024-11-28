/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified'
import markdown from 'remark-parse'
import { remarkToSlate } from 'remark-slate-transformer'
import { produce } from 'immer'
import { visit } from 'unist-util-visit'
import { map } from 'unist-util-map'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { Value } from '@udecode/plate-common'
import { v4 } from 'uuid'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from '@udecode/plate-code-block'
import { ELEMENT_LINK } from '@udecode/plate-link'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'
import { MARK_BOLD, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_CODE } from '@udecode/plate-basic-marks'

type MyNode = {
  children: MyNode[]
  id?: string
  type: string
  lang?: string
  url?: string
  ordered?: boolean
  depth?: number
  value?: string
  text?: string
}

type MdastBuilder = (node: unknown, next: (children: any[]) => any) => object | undefined

const PLATE_MODIFIER_TO_SLATE: Record<string, string> = {
  strong: MARK_BOLD,
  emphasis: MARK_ITALIC,
  delete: MARK_STRIKETHROUGH,
  inlineCode: MARK_CODE,
}
const toCorrectPlateDecoration = (nodeList: MyNode[]) =>
  // @ts-expect-error TODO: fix type checking
  map<MyNode>({ type: 'root', children: nodeList }, (node) => {
    if (typeof node.text === 'string') {
      return Object.fromEntries(
        Object.entries(node).map(([key, value]) => [PLATE_MODIFIER_TO_SLATE[key] ?? key, value]),
      )
    }
    return node
  }).children

const removeParagraph = (nodeList: MyNode[], parentType: string) => {
  return produce({ type: 'root', children: nodeList }, (draft) => {
    visit(draft, parentType, (node: MyNode) => {
      node.children = node.children.map((child) => {
        if (child.type === 'p') {
          return child.children.at(0)!
        }
        return child
      })
    })
  }).children
}

const changeListItemParagraphToLic = (nodeList: MyNode[]) => {
  return produce({ type: 'root', children: nodeList }, (draft) => {
    visit(draft, 'li', (node: MyNode) => {
      node.children = node.children.map((child) => ({ ...child, type: 'lic' }))
    })
  }).children
}

const buildBlockquote: MdastBuilder = (node, next) => ({
  type: ELEMENT_BLOCKQUOTE,
  id: v4(),
  children: next((node as MyNode).children),
})
const buildHeading: MdastBuilder = (node, next) => ({
  type: `h${(node as MyNode).depth}`,
  id: v4(),
  children: next((node as MyNode).children),
})
const buildCodeBlock: MdastBuilder = (node) => ({
  type: ELEMENT_CODE_BLOCK,
  id: v4(),
  lang: (node as MyNode).lang,
  children: [{ type: ELEMENT_CODE_LINE, children: [{ text: (node as MyNode).value }] }],
})
const buildLink: MdastBuilder = (node, next) => ({
  type: ELEMENT_LINK,
  id: v4(),
  url: (node as MyNode).url,
  children: next((node as MyNode).children),
})
const buildParagraph: MdastBuilder = (node, next) => ({
  type: ELEMENT_PARAGRAPH,
  id: v4(),
  children: next((node as MyNode).children),
})
const buildList: MdastBuilder = (node, next) => ({
  type: (node as MyNode).ordered ? ELEMENT_OL : ELEMENT_UL,
  id: v4(),
  children: next((node as MyNode).children),
})
const buildListItem: MdastBuilder = (node, next) => ({
  type: ELEMENT_LI,
  id: v4(),
  children: next((node as MyNode).children),
})

const processor = unified()
  .use(markdown)
  .use(remarkToSlate, {
    overrides: {
      blockquote: buildBlockquote,
      code: buildCodeBlock,
      link: buildLink,
      heading: buildHeading,
      paragraph: buildParagraph,
      list: buildList,
      listItem: buildListItem,
    },
  })

export function toPlate(text: string) {
  let ast = processor.processSync(text).result
  ast = removeParagraph(ast as MyNode[], ELEMENT_BLOCKQUOTE)
  ast = changeListItemParagraphToLic(ast as MyNode[])
  ast = toCorrectPlateDecoration(ast as MyNode[])
  if (ast.length === 0) {
    return [
      {
        id: v4(),
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
      },
    ] as Value
  }
  return ast as Value
}
