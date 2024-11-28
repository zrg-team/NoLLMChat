import React from 'react'
import type { HomePageContextType } from './type'
import { NodeChange, Node, EdgeChange, Edge, Connection } from '@xyflow/react'

const defaultHomePageContext: HomePageContextType = {
  initializing: true,
  updateNodeChanges: function (changes: NodeChange<Node>[]): void {
    throw new Error(JSON.stringify(changes))
  },
  updateEdgeChanges: function (changes: EdgeChange<Edge>[]): void {
    throw new Error(JSON.stringify(changes))
  },
  updateEdgeConnection: function (connection: Connection): void {
    throw new Error(JSON.stringify(connection))
  },
}

export const HomePageContext = React.createContext<HomePageContextType>(defaultHomePageContext)
export const HomePageContextProvider = HomePageContext.Provider
