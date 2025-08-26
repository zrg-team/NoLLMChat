import { FlowNodeTypeEnum } from 'src/services/database/types'
import type { FlowNode, FlowEdge } from 'src/services/database/types'
import {
  FlowGraph,
  FlowRunState,
  FlowRunStatus,
  FlowSessionState,
  FlowExecutionContext,
  BaseNodeHandler,
  NodeExecutionStatus,
  FlowNodeExecution,
} from './types'
import { FlowDataService } from './flow-data-service'
import { nanoid } from 'nanoid'
import { logError, logWarn } from 'src/utils/logger'

export class FlowMachine {
  private nodeHandlers: Map<FlowNodeTypeEnum, BaseNodeHandler<unknown, unknown>> = new Map()
  private dataService: FlowDataService

  // Instance state for current execution
  private currentFullGraph?: FlowGraph
  private currentDirectGraph?: FlowGraph
  private currentRunState?: FlowRunState

  constructor(dataService?: FlowDataService) {
    this.dataService = dataService || FlowDataService.forDatabase()
  }

  /**
   * Register a node handler for a specific node type
   */
  registerNodeHandler(handler: BaseNodeHandler<unknown, unknown>): void {
    this.nodeHandlers.set(handler.nodeType, handler)
  }

  /**
   * Prepare phase: collect full graph and direct nodes, run prepare for all direct nodes
   */
  async prepare(targetNodeId: string, initialState?: Record<string, unknown>): Promise<void> {
    // Step 1: Collect all connected nodes from the target node (multiple levels for data collection)
    this.currentFullGraph = await this.dataService.getConnectedNodes(targetNodeId)

    // Step 2: Validate target node exists in graph
    if (!this.currentFullGraph.nodes.has(targetNodeId)) {
      throw new Error(`Target node not found in connected graph: ${targetNodeId}`)
    }

    // Step 3: Filter to only directly connected nodes for execution (single level)
    this.currentDirectGraph = this.getDirectlyConnectedNodes(this.currentFullGraph, targetNodeId)

    // Step 4: Create run state and set initial state
    const runId = `run_${nanoid()}`
    this.currentRunState = this.createRunState(runId, this.currentDirectGraph, targetNodeId)

    if (initialState) {
      Object.entries(initialState).forEach(([key, value]) => {
        this.currentRunState!.sessionState.set(key, value)
      })
    }

    // Step 5: Run prepare phase for all direct nodes
    const context = this.createExecutionContext(this.currentRunState)
    await this.runPreparePhase(this.currentRunState, this.currentDirectGraph, context)
  }

  /**
   * Execute phase: trigger flow execution and update message content
   */
  async execute(): Promise<FlowRunState> {
    if (!this.currentRunState || !this.currentDirectGraph || !this.currentFullGraph) {
      throw new Error('Must call prepare() before execute()')
    }

    const context = this.createExecutionContext(this.currentRunState)

    this.currentRunState.status = FlowRunStatus.RUNNING

    try {
      // Execute only the target node (if prepare succeeded)
      if (this.currentRunState.status === FlowRunStatus.RUNNING) {
        await this.runExecutePhase(this.currentRunState, this.currentDirectGraph, context)
      }

      // Mark as completed if no failures
      if (this.currentRunState.status === FlowRunStatus.RUNNING) {
        this.currentRunState.status = FlowRunStatus.COMPLETED
        this.currentRunState.endTime = new Date()
      }
    } catch (error) {
      this.currentRunState.status = FlowRunStatus.FAILED
      this.currentRunState.error = error as Error
      this.currentRunState.endTime = new Date()
    }

    return this.currentRunState
  }

  /**
   * Get value from current session state
   */
  getSessionState(key?: string): unknown {
    if (!this.currentRunState) {
      throw new Error('Must call prepare() before accessing session state')
    }
    if (!key) {
      return this.currentRunState.sessionState.data
    }
    return this.currentRunState.sessionState.get(key)
  }

  /**
   * Set value in current session state
   */
  setSessionState(key: string, value: unknown): void {
    if (!this.currentRunState) {
      throw new Error('Must call prepare() before accessing session state')
    }
    this.currentRunState.sessionState.set(key, value)
  }

