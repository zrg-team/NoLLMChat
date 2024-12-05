import type { FileSystemTree } from '@webcontainer/api'

export const SOURCE_BASES = ['vite-vue', 'shadcn-react-vite']

export const getSourceBase = async (sourceBase: string): Promise<FileSystemTree> => {
  switch (sourceBase) {
    case 'vite-vue':
      return import('./vite-vue').then((module) => module.VITE_VUE_BASE)
    case 'shadcn-react-vite':
      return import('./shadcn-react-vite').then((module) => module.SHADCN_REACT_VITE_BASE)
    default:
      throw new Error(`Unknown source base: ${sourceBase}`)
  }
}
