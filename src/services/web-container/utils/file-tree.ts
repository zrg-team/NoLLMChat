import { FileSystemTree } from '@webcontainer/api'
import { nanoid } from 'nanoid'

export interface ElementTree {
  id: string
  isSelectable: boolean
  name: string
  file: string
  content?: string
  children?: ElementTree[]
}

export function convertToElementsTree(
  tree: FileSystemTree,
  parentPath: string = '',
): ElementTree[] {
  const elements: ElementTree[] = []

  for (const [name, node] of Object.entries(tree)) {
    const id = nanoid()
    const path = [parentPath, name].filter(Boolean).join('/')
    const file = 'file' in node && 'contents' in node.file ? node.file : undefined
    const element: ElementTree = {
      id,
      isSelectable: true,
      content: typeof file?.contents === 'string' ? file.contents : undefined,
      file: path,
      name,
      children: [],
    }

    if ('directory' in node) {
      element.children = convertToElementsTree(node.directory, path)
    }

    elements.push(element)
  }

  return elements
}
