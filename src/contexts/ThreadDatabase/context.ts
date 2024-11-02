import React from 'react'

import type { ThreadMDatabaseContextType } from './type'

const defaultThreadMDatabaseContext: ThreadMDatabaseContextType = {
  initializing: true,
  reload: () => Promise.resolve([]),
  threads: []
}

export const ThreadDatabaseContext = React.createContext<ThreadMDatabaseContextType>(defaultThreadMDatabaseContext)
export const ThreadDatabaseContextProvider = ThreadDatabaseContext.Provider
