import { useReactFlow } from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import { getRepository } from 'src/services/database/database'
import { type FindManyOptions } from 'src/services/database/typeorm-wrapper'
import { FlowNodeTypeEnum, AppEntityNames } from 'src/services/database/types'
import type { FlowNode, FlowEdge } from 'src/services/database/types'

import type { FlowGraph } from './types'
import { logWarn } from 'src/utils/logger'

/**
 * Data access layer for flow operations
 * Handles database queries and graph construction with dual modes:
 * 1. Database mode: Query from database repositories
 * 2. Session mode: Query from ReactFlow session data
 */
export class FlowDataService {
  private mode: 'database' | 'session'
  private reactFlowInstance?: ReturnType<typeof useReactFlow>

  constructor(
    mode: 'database' | 'session' = 'database',
    reactFlowInstance?: ReturnType<typeof useReactFlow>,
  ) {
    this.mode = mode
    this.reactFlowInstance = reactFlowInstance
  }

  /**
   * Static factory method for database mode
   */
  static forDatabase(): FlowDataService {
    return new FlowDataService('database')
  }

  /**
   * Static factory method for session mode
   */
  static forSession(reactFlowInstance: ReturnType<typeof useReactFlow>): FlowDataService {
    return new FlowDataService('session', reactFlowInstance)
  }

  /**
   * Switch between modes
   */
  setMode(mode: 'database' | 'session', reactFlowInstance?: ReturnType<typeof useReactFlow>): void {
    this.mode = mode
    if (mode === 'session' && reactFlowInstance) {
      this.reactFlowInstance = reactFlowInstance
    }
  }

  /**
   * Get connected nodes starting from a specific node
   * Uses either database queries or ReactFlow session data based on mode
   */
  async getConnectedNodes(startNodeId: string, sessionId?: string): Promise<FlowGraph> {
    if (this.mode === 'database') {
      return this.getConnectedNodesFromDatabase(startNodeId, sessionId!)
    } else {
      return this.getConnectedNodesFromSession(startNodeId)
    }
  }

  /**
   * Get connected nodes from database using optimized queries
   */
  private async getConnectedNodesFromDatabase(
    startNodeId: string,
    sessionId: string,
  ): Promise<FlowGraph> {
    // Get all nodes and edges for the session
    const [allNodes, allEdges] = await Promise.all([
      getRepository('FlowNode').find({
        where: { session_id: sessionId },
      }),
      getRepository('FlowEdge').find({
        where: { session_id: sessionId },
      }),
    ])

    return this.buildConnectedGraph(startNodeId, allNodes, allEdges)
  }

  /**
   * Get connected nodes from ReactFlow session data
   */
  private getConnectedNodesFromSession(startNodeId: string): FlowGraph {
    if (!this.reactFlowInstance) {
      throw new Error('ReactFlow instance required for session mode')
    }

    const { getNodes, getEdges } = this.reactFlowInstance
    const reactNodes = getNodes()
    const reactEdges = getEdges()

    // Convert ReactFlow nodes/edges to FlowNode/FlowEdge format
    const flowNodes = this.reactNodesToFlowNodes(reactNodes)
    const flowEdges = this.reactEdgesToFlowEdges(reactEdges)

    return this.buildConnectedGraph(startNodeId, flowNodes, flowEdges)
  }

  /**
   * Get all nodes/edges for a session from database
   */
  async getAllSessionNodes(sessionId: string): Promise<{ nodes: FlowNode[]; edges: FlowEdge[] }> {
    const [nodes, edges] = await Promise.all([
      getRepository('FlowNode').find({
        where: { session_id: sessionId },
      }),
      getRepository('FlowEdge').find({
        where: { session_id: sessionId },
      }),
    ])

    return { nodes, edges }
  }

  /**
   * Query nodes with advanced filtering (database mode only)
   */
  async queryNodes(query: FindManyOptions<FlowNode>): Promise<FlowNode[]> {
    if (this.mode !== 'database') {
      throw new Error('Advanced querying only available in database mode')
    }
    return getRepository('FlowNode').find(query)
  }

  /**
   * Query edges with advanced filtering (database mode only)
   */
  async queryEdges(query: FindManyOptions<FlowEdge>): Promise<FlowEdge[]> {
    if (this.mode !== 'database') {
      throw new Error('Advanced querying only available in database mode')
    }
    return getRepository('FlowEdge').find(query)
  }

