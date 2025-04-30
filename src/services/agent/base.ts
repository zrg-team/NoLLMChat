import cloneDeep from 'lodash/cloneDeep'

import type {
  PartialKey,
  PartialKeys,
  WorkflowConditionConnection,
  WorkflowConnection,
  WorkflowNode,
} from './types'

export type BaseWorkflowState = {
  response?: string
}

export class Workflow<T extends BaseWorkflowState, A extends string[]> {
  private debugLogger: Partial<typeof console> = {}

  private workflowData: {
    combine?: boolean
    startNodeId: string | null
    stopNodeId: string | null
    nodes: Record<string, WorkflowNode<T>>
    connections: WorkflowConnection<T>[]
    conditionConnections: WorkflowConditionConnection<T, PartialKeys<A>>[]
  } = {
    combine: false,
    startNodeId: null,
    stopNodeId: null,
    nodes: {},
    connections: [],
    conditionConnections: [],
  }

  private currentNodeId: string | null = null

  private isRunning = false

  private isForceStop = false

  private callbacks: Record<string, Array<(data: Record<string, unknown>, state: T) => void>> = {}

  private initialState: T

  private state: T

  private onStateChanges: ((state: T) => void)[] = []

  constructor(
    initialState: T,
    {
      debugLogger,
    }: {
      debugLogger?: Partial<typeof console>
    } = {},
  ) {
    this.initialState = initialState
    this.state = cloneDeep(initialState)
    this.debugLogger = debugLogger || {}
  }

  private validateWorkflowOperation() {
    if (this.isRunning) {
      throw new Error('Cannot set end node while workflowis running.')
    }
    if (this.workflowData.combine) {
      throw new Error('Cannot set start node after workflow is combined.')
    }
  }

  protected addNode(id: string, execute: WorkflowNode<T>['execute']): void {
    this.validateWorkflowOperation()
    this.workflowData.nodes[id] = { id, execute }
  }

  protected addConnection(from: string, to: string): void {
    this.validateWorkflowOperation()
    if (!this.workflowData.nodes[from] || !this.workflowData.nodes[to]) {
      throw new Error('Invalid node ID in connection.')
    }
    this.workflowData.connections.push({ from, to })
  }

  protected addConditionConnection(
    from: string,
    possibleNodes: PartialKeys<A>,
    condition: WorkflowConditionConnection<T, A>['condition'],
  ): void {
    this.validateWorkflowOperation()
    if (!this.workflowData.nodes[from]) {
      throw new Error('Invalid node ID in condition connection.')
    }

    for (const node of possibleNodes) {
      if (!this.workflowData.nodes[node]) {
        throw new Error(`Invalid possible node ID "${node}" in condition connection.`)
      }
    }

    this.workflowData.conditionConnections.push({ from, possibleNodes, condition })
  }

  protected setEndNode(nodeId: string): void {
    this.validateWorkflowOperation()
    if (!this.workflowData.nodes[nodeId]) {
      throw new Error(`Stop node with ID "${nodeId}" not found.`)
    }
    this.workflowData.stopNodeId = nodeId
  }

  protected setStartNode(nodeId: string): void {
    this.validateWorkflowOperation()
    if (!this.workflowData.nodes[nodeId]) {
      throw new Error(`Start node with ID "${nodeId}" not found.`)
    }
    this.workflowData.startNodeId = nodeId
  }

  protected combine() {
    this.validateWorkflowOperation()
    this.workflowData.combine = true
  }

  protected getCallbacks(
    type: PartialKey<A> | string,
  ): Array<(data: Record<string, unknown>, state: T) => void> {
    return this.callbacks[type] || []
  }

  addCallback(
    type: PartialKey<A> | string,
    callback: (data: Record<string, unknown>, state: T) => void,
  ): () => void {
    if (!this.callbacks[type]) {
      this.callbacks[type] = []
    }
    this.callbacks[type].push(callback)
    return () => {
      if (this.callbacks[type]) {
        this.callbacks[type] = this.callbacks[type].filter((item) => item !== callback)
      }
    }
  }

  reset(force?: boolean): void {
    if (this.isRunning && force) {
      this.stop()
    } else if (this.isRunning) {
      throw new Error('Cannot reset workflow while running without force.')
    }
    this.state = cloneDeep(this.initialState)
    this.currentNodeId = null
    this.isRunning = false
    this.isForceStop = false
    this.currentNodeId = null
  }

  stop(): void {
    this.isForceStop = true
  }

  running(): boolean {
    return this.isRunning
  }

  setState(newState: Partial<T> | ((t: T) => T | Promise<T>)): void {
    if (typeof newState === 'function') {
      const newData = newState(this.state)
      if (newData instanceof Promise) {
        newData.then((data) => {
          this.state = data
          this.onStateChanges?.forEach((callback) => callback(this.state))
        })

        return
      } else {
        this.state = newData
      }
    } else {
      this.state = {
        ...this.state,
        ...newState,
      }
    }
    this.onStateChanges?.forEach((callback) => callback(this.state))
  }

