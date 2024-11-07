import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { AppEntityNames, FlowEdge, FlowNode } from 'src/services/database/types'
import type { FindManyOptions } from 'src/services/database/typeorm-wrapper'
import type { GetState, SetState } from 'src/utils/zustand'
import { getRepository } from 'src/services/database'

import { FlowState } from './state'
import deepmerge from 'deepmerge'
import { useSessionState } from '../session'

export interface FlowStateActions {
  getFlowNodesBySource: (type: `${AppEntityNames}`) => FlowNode[]
  getFlowEdgesByNode: (node: FlowNode) => FlowEdge[]
  getFlowNodeBySource: (type: `${AppEntityNames}`, id: string) => FlowNode | undefined
  findFlowNodes: (query?: {
    where?: FindManyOptions<FlowNode>['where'] | undefined
  }) => Promise<FlowNode[]>
  findFlowEdges: (query?: {
    where: FindManyOptions<FlowEdge>['where'] | undefined
  }) => Promise<FlowEdge[]>
  deleteFlowNode: (node: Partial<FlowNode>) => Promise<void>
  deleteFlowEdge: (edge: Partial<FlowEdge>) => Promise<void>
  createOrUpdateFlowNode: (node: Partial<FlowNode>) => Promise<FlowNode | undefined>
  createOrUpdateFlowEdge: (edge: Partial<FlowEdge>) => Promise<FlowEdge | undefined>
  updateSyncedNodes: (nodeIds: string[]) => void
  updateSyncedEdges: (edgeIds: string[]) => void
  getFlowNodeById: (id: string) => FlowNode | undefined
  getFlowEdgeById: (id: string) => FlowEdge | undefined
  pushSyncNodeQueue: (syncType: `${AppEntityNames}`, query: FindManyOptions<FlowNode>) => void
  pushSyncEdgeQueue: () => void
  removeSyncNodeQueue: (timestamps: number[]) => void
  removeSyncEdgeQueue: (timestamps: number[]) => void
}

