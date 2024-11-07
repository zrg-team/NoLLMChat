import { useCallback, useRef, useState } from 'react'
import deepmerge from 'deepmerge'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import { TOOLBOX_NODE, SESSION_INFO_NODE } from 'src/constants/nodes'
import { AppEntityNames, EntityArrayTypes, FlowNode } from 'src/services/database/types'
import { In, type FindManyOptions } from 'src/services/database/typeorm-wrapper'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database'
import { nodeFlowToEdge, nodeFlowToNode } from 'src/utils/flow'

export const useFlowManager = () => {
  const flowEdges = useFlowState((state) => state.flowEdges)
  const findFlowNodes = useFlowState((state) => state.findFlowNodes)
  const findFlowEdges = useFlowState((state) => state.findFlowEdges)
  const updateSyncedNodes = useFlowState((state) => state.updateSyncedNodes)
  const updateSyncedEdges = useFlowState((state) => state.updateSyncedEdges)
  const deleteFlowNode = useFlowState((state) => state.deleteFlowNode)
  const deleteFlowEdge = useFlowState((state) => state.deleteFlowEdge)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const flowEdgesRef = useRef(flowEdges)
  const isReadyRef = useRef(false)
  const [loadingState, setLoadingState] = useState({ loading: false })
  const [nodes, setNodes] = useNodesState([TOOLBOX_NODE, SESSION_INFO_NODE])
  const [edges, setEdges] = useEdgesState<Edge>([])
  const nodesRef = useRef(nodes)
  const edgesRef = useRef(edges)

  flowEdgesRef.current = flowEdges
  nodesRef.current = nodes
  edgesRef.current = edges

  const initialFlow = useCallback(async (func?: () => Promise<void>) => {
    try {
      await func?.()
    } finally {
      isReadyRef.current = true
    }
  }, [])

  const prepareFlowInfo = useCallback(
    async (query: FindManyOptions<FlowNode>) => {
      try {
        setLoadingState((loading) => ({ ...loading, loading: true }))
        const flowNodes = await findFlowNodes(query)
        console.log('flowNodes', flowNodes)
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
        const [flowEdges] = await Promise.all([
          findFlowEdges({
            where: [
              { source: In(flowNodes.map((node) => node.id)) },
              { target: In(flowNodes.map((node) => node.id)) },
            ],
          }),
          ...Object.entries(entityGroups).map(async ([key, groupNodes]) => {
            const entityName = key as AppEntityNames
            flowNodeDatas[entityName] = (await getRepository(entityName).find({
              where: {
                id: In(groupNodes.map((node) => node.source_id)),
              },
            })) as EntityArrayTypes
          }),
        ])
        setNodes((nds) => {
          const ndsIds = nds.map((nd) => nd.id)
          const newNodeIds: string[] = []
          const changes = flowNodes.map((node) => {
            const isExist = ndsIds.includes(node.id)
            const entity = flowNodeDatas[node.source_type]?.find(
              (item) => item.id === node.source_id,
            )
            if (!isExist) {
              newNodeIds.push(node.id)
            }

            return {
              type: (isExist ? 'replace' : 'add') as 'replace' | 'add',
              id: node.id,
              item: nodeFlowToNode(node, entity),
            }
          })
          updateSyncedNodes([...newNodeIds, ...ndsIds])
          return applyNodeChanges(changes, nds)
        })
        setTimeout(() => {
          setEdges((edgs) => {
            const edgeIds = edgs.map((edg) => edg.id)
            const newEdgeIds: string[] = []
            const changes = flowEdges.map((edge) => {
              const isExisted = edgeIds.includes(edge.id)
              if (!isExisted) {
                newEdgeIds.push(edge.id)
              }
              return {
                type: (isExisted ? 'replace' : 'add') as 'replace' | 'add',
                id: edge.id,
                item: nodeFlowToEdge(edge),
              }
            })
            updateSyncedEdges([...newEdgeIds, ...edgeIds])
            return applyEdgeChanges(changes, edgs)
          })
        }, 100)
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 200))
        return {
          flowNodes,
          flowEdges,
          flowNodeDatas,
        }
      } finally {
        setLoadingState((loading) => ({ ...loading, loading: false }))
      }
    },
    [setEdges, setNodes, findFlowEdges, findFlowNodes, updateSyncedEdges, updateSyncedNodes],
  )

  const updateNodeChanges = useCallback(
    async (changes: NodeChange<Node>[]) => {
      Promise.all(
        changes.map(async (change) => {
          if (change.type === 'position' && change.position) {
            return createOrUpdateFlowNode({
              id: change.id,
              x: change.position.x,
              y: change.position.y,
            })
          } else if (change.type === 'remove') {
            return deleteFlowNode({ id: change.id })
          }
        }),
      )
      setNodes((nds) => {
        return applyNodeChanges(changes, nds)
      })
    },
    [createOrUpdateFlowNode, deleteFlowNode, setNodes],
  )

  const updateEdgeChanges = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      Promise.all(
        changes.map(async (change) => {
          if (change.type === 'remove') {
            return deleteFlowEdge({ id: change.id })
          }
        }),
      )
      setEdges((eds) => applyEdgeChanges(changes, eds))
    },
    [deleteFlowEdge, setEdges],
  )

  const updateEdgeConnection = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges],
  )

  const syncEdges = useCallback(() => {
    if (!flowEdgesRef.current?.length) {
      return
    }
    // let running: Edge[] = []
    setEdges((oldEdges) => {
      if (flowEdgesRef.current === oldEdges) {
        return oldEdges
      }
      // running = oldEdges
      const updatedIds: string[] = []
      const deletedIds: string[] = []
      const changes = flowEdgesRef.current
        .map((item) => {
          const old = oldEdges.find(
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
            }
          } else {
            updatedIds.push(item.id)
            return {
              type: 'replace' as const,
              item: nodeFlowToEdge(item),
            }
          }
        })
        .filter(Boolean) as EdgeChange[]
      // Remove unused edges
      oldEdges.forEach((edge) => {
        if (!updatedIds.includes(edge.id)) {
          deletedIds.push(edge.id)
        }
      })
      deletedIds.forEach((id) => {
        changes.push({ type: 'remove' as const, id: id })
      })

      return applyEdgeChanges(changes, oldEdges)
    })
  }, [setEdges])

  const updateOrCreateNode = useCallback(
    (input: Omit<Node, 'position'> & { position?: Node['position'] | undefined }) => {
      setNodes((nds) => {
        const node = nds.find((n) => n.id === input.id)
        if (!node) {
          return applyNodeChanges(
            [
              {
                item: {
                  ...input,
                  position: {
                    x: input.position?.x || 0,
                    y: input.position?.y || 0,
                  },
                },
                type: 'add' as const,
              },
            ],
            nds,
          )
        }
        return applyNodeChanges(
          [
            {
              id: input.id,
              item: deepmerge(node, input),
              type: 'replace' as const,
            },
          ],
          nds,
        )
      })
    },
    [setNodes],
  )

  return {
    nodes,
    edges,
    nodesRef,
    edgesRef,
    syncEdges,
    isReadyRef,
    initialFlow,
    loadingState,
    prepareFlowInfo,
    updateNodeChanges,
    updateEdgeChanges,
    updateOrCreateNode,
    updateEdgeConnection,
  }
}
