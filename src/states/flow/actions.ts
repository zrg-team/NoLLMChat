import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
  type Edge,
  type Node,
} from '@xyflow/react'
import { nanoid } from 'nanoid'
import deepmerge from 'deepmerge'
import {
  AppEntityNames,
  EntityArrayTypes,
  EntityTypes,
  FlowEdge,
  FlowNode,
} from 'src/services/database/types'
import { In, type FindManyOptions } from 'src/services/database/typeorm-wrapper'
import type { GetState, SetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'
import {
  flowEdgesToEdgeChanges,
  flowEdgeToEdge,
  flowNodesToNodeChanges,
  flowNodeToNode,
} from 'src/utils/flow'
import { logWarn } from 'src/utils/logger'

import { defaultFlowState, FlowState } from './state'
import { useSessionState } from '../session'

export interface FlowStateActions {
  reset: () => void
  // Database node
  findFlowNodesWithSource: (
    query: FindManyOptions<FlowNode>,
    option?: { clean?: boolean },
  ) => Promise<FlowNode[]>
  findFlowEdges: (
    query?: FindManyOptions<FlowEdge>,
    option?: { clean?: boolean },
  ) => Promise<FlowEdge[]>
  deleteFlowNode: (node: Partial<FlowNode>) => Promise<void>
  deleteFlowEdge: (edge: Partial<FlowEdge>) => Promise<void>
  createOrUpdateFlowNode: (
    node: Partial<FlowNode>,
    options?: { lazy?: boolean },
  ) => Promise<FlowNode | undefined>
  createOrUpdateFlowEdge: (
    edge: Partial<FlowEdge>,
    options?: { lazy?: boolean },
  ) => Promise<FlowEdge | undefined>
  // Handle change queue
  pushSyncNodeQueue: (syncType: `${AppEntityNames}`, query: FindManyOptions<FlowNode>) => void
  pushSyncEdgeQueue: () => void
  removeSyncNodeQueue: (timestamps: number[]) => void
  removeSyncEdgeQueue: (timestamps: number[]) => void
  // Real flow node
  setNodes: (newNodes: Node[] | ((old: Node[]) => Node[])) => void
  setEdges: (newEdges: Edge[] | ((old: Edge[]) => Edge[])) => void
  updateNodes: (changes: NodeChange<Node>[]) => void
  updateEdges: (changes: EdgeChange<Edge>[]) => void
  flowNodesToNodes: (newNodes: FlowNode[]) => void
  flowEdgesToEdges: (newEdges: FlowEdge[]) => void
  addConnectionToEdges: (connection: Connection) => void
  // Update directly no additional logic
  updateFlowNode: (node: Partial<FlowNode>, options?: { silent?: boolean }) => Promise<void>
  getNodes: (nodeIds: string[]) => Node[]
}

export const findFlowNodesWithSource = async (query: FindManyOptions<FlowNode>) => {
  const flowNodes = await getRepository('FlowNode').find(query)
  const entityGroups = flowNodes.reduce(
    (all: Partial<Record<`${AppEntityNames}`, FlowNode[]>>, node) => {
      if (!all[node.source_type]) {
        all[node.source_type] = []
      }
      all[node.source_type]?.push(node)
      return all
    },
    {},
  )
  const flowNodeDatas: Partial<Record<`${AppEntityNames}`, EntityArrayTypes>> = {}
  await Promise.all(
    Object.entries(entityGroups).map(async ([key, groupNodes]) => {
      const entityName = key as AppEntityNames
      flowNodeDatas[entityName] = (await getRepository(entityName).find({
        where: {
          id: In(groupNodes.map((node) => node.source_id)),
        },
      })) as EntityArrayTypes
    }),
  )
  return {
    flowNodes,
    entityGroups,
    flowNodeDatas,
  }
}

export const getFlowStateActions = (
  set: SetState<FlowState>,
  get: GetState<FlowState>,
): FlowStateActions => {
  return {
    reset: () => {
      set(defaultFlowState)
    },
    setNodes: (newNodes) => {
      if (typeof newNodes === 'function') {
        set({ nodes: newNodes(get().nodes) })
        return
      }
      set({ nodes: newNodes })
    },
    setEdges: (newEdges) => {
      if (typeof newEdges === 'function') {
        set({ edges: newEdges(get().edges) })
        return
      }
      set({ edges: newEdges })
    },
    updateNodes: (changes) => {
      const nodes = get().nodes
      set({ nodes: applyNodeChanges(changes, nodes) })
    },
    updateEdges: (changes) => {
      const edges = get().edges
      set({ edges: applyEdgeChanges(changes, edges) })
    },
    addConnectionToEdges: (connection: Connection) => {
      const edges = get().edges
      set({ edges: addEdge(connection, edges) })
    },
    flowNodesToNodes: (
      flowNodes,
      flowNodeDatas: Partial<Record<`${AppEntityNames}`, EntityArrayTypes>> = {},
    ) => {
      const currentNodes = get().nodes
      const { changes } = flowNodesToNodeChanges(flowNodes, currentNodes, flowNodeDatas)
      set({ nodes: applyNodeChanges(changes, currentNodes) })
    },
    flowEdgesToEdges: (flowEdges) => {
      const currentEdges = get().edges
      const { changes, updatedIds, deletedIds } = flowEdgesToEdgeChanges(flowEdges, currentEdges)
      // Remove unused edges
      currentEdges.forEach((edge) => {
        if (!updatedIds.includes(edge.id)) {
          deletedIds.push(edge.id)
        }
      })
      deletedIds.forEach((id) => {
        changes.push({ type: 'remove' as const, id: id })
      })
      set({ edges: applyEdgeChanges(changes, currentEdges) })
    },
    getNodes: (nodeIds) => {
      const nodes = get().nodes
      return nodes.filter((node) => nodeIds.includes(node.id))
    },
    removeSyncNodeQueue: (timestamps) => {
      const { syncNodeQueue } = get()
      for (const timestamp of timestamps) {
        const index = syncNodeQueue.findIndex((item) => item.timestamp === timestamp)
        if (index > -1) {
          syncNodeQueue.splice(index, 1)
        }
      }
      set({ syncNodeQueue })
    },
    removeSyncEdgeQueue: (timestamps) => {
      const { syncEdgeQueue } = get()
      for (const timestamp of timestamps) {
        const index = syncEdgeQueue.findIndex((item) => item.timestamp === timestamp)
        if (index > -1) {
          syncEdgeQueue.splice(index, 1)
        }
      }
      set({ syncEdgeQueue })
    },
    pushSyncNodeQueue: (syncType, query) => {
      const { syncNodeQueue } = get()
      set({
        syncNodeQueue: [...syncNodeQueue, { query, timestamp: Date.now(), syncType }],
      })
    },
    pushSyncEdgeQueue: () => {
      const { syncEdgeQueue } = get()
      set({
        syncEdgeQueue: [...syncEdgeQueue, { timestamp: Date.now() }],
      })
    },
    findFlowNodesWithSource: async (query, option) => {
      try {
        set({ flowNodeLoading: true })
        const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource(query)

        if (option?.clean) {
          set({
            flowNodes: flowNodes,
            nodes: flowNodes.map((item) => {
              const source = flowNodeDatas?.[item.source_type]?.find(
                (data) => data.id === item.source_id,
              )
              return flowNodeToNode(item, { data: source })
            }),
          })
        } else {
          const currentFlowNodes = get().flowNodes
          const ids = flowNodes.map((node) => node.id)
          const currentNodes = get().nodes
          const { changes } = flowNodesToNodeChanges(flowNodes, currentNodes, flowNodeDatas)
          set({
            flowNodes: [...currentFlowNodes.filter((item) => !ids.includes(item.id)), ...flowNodes],
            nodes: applyNodeChanges(changes, currentNodes),
          })
        }
        return flowNodes
      } finally {
        set({ flowNodeLoading: false })
      }
    },
    findFlowEdges: async (query, option) => {
      try {
        set({ flowEdgeLoading: true })
        const flowEdges = await getRepository('FlowEdge').find(query)
        const currentflowEdges = get().flowEdges
        const ids = flowEdges.map((edge) => edge.id)

        if (option?.clean) {
          set({
            flowEdges,
            edges: flowEdges.map((item) => flowEdgeToEdge(item)),
          })
        } else {
          const currentEdges = get().edges
          const { changes } = flowEdgesToEdgeChanges(flowEdges, currentEdges)
          set({
            flowEdges: [...currentflowEdges.filter((item) => !ids.includes(item.id)), ...flowEdges],
            edges: applyEdgeChanges(changes, currentEdges),
          })
        }
        return flowEdges
      } finally {
        set({ flowEdgeLoading: false })
      }
    },
    deleteFlowNode: async (node) => {
      try {
        if (!node.id && !node.source_type && !node.source_id) {
          throw new Error('Missing flow node indentify')
        }
        const currentNode = await getRepository('FlowNode').findOne({
          where: node.id
            ? { id: node.id }
            : {
                source_type: node.source_type,
                source_id: node.source_id,
              },
        })
        if (currentNode) {
          await getRepository('FlowNode').delete(currentNode.id)
          const flowNodes = get().flowNodes
          if (currentNode.source_type && currentNode.source_id) {
            await getRepository(currentNode.source_type)
              .delete(currentNode.source_id)
              .catch((error) => {
                logWarn(
                  'Failed to delete source entity',
                  currentNode.source_type,
                  currentNode.source_id,
                  error,
                )
              })
          }

          const nodes = get().nodes
          set({
            flowNodes: flowNodes.filter((item) => item.id !== currentNode.id),
            nodes: applyNodeChanges([{ type: 'remove', id: currentNode.id }], nodes),
          })
        }
      } catch (error) {
        logWarn('Failed to delete flow node', error)
      }
    },
    deleteFlowEdge: async (edge) => {
      try {
        if (!edge.id && !edge.source && !edge.target) {
          throw new Error('Missing flow edge indentify')
        }
        const currentEdge = await getRepository('FlowEdge').findOne({
          where: edge.id
            ? { id: edge.id }
            : {
                source: edge.source,
                target: edge.target,
              },
        })
        if (currentEdge) {
          await getRepository('FlowEdge').delete(currentEdge.id)
          const flowEdges = get().flowEdges

          set({
            flowEdges: flowEdges.filter((item) => item.id !== currentEdge.id),
          })
        }
      } catch (error) {
        logWarn('Failed to delete flow edge', error)
      }
    },
    updateFlowNode: async (inputNode, options) => {
      try {
        const currentSession = useSessionState.getState().currentSession
        if (!currentSession?.id) {
          throw new Error('Session not found')
        }
        if (!inputNode.id) {
          throw new Error('Missing flow node indentify')
        }

        await getRepository('FlowNode').update(inputNode.id, inputNode)

        const flowNodes = get().flowNodes

        const newFlowNodes = flowNodes.map((item) => {
          if (item.id === inputNode.id) {
            return {
              ...item,
              ...inputNode,
            }
          }
          return item
        })

        set({
          flowNodes: options?.silent ? newFlowNodes : [...newFlowNodes],
        })
      } catch (error) {
        logWarn('Failed to create or update flow node', error, inputNode)
      }
    },
    createOrUpdateFlowNode: async (inputNode, options) => {
      try {
        const currentSession = useSessionState.getState().currentSession
        if (!currentSession?.id) {
          throw new Error('Session not found')
        }
        if (!inputNode.id && (!inputNode.source_type || !inputNode.source_id)) {
          throw new Error('Missing flow node indentify')
        }

        let flowNode: FlowNode
        let currentNode = inputNode?.id
          ? get().flowNodes.find((item) => item.id === inputNode.id)
          : undefined

        // TODO: find in database if not found in current state
        if (!currentNode && (inputNode.id || (inputNode.source_type && inputNode.source_id))) {
          currentNode = await getRepository('FlowNode').findOne({
            where: inputNode.id
              ? { id: inputNode.id }
              : {
                  source_type: inputNode.source_type,
                  source_id: inputNode.source_id,
                },
          })
        }

        if (currentNode) {
          flowNode = deepmerge(currentNode, omitBy(inputNode, isUndefined))

          if (options?.lazy) {
            getRepository('FlowNode').update(currentNode.id, flowNode)
          } else {
            await getRepository('FlowNode').update(currentNode.id, flowNode)
          }
        } else if (inputNode.source_id && inputNode.source_type) {
          flowNode = {
            ...inputNode,
            source_id: `${inputNode.source_id}`,
            source_type: `${inputNode.source_type}` as AppEntityNames,
            node_type: inputNode.node_type || 'NEW_MESSAGE',
            session_id: inputNode.session_id || currentSession?.id,
          } as FlowNode
          if (options?.lazy) {
            flowNode.id = nanoid()
            getRepository('FlowNode').save(flowNode)
          } else {
            flowNode = await getRepository('FlowNode').save(flowNode)
          }
        } else {
          throw new Error('Missing source id and type')
        }

        let source: EntityTypes | undefined

        const currentNodeData = get().nodes.find((item) => item.id === flowNode.id)
        if (flowNode.source_type && !currentNodeData) {
          source = await getRepository(flowNode.source_type).findOne({
            where: { id: inputNode.source_id },
          })
        } else if (flowNode.source_type && currentNodeData) {
          source = currentNodeData?.data?.entity as EntityTypes
        }

        const flowNodes = get().flowNodes
        const nodes = get().nodes

        const { changes } = flowNodesToNodeChanges([flowNode], nodes, {
          [flowNode.source_type]: [source],
        })

        set({
          flowNodes: [...flowNodes.filter((item) => item.id !== flowNode.id), flowNode],
          nodes: applyNodeChanges(changes, nodes),
        })
        return flowNode
      } catch (error) {
        logWarn('Failed to create or update flow node', error, inputNode)
      }
    },
    createOrUpdateFlowEdge: async (inputEdge, options) => {
      try {
        const currentSession = useSessionState.getState().currentSession
        if (!currentSession?.id) {
          throw new Error('Session not found')
        }
        if (!inputEdge.id && (!inputEdge.source || !inputEdge.target)) {
          throw new Error('Missing flow node indentify')
        }
        let edge: FlowEdge

        let currentEdge = inputEdge?.id
          ? get().flowEdges.find((item) => item.id === inputEdge.id)
          : undefined

        if (currentEdge && (inputEdge.id || (inputEdge.source && inputEdge.target))) {
          currentEdge = await getRepository('FlowEdge').findOne({
            where: inputEdge.id
              ? { id: inputEdge.id }
              : {
                  source: inputEdge.source,
                  target: inputEdge.target,
                },
          })
        }
        if (currentEdge) {
          edge = deepmerge(currentEdge, omitBy(inputEdge, isUndefined))
          if (options?.lazy) {
            getRepository('FlowEdge').update(currentEdge.id, edge)
          } else {
            await getRepository('FlowEdge').update(currentEdge.id, edge)
          }
        } else if (inputEdge.source && inputEdge.target) {
          edge = {
            ...inputEdge,
            source: `${inputEdge.source}`,
            target: `${inputEdge.target}`,
            session_id: inputEdge.session_id || currentSession?.id,
          } as FlowEdge
          if (options?.lazy) {
            edge.id = nanoid()
            getRepository('FlowEdge').save(edge)
          } else {
            edge = await getRepository('FlowEdge').save(edge)
          }
        } else {
          throw new Error('Missing source and target')
        }

        const flowEdges = get().flowEdges
        const edges = get().edges

        set({
          flowEdges: [...flowEdges.filter((item) => item.id !== edge.id), edge],
          edges: applyEdgeChanges(flowEdgesToEdgeChanges([edge], edges).changes, edges),
        })
        return edge
      } catch (error) {
        logWarn('Failed to create or update flow node', error)
      }
    },
  }
}