  /**
   * Create execution context for flow operations
   */
  private createExecutionContext(runState: FlowRunState): FlowExecutionContext {
    return {
      sessionId: runState.sessionState.sessionId,
      runId: runState.id,
      sessionState: runState.sessionState,
      getConnectedNodes: (nodeId: string, direction?: 'target' | 'source') => {
        const full = this.currentFullGraph!

        // Collect sets for upstream and downstream
        const collectUpstream = (start: string): Set<string> => {
          const visited = new Set<string>()
          const stack = [...(full.reverseAdjacencyList.get(start) || [])]
          while (stack.length) {
            const curr = stack.pop() as string
            if (visited.has(curr)) continue
            visited.add(curr)
            const parents = full.reverseAdjacencyList.get(curr) || []
            for (const p of parents) {
              if (!visited.has(p)) stack.push(p)
            }
          }
          return visited
        }

        const collectDownstream = (start: string): Set<string> => {
          const visited = new Set<string>()
          const stack = [...(full.adjacencyList.get(start) || [])]
          while (stack.length) {
            const curr = stack.pop() as string
            if (visited.has(curr)) continue
            visited.add(curr)
            const children = full.adjacencyList.get(curr) || []
            for (const c of children) {
              if (!visited.has(c)) stack.push(c)
            }
          }
          return visited
        }

        // Determine included IDs and build a filtered subgraph
        let included = new Set<string>()
        if (!direction) {
          const up = collectUpstream(nodeId)
          const down = collectDownstream(nodeId)
          included = new Set<string>([...up, ...down, nodeId])
        } else if (direction === 'target') {
          included = collectUpstream(nodeId)
        } else {
          included = collectDownstream(nodeId)
        }

        const subgraph = this.buildFilteredGraph(full, included)
        const order = this.topologicalSortFromNode(subgraph, nodeId)

        // Slice based on direction to control inclusion of self
        if (direction === 'target') {
          const idx = order.indexOf(nodeId)
          const finalIds = idx === -1 ? order : order.slice(0, idx)
          return finalIds
            .map((id) => full.nodes.get(id))
            .filter((n): n is FlowNode => n !== undefined)
        }
        if (direction === 'source') {
          const idx = order.indexOf(nodeId)
          const finalIds = idx === -1 ? [] : order.slice(idx + 1)
          return finalIds
            .map((id) => full.nodes.get(id))
            .filter((n): n is FlowNode => n !== undefined)
        }

        // No direction: return ordered ancestors, self, then descendants
        return order.map((id) => full.nodes.get(id)).filter((n): n is FlowNode => n !== undefined)
      },
      setState: (key: string, value: unknown) => runState.sessionState.set(key, value),
      getState: (key: string) => runState.sessionState.get(key),
    }
  }

  /**
   * Run prepare phase for all direct nodes
   */
  private async runPreparePhase(
    runState: FlowRunState,
    graph: FlowGraph,
    context: FlowExecutionContext,
  ): Promise<void> {
    const targetId = runState.targetNodeId
    if (!targetId) {
      logWarn(`⚠️ [FlowMachine] No target ID provided for prepare phase`)
      return
    }

    // Only prepare nodes directly connected to target (incoming dependencies)
    const directIncoming = graph.reverseAdjacencyList.get(targetId) || []

    for (const nodeId of directIncoming) {
      const node = graph.nodes.get(nodeId)
      const nodeExecution = runState.nodeExecutions.get(nodeId)

      if (!node || !nodeExecution) {
        logWarn(`⚠️ [FlowMachine] Missing node or nodeExecution for: ${nodeId}`)
        continue
      }

      await this.executeNodePrepare(node, nodeExecution, context)

      if (nodeExecution.status === NodeExecutionStatus.FAILED) {
        runState.status = FlowRunStatus.FAILED
        runState.error = nodeExecution.error
        break
      }
    }
  }

  /**
   * Run execute phase for all direct nodes
   */
  private async runExecutePhase(
    runState: FlowRunState,
    graph: FlowGraph,
    context: FlowExecutionContext,
  ): Promise<void> {
    const targetId = runState.targetNodeId
    if (!targetId) return

    const node = graph.nodes.get(targetId)
    const nodeExecution = runState.nodeExecutions.get(targetId)
    if (!node || !nodeExecution) return

    // Ensure dependencies (direct incoming) completed in prepare
    const dependencies = graph.reverseAdjacencyList.get(targetId) || []
    const allDependenciesCompleted = dependencies.every((depId: string) => {
      const depExecution = runState.nodeExecutions.get(depId)
      return depExecution?.status === NodeExecutionStatus.COMPLETED
    })

    if (!allDependenciesCompleted) {
      nodeExecution.status = NodeExecutionStatus.SKIPPED
      return
    }

    await this.executeNodeExecute(node, nodeExecution, context)
  }