  addOnStateChange(callback: (state: T) => void): () => void {
    this.onStateChanges.push(callback)
    return () => {
      this.onStateChanges = this.onStateChanges.filter((cb) => cb !== callback)
    }
  }

  getState(): T {
    return this.state
  }

  private async *executeWorkflowGenerator(
    state: Partial<T>,
    options?: {
      abortController?: AbortController
      callbacks?: Record<string, Array<(data: Record<string, unknown>, state: T) => void>>
    },
  ): AsyncGenerator<T, T, void> {
    const injectCallbacks: (() => void)[] = []
    try {
      this.validateWorkflowOperation()
      if (!this.workflowData.startNodeId) {
        throw new Error('Start node not set.')
      }
      this.state = { ...this.state, ...state }
      if (options?.callbacks) {
        Object.entries(options.callbacks).forEach(([type, callbacks]) => {
          injectCallbacks.push(...callbacks.map((callback) => this.addCallback(type, callback)))
        })
      }

      this.isRunning = true

      this.currentNodeId = this.workflowData.startNodeId

      this.debugLogger.group?.('Executing workflow')
      while (this.currentNodeId && !this.isForceStop) {
        const currentNode = this.workflowData.nodes[this.currentNodeId]
        if (!currentNode) {
          throw new Error(`Node with ID "${this.currentNodeId}" not found during execution.`)
        }

        this.debugLogger.info?.('Executed node:', this.currentNodeId)
        // eslint-disable-next-line no-await-in-loop
        await currentNode.execute(this.state, {
          setState: (...args) => this.setState(...args),
          abortController: options?.abortController,
        })
        yield this.state

        if (this.workflowData.stopNodeId && this.currentNodeId === this.workflowData.stopNodeId) {
          this.debugLogger.info?.('Workflow stopped at node:', this.currentNodeId)
          break
        }

        const conditionConnection = this.workflowData.conditionConnections.find(
          (conn) => conn.from === this.currentNodeId,
        )

        if (conditionConnection) {
          // eslint-disable-next-line no-await-in-loop
          const nextNodeId = await conditionConnection.condition(this.state)
          if (!nextNodeId) {
            throw new Error(`Condition returned null next node ID.`)
          }
          if (nextNodeId && conditionConnection.possibleNodes.includes(nextNodeId)) {
            this.currentNodeId = nextNodeId
          } else {
            throw new Error(`Condition returned invalid next node ID "${nextNodeId}".`)
          }
        } else {
          const nextConnection = this.workflowData.connections.find(
            (conn) => conn.from === this.currentNodeId,
          )

          this.currentNodeId = nextConnection && nextConnection.to ? nextConnection.to : null
        }
      }
      return this.state
    } catch (error) {
      this.debugLogger?.error?.('Error in workflow:', error)
      throw error
    } finally {
      this.debugLogger.groupEnd?.()
      this.isRunning = false
      // Remove callbacks
      if (injectCallbacks) {
        injectCallbacks.forEach((removeCallback) => {
          removeCallback()
        })
      }
    }
  }

  async invoke(
    state: Parameters<typeof Workflow.prototype.executeWorkflowGenerator>[0],
    options?: Parameters<typeof Workflow.prototype.executeWorkflowGenerator>[1] & {
      onStateChange?: (state: T) => void
    },
  ): Promise<T> {
    let removeListener: (() => void) | undefined
    try {
      if (options?.onStateChange) {
        removeListener = this.addOnStateChange(options.onStateChange)
      }
      const generator = this.executeWorkflowGenerator(state, options)
      let finalState: T | undefined
      for await (const currentState of generator) {
        finalState = currentState
      }
      if (finalState === undefined) {
        throw new Error('Workflow generator did not yield a final state.')
      }
      return finalState
    } finally {
      if (typeof removeListener === 'function') {
        removeListener()
      }
    }
  }

  async *stream(
    state: Parameters<typeof Workflow.prototype.executeWorkflowGenerator>[0],
    options?: Parameters<typeof Workflow.prototype.executeWorkflowGenerator>[1] & {
      onStateChange?: (state: T) => void
    },
  ): AsyncGenerator<T, T | undefined, void> {
    let removeListener: (() => void) | undefined
    let finalState: T | undefined
    try {
      if (typeof options?.onStateChange === 'function') {
        removeListener = this.addOnStateChange((...args) => {
          options.onStateChange?.(...args)
        })
      }
      const generator = this.executeWorkflowGenerator(state, options)
      const index = this.onStateChanges.length - 1
      for await (const currentState of generator) {
        yield currentState
        finalState = currentState
      }
      this.onStateChanges.splice(index, 1)
      if (finalState === undefined) {
        return this.state
      }
      return finalState
    } finally {
      if (typeof removeListener === 'function') {
        removeListener()
      }
    }
  }
}
