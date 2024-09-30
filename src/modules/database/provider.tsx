import { FunctionComponent, PropsWithChildren, useLayoutEffect } from 'react'
import { initDatabase } from './index'

export const DatabaseProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useLayoutEffect(() => {
    initDatabase()
  }, [])
  return children
}
