import type { FileSystemTree } from '@webcontainer/api'

export const SOURCE_BASES = [
  'shadcn-react-vite',
  'vite-vue',
  'empty-source',
  'todo-app-react-vite',
] as const

export const getSourceBase = async (sourceBase: string): Promise<FileSystemTree> => {
  switch (sourceBase) {
    case 'empty-source':
      return import('./empty-source').then((module) => module.BASE)
    case 'vite-vue':
      return import('./vite-vue').then((module) => module.BASE)
    case 'shadcn-react-vite':
      return import('./shadcn-react-vite').then((module) => module.BASE)
    case 'todo-app-react-vite':
      return import('./todo-app-react-vite').then((module) => module.BASE)
    default:
      throw new Error(`Unknown source base: ${sourceBase}`)
  }
}
