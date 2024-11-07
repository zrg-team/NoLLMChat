import type { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react'

export type HomePageContextType = {
  initializing?: boolean
  updateNodeChanges: (changes: NodeChange<Node>[]) => void
  updateEdgeChanges: (changes: EdgeChange<Edge>[]) => void
  updateEdgeConnection: (connection: Connection) => void
}
