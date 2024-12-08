import type { DirectoryNode, FileNode, FileSystemTree } from '@webcontainer/api'
import { nanoid } from 'nanoid'
import { logWarn } from 'src/utils/logger'

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

export function parseJSONLToFileSystemTree(jsonl: string): FileSystemTree {
  const lines = jsonl.trim().split('\n')
  const root: FileSystemTree = {}

  lines.forEach((line) => {
    const { file, content } = JSON.parse(line)
    const parts = file.split('/')
    let currentNode: FileSystemTree = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      if (i === parts.length - 1) {
        // Last part is a file
        currentNode[part] = {
          file: {
            contents: content,
          },
        }
      } else {
        // Intermediate parts are directories
        if (!currentNode[part]) {
          currentNode[part] = {
            directory: {},
          }
        }
        currentNode = (currentNode[part] as DirectoryNode).directory
      }
    }
  })

  return root
}

export function parseFileSystemTreeToJSONL(tree: FileSystemTree): string {
  const lines: string[] = []

  function traverse(node: FileSystemTree, path: string[] = []) {
    for (const [name, value] of Object.entries(node)) {
      if ('file' in value) {
        // It's a file node
        const filePath = [...path, name].join('/')
        if ('contents' in value.file) {
          const content = value.file.contents
          lines.push(JSON.stringify({ file: filePath, content }))
        }
      } else if ('directory' in value) {
        // It's a directory node
        traverse(value.directory, [...path, name])
      }
    }
  }

  traverse(tree)
  return lines.join('\n')
}

export function updateFileContentOfFileSystemTree(
  tree: FileSystemTree,
  filePath: string,
  newContent: string | Uint8Array,
): FileSystemTree {
  // if filePath starts with './', remove it
  const parts = filePath.replace(/^\.\//, '').split('/')
  let currentNode: FileSystemTree | FileNode = tree

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]

    if (i === parts.length - 1) {
      // Last part should be the file
      if (part in currentNode && 'file' in currentNode[part]) {
        ;(currentNode[part] as FileNode).file.contents = newContent
      } else {
        logWarn(`Path "${filePath}" is not a file.`)
      }
    } else {
      if (part in currentNode && 'directory' in currentNode[part]) {
        currentNode = (currentNode[part] as DirectoryNode).directory
      } else {
        logWarn(`Path "${filePath}" does not exist.`)
        return tree
      }
    }
  }

  return tree
}
