import { Connection, Node, Edge, EdgeChange, NodeChange } from '@xyflow/react'
import deepmerge from 'deepmerge'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { EntityArrayTypes, EntityTypesMap, FlowEdge, FlowNode } from 'src/services/database/types'

export const flowNodeToNode = (node: FlowNode, data: Record<string, unknown>): Node => {
  return {
    id: node.id,
    type: node.node_type,
    position: {
      x: node.x || 0,
      y: node.y || 0,
    },
    width: node.width || undefined,
    height: node.height || undefined,
    data: {
      loading: false,
      flowNode: node,
      ...data,
    },
  }
}

export const flowEdgeToEdge = (edge: FlowEdge): Edge => {
  return {
    id: edge.id,
    target: edge.target,
    source: edge.target,
    targetHandle: edge.targetHandle,
    sourceHandle: edge.sourceHandle,
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

export const flowNodesToNodeChanges = (
  flowNodes: FlowNode[],
  currentNodes: Node[],
  flowNodeSources: Partial<Record<keyof EntityTypesMap, EntityArrayTypes>>,
): { changes: NodeChange[]; newIds: string[] } => {
  const newIds: string[] = []
  const changes = flowNodes.map((node) => {
    const oldNode = currentNodes.find((item) => node.id === item.id)
    if (!oldNode) {
      newIds.push(node.id)
    }

    const source = flowNodeSources?.[node.source_type]?.find((item) => item?.id === node.source_id)

    const newNode = flowNodeToNode(node, {
      ...oldNode?.data,
      entity: source,
    })

    return {
      type: oldNode ? 'replace' : 'add',
      id: node.id,
      item: oldNode
        ? deepmerge({ ...(oldNode || {}), data: undefined }, omitBy(newNode, isUndefined))
        : newNode,
    } as NodeChange
  })

  return {
    changes,
    newIds: [],
  }
}

export const flowEdgesToEdgeChanges = (
  flowEdges: FlowEdge[],
  currentEdges: Edge[],
): { changes: EdgeChange[]; updatedIds: string[]; deletedIds: string[] } => {
  const updatedIds: string[] = []
  const deletedIds: string[] = []
  const changes = flowEdges.map((item) => {
    const old = currentEdges.find(
      (edge) => item.source === edge.source && item.target === edge.target,
    )
    if (!old || old.id !== item.id) {
      // ID mismatch
      if (old) {
        deletedIds.push(old.id)
      }
      return {
        type: 'add' as const,
        item: nodeFlowToEdge(item),
      } as EdgeChange
    }
    updatedIds.push(item.id)
    return {
      type: 'replace' as const,
      item: nodeFlowToEdge(item),
    } as EdgeChange
  })
  currentEdges.forEach((edge) => {
    if (!updatedIds.includes(edge.id)) {
      deletedIds.push(edge.id)
    }
  })
  return {
    changes,
    updatedIds,
    deletedIds,
  }
}
