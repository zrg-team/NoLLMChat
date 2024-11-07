import type { Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react'

export type HomePageContextType = {
  initializing?: boolean
  nodes: Node[]
  edges: Edge[]
  updateNodeChanges: (changes: NodeChange<Node>[]) => void
  updateEdgeChanges: (changes: EdgeChange<Edge>[]) => void
  updateEdgeConnection: (connection: Connection) => void
}
