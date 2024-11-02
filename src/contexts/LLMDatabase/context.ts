import React from 'react'

import type { LLMDatabaseContextType } from './type'

const defaultLLMDatabaseContext: LLMDatabaseContextType = {
  initializing: true,
  reload: () => Promise.resolve([]),
  llms: []
}

export const LLMDatabaseContext = React.createContext<LLMDatabaseContextType>(defaultLLMDatabaseContext)
export const LLMDatabaseContextProvider = LLMDatabaseContext.Provider
