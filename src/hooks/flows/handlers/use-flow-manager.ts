import { useCallback, useRef, useState } from 'react'
import deepmerge from 'deepmerge'
import { applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react'
import { FlowNode, FlowNodeTypeEnum } from 'src/services/database/types'
import { In, type FindManyOptions } from 'src/services/database/typeorm-wrapper'
import { useFlowState } from 'src/states/flow'
import { DISABLED_DELETE_NODE_TYPES, SYSTEM_NODE_IDS } from 'src/constants/nodes'
import { useSessionState } from 'src/states/session'

export const useFlowManager = () => {
  const updatePositionRef = useRef<Record<string, number | undefined>>({})
  const updateDimensionsRef = useRef<Record<string, number>>({})

  const flowEdges = useFlowState((state) => state.flowEdges)
  const currentSession = useSessionState((state) => state.currentSession)
  const setNodes = useFlowState((state) => state.setNodes)
  const updateNodes = useFlowState((state) => state.updateNodes)
  const updateEdges = useFlowState((state) => state.updateEdges)
  const addConnectionToEdges = useFlowState((state) => state.addConnectionToEdges)

  const resetFlows = useFlowState((state) => state.reset)
  const findFlowEdges = useFlowState((state) => state.findFlowEdges)
  const deleteFlowNode = useFlowState((state) => state.deleteFlowNode)
  const deleteFlowEdge = useFlowState((state) => state.deleteFlowEdge)
  const updateFlowNode = useFlowState((state) => state.updateFlowNode)
  const getNodes = useFlowState((state) => state.getNodes)
  const findFlowNodesWithSource = useFlowState((state) => state.findFlowNodesWithSource)

  const flowEdgesRef = useRef(flowEdges)
  const currentSessionIdRef = useRef<string | null>()
  const [loadingState, setLoadingState] = useState({ loading: false })

  flowEdgesRef.current = flowEdges

  const initialFlow = useCallback(
    async (currentSessionId: string, func?: () => Promise<void>) => {
      try {
        currentSessionIdRef.current = currentSessionId
        resetFlows()
        await func?.()
      } catch {
        currentSessionIdRef.current = undefined
      }
    },
    [resetFlows],
  )

  const prepareFlowInfo = useCallback(
    async (query: FindManyOptions<FlowNode>) => {
      try {
        if (!currentSession?.id) {
          return
        }
        setLoadingState((loading) => ({ ...loading, loading: true }))
        const flowNodes = await findFlowNodesWithSource({
          ...query,
          where: {
            ...query.where,
            session_id: currentSession.id,
          },
        })
        const flowEdges = await findFlowEdges({
          where: [
            { source: In(flowNodes.map((node) => node.id)) },
            { target: In(flowNodes.map((node) => node.id)) },
          ],
        })
        return {
          flowNodes,
          flowEdges,
        }
      } finally {
        setLoadingState((loading) => ({ ...loading, loading: false }))
      }
    },
    [findFlowNodesWithSource, findFlowEdges, currentSession?.id],
  )

  const updateNodeChanges = useCallback(
    async (changes: NodeChange<Node>[]) => {
      for (const change of changes) {
        if (
          'id' in change &&
          Object.values(SYSTEM_NODE_IDS).includes(change.id) &&
          change.type !== 'remove'
        ) {
          updateNodes([change])
        } else if (
          change.type === 'position' &&
          change.position &&
          !isNaN(change.position.x) &&
          !isNaN(change.position.y)
        ) {
          updateNodes([change])

          const x = change.position.x
          const y = change.position.y
          clearTimeout(updatePositionRef.current[change.id])
          updatePositionRef.current[change.id] = setTimeout(async () => {
            updatePositionRef.current[change.id] = undefined
            await updateFlowNode(
              {
                id: change.id,
                x,
                y,
              },
              { silent: true },
            )
          }, 200)
        } else if (change.type === 'remove') {
          // DISABLED: delete node
          const node = getNodes([change.id])?.[0]
          if (!node?.type || DISABLED_DELETE_NODE_TYPES.includes(node.type as FlowNodeTypeEnum)) {
            return
          }
          await deleteFlowNode({ id: change.id })
        } else if (
          change.type === 'dimensions' &&
          change.dimensions &&
          !isNaN(change.dimensions.width) &&
          !isNaN(change.dimensions.height)
        ) {
          const node = getNodes([change.id])?.[0]
          if (!node?.width && !node?.height) {
            return
          }
          updateNodes([change])

          clearTimeout(updateDimensionsRef.current[change.id])
          const width = change.dimensions.width
          const height = change.dimensions.height
          updateDimensionsRef.current[change.id] = setTimeout(async () => {
            await updateFlowNode(
              {
                id: change.id,
                width,
                height,
              },
              { silent: true },
            )
          }, 200)
        } else if (change.type === 'select') {
          updateNodes([change])
        }
      }
    },
    [updateNodes, updateFlowNode, getNodes, deleteFlowNode],
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
      updateEdges(changes)
    },
    [deleteFlowEdge, updateEdges],
  )

  const updateEdgeConnection = useCallback(
    (connection: Connection) => {
      addConnectionToEdges(connection)
    },
    [addConnectionToEdges],
  )

  const syncEdges = useCallback(() => {
    if (!flowEdgesRef.current?.length) {
      return
    }
  }, [])

  const updateOrCreateNode = useCallback(
    (input: Node | ((node: Node[]) => Node | undefined)) => {
      setNodes((nodes) => {
        let updatingNode
        if (typeof input === 'function') {
          updatingNode = input(nodes)
        } else {
          updatingNode = input
        }
        if (!updatingNode) {
          return nodes
        }
        const node = nodes?.find((n) => n.id === updatingNode.id)
        const change: NodeChange<Node> = {
          id: updatingNode.id,
          item: node
            ? deepmerge(node, updatingNode)
            : {
                ...updatingNode,
                position: {
                  x: updatingNode.position?.x || 0,
                  y: updatingNode.position?.y || 0,
                },
              },
          type: node ? 'replace' : 'add',
        }
        return applyNodeChanges([change], nodes)
      })
    },
    [setNodes],
  )

  return {
    syncEdges,
    initialFlow,
    loadingState,
    prepareFlowInfo,
    updateNodeChanges,
    updateEdgeChanges,
    updateOrCreateNode,
    currentSessionIdRef,
    updateEdgeConnection,
  }
}