  /**
   * Filter graph to include all nodes that target the specified nodeID (all levels)
   * Returns target node + all nodes in the upstream chain
   */
  private getDirectlyConnectedNodes(fullGraph: FlowGraph, startNodeId: string): FlowGraph {
    const connectedNodeIds = this.collectUpstreamNodes(fullGraph, startNodeId)
    return this.buildFilteredGraph(fullGraph, connectedNodeIds)
  }

  /**
   * Collect only direct nodes that target the specified nodeID (one level only)
   */
  private collectUpstreamNodes(fullGraph: FlowGraph, startNodeId: string): Set<string> {
    const connectedNodeIds = new Set<string>([startNodeId])

    // Only get direct incoming nodes (one level)
    const incomingNodes = fullGraph.reverseAdjacencyList.get(startNodeId) || []
    incomingNodes.forEach((incomingNodeId) => {
      connectedNodeIds.add(incomingNodeId)
    })

    return connectedNodeIds
  }

  /**
   * Build filtered graph from node IDs
   */
  private buildFilteredGraph(fullGraph: FlowGraph, nodeIds: Set<string>): FlowGraph {
    const filteredNodes = new Map<string, FlowNode>()
    const filteredEdges = new Map<string, FlowEdge>()

    // Add nodes
    nodeIds.forEach((nodeId) => {
      const node = fullGraph.nodes.get(nodeId)
      if (node) filteredNodes.set(nodeId, node)
    })

    // Add edges between included nodes only
    fullGraph.edges.forEach((edge) => {
      if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
        filteredEdges.set(edge.id, edge)
      }
    })

    // Build adjacency lists
    const adjacencyList = new Map<string, string[]>()
    const reverseAdjacencyList = new Map<string, string[]>()

    filteredNodes.forEach((_, nodeId) => {
      adjacencyList.set(nodeId, [])
      reverseAdjacencyList.set(nodeId, [])
    })

    filteredEdges.forEach((edge) => {
      adjacencyList.get(edge.source)?.push(edge.target)
      reverseAdjacencyList.get(edge.target)?.push(edge.source)
    })