  /**
   * Build connected graph from starting node using ReactFlow getHandleConnections
   * Includes ALL nodes that target the specified nodeID (all upstream levels)
   */
  buildConnectedGraph(startNodeId: string, allNodes: FlowNode[], allEdges: FlowEdge[]): FlowGraph {
    const visited = new Set<string>()
    const connectedNodes = new Map<string, FlowNode>()
    const connectedEdges = new Map<string, FlowEdge>()

    // Use allEdges directly to determine graph connectivity, not ReactFlow helpers
    const incomingEdgesMap = new Map<string, FlowEdge[]>()
    allEdges.forEach((edge) => {
      const arr = incomingEdgesMap.get(edge.target) || []
      arr.push(edge)
      incomingEdgesMap.set(edge.target, arr)
    })

    const collectUpstream = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)

      // Add current node
      const node = allNodes.find((n) => n.id === nodeId)
      if (node) connectedNodes.set(nodeId, node)

      // Find all incoming edges for this node
      const incoming = incomingEdgesMap.get(nodeId) || []
      for (const edge of incoming) {
        connectedEdges.set(edge.id, edge)
        // Recurse into the source node
        collectUpstream(edge.source)
      }
    }

    collectUpstream(startNodeId)

    return this.buildFlowGraph(
      Array.from(connectedNodes.values()),
      Array.from(connectedEdges.values()),
    )
  }

  /**
   * Build flow graph structure from nodes and edges
   */
  private buildFlowGraph(nodes: FlowNode[], edges: FlowEdge[]): FlowGraph {
    const graph: FlowGraph = {
      nodes: new Map(),
      edges: new Map(),
      adjacencyList: new Map(),
      reverseAdjacencyList: new Map(),
    }

    // Build nodes map
    nodes.forEach((node) => {
      graph.nodes.set(node.id, node)
      graph.adjacencyList.set(node.id, [])
      graph.reverseAdjacencyList.set(node.id, [])
    })

    // Build edges map and adjacency lists
    edges.forEach((edge) => {
      graph.edges.set(edge.id, edge)

      // Add to adjacency list (source -> target)
      const sourceTargets = graph.adjacencyList.get(edge.source) || []
      sourceTargets.push(edge.target)
      graph.adjacencyList.set(edge.source, sourceTargets)

      // Add to reverse adjacency list (target <- source)
      const targetSources = graph.reverseAdjacencyList.get(edge.target) || []
      targetSources.push(edge.source)
      graph.reverseAdjacencyList.set(edge.target, targetSources)
    })

    return graph
  }

  /**
   * Convert ReactFlow nodes to FlowNode format
   */
  private reactNodesToFlowNodes(reactNodes: Node[]): FlowNode[] {
    return reactNodes.map((node) => {
      const nodeData = node.data as { entity?: { id?: string; constructor?: { name: string } } }
      const entityConstructorName = nodeData?.entity?.constructor?.name

      // Map ReactFlow node types to FlowNodeTypeEnum
      let nodeType: FlowNodeTypeEnum
      switch (node.type) {
        case 'ThreadNode':
        case 'THREAD':
          nodeType = FlowNodeTypeEnum.Thread
          break
        case 'LLMNode':
        case 'LLM':
          nodeType = FlowNodeTypeEnum.LLM
          break
        case 'PromptNode':
        case 'PROMPT':
          nodeType = FlowNodeTypeEnum.Prompt
          break
        case 'MessageNode':
        case 'MESSAGE':
          nodeType = FlowNodeTypeEnum.Message
          break
        case 'SchemaNode':
        case 'SCHEMA':
          nodeType = FlowNodeTypeEnum.Schema
          break
        case 'VectorDatabaseNode':
        case 'VECTOR_DATABASE':
          nodeType = FlowNodeTypeEnum.VectorDatabase
          break
        case 'PlaceholderNode':
        case 'PLACEHOLDER':
          nodeType = FlowNodeTypeEnum.PlaceHolder
          break
        default:
          logWarn(`🔄 [FlowDataService] Unknown node type: ${node.type}, defaulting to NewMessage`)
          nodeType = FlowNodeTypeEnum.NewMessage
      }

      return {
        id: node.id,
        node_type: nodeType,
        data: node.data,
        x: node.position.x,
        y: node.position.y,
        width: node.width || 0,
        height: node.height || 0,
        session_id: '', // Will be set by caller
        source_type: (entityConstructorName as AppEntityNames) || 'FlowNode',
        source_id: nodeData?.entity?.id || node.id,
        created_at: new Date(),
        updated_at: new Date(),
      } as FlowNode
    })
  }

  /**
   * Convert ReactFlow edges to FlowEdge format
   */
  private reactEdgesToFlowEdges(reactEdges: Edge[]): FlowEdge[] {
    return reactEdges.map(
      (edge) =>
        ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          session_id: '', // Will be set by caller
          created_at: new Date(),
          updated_at: new Date(),
        }) as FlowEdge,
    )
  }
}
