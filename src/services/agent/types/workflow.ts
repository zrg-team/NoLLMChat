/* eslint-disable @typescript-eslint/no-unused-vars */
export type ExecuteFuncConfig<T> = {
  setState: (state: Partial<T> | ((t: T) => T | Promise<T>)) => void
  abortController?: AbortController
}

export type ExecuteFunc<T> = (state: T, config?: ExecuteFuncConfig<T>) => void | Promise<void>

export interface WorkflowNode<T> {
  id: string
  execute: ExecuteFunc<T>
}

export interface WorkflowConnection<T> {
  from: string
  to: string
}

export interface WorkflowConditionConnection<T, A extends string[]> {
  from: string
  possibleNodes: A
  condition: (state: T) => A[number] | null | Promise<A[number] | null>
}

export type PartialKeys<T extends string[]> = T extends (infer U)[] ? U[] : never
export type PartialKey<T extends string[]> = T extends (infer U)[] ? U : never
