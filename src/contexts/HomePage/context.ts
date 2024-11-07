import React from 'react'

import type { HomePageContextType } from './type'
import { NodeChange, Node, EdgeChange, Edge } from '@xyflow/react'

const defaultHomePageContext: HomePageContextType = {
  initializing: true,
  nodes: [],
  edges: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNodeChanges: function (_changes: NodeChange<Node>[]): void {
    throw new Error('Function not implemented.')
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateEdgeChanges: function (_changes: EdgeChange<Edge>[]): void {
    throw new Error('Function not implemented.')
  },
}

export const HomePageContext = React.createContext<HomePageContextType>(defaultHomePageContext)
export const HomePageContextProvider = HomePageContext.Provider
