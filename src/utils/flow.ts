import { Connection, Node, Edge } from '@xyflow/react'
import { FlowEdge, FlowNode } from 'src/services/database/types'
import { EntityTypes } from 'src/services/database/types'

export const nodeFlowToNode = (node: FlowNode, entity?: EntityTypes): Node => {
  return {
    id: node.id,
    type: node.node_type,
    position: {
      x: node.x || 0,
      y: node.y || 0,
    },
    data: {
      entity,
      loading: false,
      FlowNode: node,
    },
  }
}

export const nodeFlowToEdge = (edge: FlowEdge): Edge => {
  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    targetHandle: edge.targetHandle,
    sourceHandle: edge.sourceHandle,
  }
}

export const filterUserConnections = (connections: Connection[]) => {
  return connections.filter((connection) =>
    'edgeId' in connection ? `${connection.edgeId}`.startsWith('xy-edge__') : false,
  )
}
