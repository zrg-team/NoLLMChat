import type { FlowEdge, FlowNode, AppEntityNames } from 'src/services/database/types'
import { FindManyOptions } from 'typeorm'

export interface FlowState {
  flowEdgeMap: Record<string, FlowEdge>
  flowNodeMap: Record<string, FlowNode>
  flowEdges: FlowEdge[]
  flowNodes: FlowNode[]
  ready: boolean
  flowEdgeLoading?: boolean
  flowNodeLoading?: boolean
  syncedNodes: string[]
  syncedEdges: string[]
  handleNodes: string[]
  handleEdges: string[]
  syncNodeQueue: {
    query: FindManyOptions<FlowNode>
    timestamp: number
    syncType: `${AppEntityNames}`
  }[]
  syncEdgeQueue: { timestamp: number }[]
}

export const defaultFlowState: FlowState = {
  flowNodeMap: {},
  flowEdgeMap: {},
  flowNodes: [],
  flowEdges: [],
  ready: true,
  flowEdgeLoading: false,
  flowNodeLoading: false,
  syncedNodes: [],
  syncedEdges: [],
  handleNodes: [],
  handleEdges: [],
  syncNodeQueue: [],
  syncEdgeQueue: [],
}
