import type { Edge, Node } from '@xyflow/react'
import { SESSION_INFO_NODE, TOOLBOX_NODE } from 'src/constants/nodes'
import type { FlowEdge, FlowNode, AppEntityNames } from 'src/services/database/types'
import { FindManyOptions } from 'typeorm'

export interface FlowState {
  flowEdges: FlowEdge[]
  flowNodes: FlowNode[]
  ready: boolean
  flowEdgeLoading?: boolean
  flowNodeLoading?: boolean
  syncedNodes: string[]
  syncedEdges: string[]
  syncNodeQueue: {
    query: FindManyOptions<FlowNode>
    timestamp: number
    syncType: `${AppEntityNames}`
  }[]
  syncEdgeQueue: { timestamp: number }[]
  edges: Edge[]
  nodes: Node[]
}

export const defaultFlowState: FlowState = {
  flowNodes: [],
  flowEdges: [],
  ready: true,
  flowEdgeLoading: false,
  flowNodeLoading: false,
  syncedNodes: [],
  syncedEdges: [],
  syncNodeQueue: [],
  syncEdgeQueue: [],
  edges: [],
  nodes: [TOOLBOX_NODE, SESSION_INFO_NODE],
}
