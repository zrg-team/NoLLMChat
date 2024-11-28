import { useCallback, useRef, useState } from 'react'
import deepmerge from 'deepmerge'
import { applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react'
import { FlowNode } from 'src/services/database/types'
import { In, type FindManyOptions } from 'src/services/database/typeorm-wrapper'
import { useFlowState } from 'src/states/flow'
import { SYSTEM_NODE_IDS } from 'src/constants/nodes'
import { useSessionState } from 'src/states/session'

export const useFlowManager = () => {
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
        if ('id' in change && Object.values(SYSTEM_NODE_IDS).includes(change.id)) {
          updateNodes([change])
        } else if (
          change.type === 'position' &&
          change.position &&
          !isNaN(change.position.x) &&
          !isNaN(change.position.y)
        ) {
          updateNodes([change])
          await updateFlowNode(
            {
              id: change.id,
              x: change.position.x,
              y: change.position.y,
            },
            { silent: true },
          )
        } else if (change.type === 'remove') {
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
          await updateFlowNode(
            {
              id: change.id,
              width: change.dimensions.width,
              height: change.dimensions.height,
            },
            { silent: true },
          )
        } else if (change.type === 'select') {
          updateNodes([change])
        }
      }
    },
    [updateNodes, updateFlowNode, deleteFlowNode, getNodes],
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
