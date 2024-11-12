import { PropsWithChildren, useLayoutEffect } from 'react'
import { initIndexedDb } from './index'

export const FileSystemProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    const init = async () => {
      try {
        await initIndexedDb()
      } finally {
        window.removeEventListener('load', init)
      }
    }
    window.addEventListener('load', init)
    return () => {
      window.removeEventListener('load', init)
    }
  }, [])
  return children
}