export const getFlowStateActions = (
  set: SetState<FlowState & FlowStateActions>,
  get: GetState<FlowState & FlowStateActions>,
): FlowStateActions => {
  return {
    removeSyncNodeQueue: (timestamps) => {
      const { syncNodeQueue } = get()
      // Immutable remove. Reference to the same array reference not create new instance. Filter will return new array instance.
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
      // Immutable remove. Reference to the same array reference not create new instance. Filter will return new array instance.
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
    getFlowNodeById: (id) => get().flowNodeMap[id],
    getFlowEdgeById: (id) => get().flowEdgeMap[id],
    updateSyncedNodes: (nodeIds) => {
      const handleNodes = get().handleNodes
      handleNodes.forEach((item, index) => {
        if (nodeIds.includes(item)) {
          handleNodes.splice(index, 1)
        }
      })
      set({ syncedNodes: nodeIds, handleNodes })
    },
    updateSyncedEdges: (edgeIds) => {
      const handleEdges = get().handleEdges
      handleEdges.forEach((item, index) => {
        if (edgeIds.includes(item)) {
          handleEdges.splice(index, 1)
        }
      })
      set({ syncedEdges: edgeIds, handleEdges })
    },
    getFlowNodesBySource: (type) => {
      return get().flowNodes.filter((node) => node.source_type === type)
    },
    getFlowEdgesByNode: (node) => {
      return get().flowEdges.filter((edge) => edge.source === node.id || edge.target === node.id)
    },
    findFlowNodes: async (query) => {
      try {
        set({ flowNodeLoading: true })
        const nodes = await getRepository('FlowNode').find(query)
        console.log('findFlowNodes nodes', query, nodes)
        const currentFlowNodeMap = get().flowNodeMap
        const newFlowNodeMap = nodes.reduce((map: Record<string, FlowNode>, node) => {
          const key = `${node.source_id}`
          if (currentFlowNodeMap[key]) {
            delete currentFlowNodeMap[key]
          }
          map[key] = node
          return map
        }, {})
        set({
          flowNodes: [...Object.values(currentFlowNodeMap), ...nodes],
          flowNodeMap: { ...currentFlowNodeMap, ...newFlowNodeMap },
        })
        return nodes
      } finally {
        set({ flowNodeLoading: false })
      }
    },
    findFlowEdges: async (query) => {
      try {
        set({ flowEdgeLoading: true })
        const edges = await getRepository('FlowEdge').find(query)
        const currentFlowEdgeMap = get().flowEdgeMap
        const newFlowNodeMap = edges.reduce((map: Record<string, FlowEdge>, edge) => {
          const key = `${edge.source}:${edge.target}`
          if (currentFlowEdgeMap[key]) {
            delete currentFlowEdgeMap[key]
          }
          map[key] = edge
          return map
        }, {})
        set({
          flowEdges: [...Object.values(currentFlowEdgeMap), ...edges],
          flowEdgeMap: { ...currentFlowEdgeMap, ...newFlowNodeMap },
        })
        return edges
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
          const flowNodeMap = get().flowNodeMap
          const handleNodes = get().handleNodes
          const flowNodes = get().flowNodes
          if (currentNode.source_type && currentNode.source_id) {
            await getRepository(currentNode.source_type)
              .delete(currentNode.source_id)
              .catch((error) => {
                console.warn(
                  'Failed to delete source entity',
                  currentNode.source_type,
                  currentNode.source_id,
                  error,
                )
              })
          }

          delete flowNodeMap[currentNode.id]
          set({
            flowNodeMap,
            flowNodes: flowNodes.filter((item) => item.id !== currentNode.id),
            handleNodes: handleNodes.filter((item) => item !== currentNode.id),
          })
        }
      } catch (error) {
        console.warn('Failed to delete flow node', error)
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
          const flowEdgeMap = get().flowEdgeMap
          const flowEdges = get().flowEdges
          const handleEdges = get().handleEdges

          delete flowEdgeMap[currentEdge.id]
          set({
            flowEdgeMap,
            flowEdges: flowEdges.filter((item) => item.id !== currentEdge.id),
            handleEdges: handleEdges.filter((item) => item !== currentEdge.id),
          })
        }
      } catch (error) {
        console.warn('Failed to delete flow edge', error)
      }
    },
    createOrUpdateFlowNode: async (inputNode) => {
      try {
        const currentSession = useSessionState.getState().currentSession
        if (!currentSession?.id) {
          throw new Error('Session not found')
        }
        if (!inputNode.id && (!inputNode.source_type || !inputNode.source_id)) {
          throw new Error('Missing flow node indentify')
        }
        let isNew: boolean = false
        let node: FlowNode

        const currentNode = await getRepository('FlowNode').findOne({
          where: inputNode.id
            ? { id: inputNode.id }
            : {
                source_type: inputNode.source_type,
                source_id: inputNode.source_id,
              },
        })

        if (currentNode) {
          node = deepmerge(currentNode, omitBy(inputNode, isUndefined))
          await getRepository('FlowNode').update(currentNode.id, node)
        } else if (inputNode.source_id && inputNode.source_type) {
          node = await getRepository('FlowNode').save({
            ...inputNode,
            source_id: `${inputNode.source_id}`,
            source_type: `${inputNode.source_type}` as AppEntityNames,
            node_type: inputNode.node_type || 'NEW_MESSAGE',
            session_id: inputNode.session_id || currentSession?.id,
          })
          isNew = true
        } else {
          throw new Error('Missing source id and type')
        }
        const flowNodeMap = get().flowNodeMap
        const handleNodes = get().handleNodes
        const flowNodes = get().flowNodes

        flowNodeMap[node.id] = node
        set({
          flowNodeMap,
          flowNodes: [...flowNodes.filter((item) => item.id !== node.id), node],
          handleNodes: isNew ? [...handleNodes, node.id] : handleNodes,
        })
        return node
      } catch (error) {
        console.warn('Failed to create or update flow node', error)
      }
    },
    createOrUpdateFlowEdge: async (inputEdge) => {
      try {
        const currentSession = useSessionState.getState().currentSession
        if (!currentSession?.id) {
          throw new Error('Session not found')
        }
        if (!inputEdge.id && (!inputEdge.source || !inputEdge.target)) {
          throw new Error('Missing flow node indentify')
        }
        let isNew: boolean = false
        let edge: FlowEdge

        const currentNode = await getRepository('FlowEdge').findOne({
          where: inputEdge.id
            ? { id: inputEdge.id }
            : {
                source: inputEdge.source,
                target: inputEdge.target,
              },
        })

        if (currentNode) {
          edge = deepmerge(currentNode, omitBy(inputEdge, isUndefined))
          await getRepository('FlowEdge').update(currentNode.id, edge)
        } else if (inputEdge.source && inputEdge.target) {
          edge = await getRepository('FlowEdge').save({
            ...inputEdge,
            source: `${inputEdge.source}`,
            target: `${inputEdge.target}`,
            session_id: inputEdge.session_id || currentSession?.id,
          })
          isNew = true
        } else {
          throw new Error('Missing source and target')
        }

        const flowEdgeMap = get().flowEdgeMap
        const flowEdges = get().flowEdges
        const handleEdges = get().handleEdges

        flowEdgeMap[edge.id] = edge
        set({
          flowEdges: [...flowEdges.filter((item) => item.id !== edge.id), edge],
          flowEdgeMap,
          handleEdges: isNew ? [...handleEdges, edge.id] : handleEdges,
        })
        return edge
      } catch (error) {
        console.warn('Failed to create or update flow node', error)
      }
    },
    getFlowNodeBySource: (type, id) => {
      return get().flowNodeMap[`${type}:${id}`]
    },
  }
}
