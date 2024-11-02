import React from 'react'

import type { HomePageContextType } from './type'

const defaultHomePageContext: HomePageContextType = {
  initializing: true,
  nodes: [],
  setNodes: undefined,
  edges: [],
  setEdges: undefined,
}

export const HomePageContext = React.createContext<HomePageContextType>(defaultHomePageContext)
export const HomePageContextProvider = HomePageContext.Provider
