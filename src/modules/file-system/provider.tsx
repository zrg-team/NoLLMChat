import { PropsWithChildren, useLayoutEffect } from 'react'
import { initIndexedDb } from './index'

const toSizeString = (bytes?: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === undefined) return 'Unknown size'
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`
}

navigator.storage.estimate().then((estimate) => {
  if (estimate) {
    console.log(`Using ${toSizeString(estimate.usage)} out of ${toSizeString(estimate?.quota)}.`)
  }
})

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
