import { Edge, Node } from '@xyflow/react'
import { Dispatch, SetStateAction } from 'react'

export type HomePageContextType = {
  initializing?: boolean
  nodes: Node[]
  setNodes?: Dispatch<SetStateAction<Node[]>>
  edges: Edge[]
  setEdges?: Dispatch<SetStateAction<Edge[]>>
}