    return {
      nodes: filteredNodes,
      edges: filteredEdges,
      adjacencyList,
      reverseAdjacencyList,
    }
  }

  /**
   * Create a new flow run state with shared session state
   */
  createRunState(runId: string, graph: FlowGraph, startNodeId?: string): FlowRunState {
    const sessionId = `session_${nanoid()}`

    // Create shared session state
    const sessionState: FlowSessionState = {
      sessionId,
      data: new Map(),
      step: 0,
      get: (key: string) => sessionState.data.get(key),
      set: (key: string, value: unknown) => sessionState.data.set(key, value),
      increment: () => ++sessionState.step,
    }

    // Perform topological sort to determine execution order
    // If startNodeId is provided, prioritize its dependencies
    const executionOrder = startNodeId
      ? this.topologicalSortFromNode(graph, startNodeId)
      : this.topologicalSort(graph)

    // Initialize node executions
    const nodeExecutions = new Map<string, FlowNodeExecution>()
    executionOrder.forEach((nodeId) => {
      nodeExecutions.set(nodeId, {
        nodeId,
        status: NodeExecutionStatus.PENDING,
        result: null,
      })
    })

    return {
      id: runId,
      sessionId,
      status: FlowRunStatus.IDLE,
      startTime: new Date(),
      sessionState,
      nodeExecutions,
      executionOrder,
      currentNodeIndex: 0,
      targetNodeId: startNodeId,
    }
  }

  /**
   * Execute Phase 1: Prepare data from node
   */
  private async executeNodePrepare(
    node: FlowNode,
    nodeExecution: FlowNodeExecution,
    context: FlowExecutionContext,
  ): Promise<void> {
    const handler = this.nodeHandlers.get(node.node_type as FlowNodeTypeEnum)

    if (!handler) {
      nodeExecution.status = NodeExecutionStatus.FAILED
      nodeExecution.error = new Error(`No handler found for node type: ${node.node_type}`)
      return
    }

    if (handler.validate && !handler.validate(node)) {
      nodeExecution.status = NodeExecutionStatus.FAILED
      nodeExecution.error = new Error(`Node validation failed for node: ${node.id}`)
      return
    }

    nodeExecution.status = NodeExecutionStatus.RUNNING
    nodeExecution.startTime = new Date()

    try {
      let result: unknown = null

      // Try prepare method
      if (handler.prepare) {
        result = await handler.prepare(node, context)
      }

      nodeExecution.status = NodeExecutionStatus.COMPLETED
      nodeExecution.endTime = new Date()
      nodeExecution.result = result

      // Result stored on nodeExecution; no context result mapping needed
    } catch (error) {
      logError(`FlowMachine.executeNodePrepare failed for node: ${node.id}`, error)
      nodeExecution.status = NodeExecutionStatus.FAILED
      nodeExecution.endTime = new Date()
      nodeExecution.error = error as Error
    }
  }

  /**
   * Execute Phase 2: Execute node workflow
   */
  private async executeNodeExecute(
    node: FlowNode,
    nodeExecution: FlowNodeExecution,
    context: FlowExecutionContext,
  ): Promise<void> {
    const handler = this.nodeHandlers.get(node.node_type as FlowNodeTypeEnum)

    if (!handler) {
      nodeExecution.status = NodeExecutionStatus.FAILED
      nodeExecution.error = new Error(`No handler found for node type: ${node.node_type}`)
      return
    }

    try {
      let result: unknown = null

      // Try execute method
      if (handler.execute) {
        result = await handler.execute(node, context)
      }

      // Update result if execute method returned something
      if (result !== null) {
        nodeExecution.result = result
      }

      // Increment session step
      context.sessionState.increment()
    } catch (error) {
      nodeExecution.status = NodeExecutionStatus.FAILED
      nodeExecution.endTime = new Date()
      nodeExecution.error = error as Error
    }
  }

  /**
   * Perform topological sort to determine execution order
   */
  private topologicalSort(graph: FlowGraph): string[] {
    const visited = new Set<string>()
    const result: string[] = []
    const visiting = new Set<string>()

    const visit = (nodeId: string) => {
      if (visiting.has(nodeId)) {
        throw new Error(`Circular dependency detected involving node: ${nodeId}`)
      }
      if (visited.has(nodeId)) return

      visiting.add(nodeId)

      // Visit all dependencies (incoming nodes) first
      const dependencies = graph.reverseAdjacencyList.get(nodeId) || []
      dependencies.forEach((depId) => {
        if (graph.nodes.has(depId)) {
          visit(depId)
        }
      })

      visiting.delete(nodeId)
      visited.add(nodeId)
      result.push(nodeId)
    }

    graph.nodes.forEach((_, nodeId) => {
      if (!visited.has(nodeId)) {
        visit(nodeId)
      }
    })

    return result
  }

  /**
   * Topological sort starting from a specific node
   * Ensures dependencies of the target node are executed first
   */
  private topologicalSortFromNode(graph: FlowGraph, startNodeId: string): string[] {
    const visited = new Set<string>()
    const result: string[] = []
    const visiting = new Set<string>()

    const visit = (nodeId: string) => {
      if (visiting.has(nodeId)) {
        throw new Error(`Circular dependency detected involving node: ${nodeId}`)
      }
      if (visited.has(nodeId)) return

      visiting.add(nodeId)

      // Visit all dependencies (incoming nodes) first
      const dependencies = graph.reverseAdjacencyList.get(nodeId) || []
      dependencies.forEach((depId) => {
        if (graph.nodes.has(depId)) {
          visit(depId)
        }
      })

      visiting.delete(nodeId)
      visited.add(nodeId)
      result.push(nodeId)
    }

    // Start from the target node to ensure its dependencies are processed
    visit(startNodeId)

    // Then process any remaining nodes
    graph.nodes.forEach((_, nodeId) => {
      if (!visited.has(nodeId)) {
        visit(nodeId)
      }
    })

    return result
  }

  // Single-run design: removed getRunState, pauseFlow, resumeFlow
}
