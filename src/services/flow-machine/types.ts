import { FlowNode, FlowEdge } from '../database/entities'
import { FlowNodeTypeEnum } from '../database/types'

export enum FlowRunStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PAUSED = 'paused',
}

export enum NodeExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

// Shared state during flow execution
export interface FlowSessionState {
  sessionId: string
  data: Map<string, unknown>
  step: number
  get: (key: string) => unknown
  set: (key: string, value: unknown) => void
  increment: () => number
}

export interface FlowNodeExecution {
  nodeId: string
  status: NodeExecutionStatus
  startTime?: Date
  endTime?: Date
  error?: Error
  result?: unknown
}

export interface FlowRunState {
  id: string
  sessionId: string
  status: FlowRunStatus
  startTime?: Date
  endTime?: Date
  sessionState: FlowSessionState
  nodeExecutions: Map<string, FlowNodeExecution>
  executionOrder: string[]
  currentNodeIndex: number
  error?: Error
  // The target node for this run (if any)
  targetNodeId?: string
}

// Base class for node handlers with two-phase execution
export abstract class BaseNodeHandler<TPrepareResult = unknown, TExecuteResult = unknown> {
  abstract nodeType: FlowNodeTypeEnum

  // Phase 1: Prepare data from the node (optional)
  prepare?(node: FlowNode, context: FlowExecutionContext): Promise<TPrepareResult | undefined>

  // Phase 2: Execute the node's workflow (optional)
  execute?(node: FlowNode, context: FlowExecutionContext): Promise<TExecuteResult | undefined>

  validate?(_node: FlowNode): boolean {
    return true
  }

  onBeforeExecute?(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    return Promise.resolve()
  }

  onAfterExecute?(
    _node: FlowNode,
    _result: unknown,
    _context: FlowExecutionContext,
  ): Promise<void> {
    return Promise.resolve()
  }

  onError?(_node: FlowNode, _error: Error, _context: FlowExecutionContext): Promise<void> {
    return Promise.resolve()
  }
}

export interface FlowExecutionContext {
  sessionId: string
  runId: string
  sessionState: FlowSessionState
  getConnectedNodes: (nodeId: string, direction?: 'target' | 'source') => FlowNode[]
  // Enhanced context methods for manual state management
  setState: (key: string, value: unknown) => void
  getState: (key: string) => unknown
}

export interface FlowGraph {
  nodes: Map<string, FlowNode>
  edges: Map<string, FlowEdge>
  adjacencyList: Map<string, string[]>
  reverseAdjacencyList: Map<string, string[]>
}
