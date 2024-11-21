import type { Thread } from '../entities/thread'
import type { Message } from '../entities/message'
import type { LLM } from '../entities/llm'
import type { FlowNode } from '../entities/flow-node'
import type { FlowEdge } from '../entities/flow-edge'
import type { Prompt } from '../entities/prompt'
import type { PromptVariable } from '../entities/prompt-variable'
import type { Session } from '../entities/session'
import type { Schema } from '../entities/schema'
import type { SchemaItem } from '../entities/schema-item'
import type { JSONData } from '../entities/json-data'
import type { CSVData } from '../entities/csv-data'
import type { ToolDefinition } from '../entities/tool-definition'
import type { VectorDatabase } from '../entities/vector-database'
import type { JSONLData } from '../entities/jsonl-data'

export type EntityTypesMap = {
  Thread: Thread
  Message: Message
  LLM: LLM
  FlowNode: FlowNode
  FlowEdge: FlowEdge
  Prompt: Prompt
  PromptVariable: PromptVariable
  Session: Session
  Schema: Schema
  SchemaItem: SchemaItem
  JSONData: JSONData
  CSVData: CSVData
  ToolDefinition: ToolDefinition
  VectorDatabase: VectorDatabase
  JSONLData: JSONLData
}

export type EntityArrayTypes = {
  [K in keyof EntityTypesMap]: EntityTypesMap[K][]
}[keyof EntityTypesMap]

export type EntityTypes = {
  [K in keyof EntityTypesMap]: EntityTypesMap[K]
}[keyof EntityTypesMap]

export type AppEntityNames = keyof EntityTypesMap

export type {
  Thread,
  Message,
  LLM,
  FlowEdge,
  FlowNode,
  Prompt,
  PromptVariable,
  Session,
  Schema,
  SchemaItem,
  JSONData,
  CSVData,
  ToolDefinition,
  VectorDatabase,
  JSONLData,
}

export const TABLE_NAMES = {
  Thread: 'threads',
  Message: 'messages',
  LLM: 'llms',
  FlowNode: 'flow_nodes',
  FlowEdge: 'flow_edges',
  Prompt: 'prompts',
  PromptVariable: 'prompt_variables',
  Session: 'sessions',
  Schema: 'schemas',
  SchemaItem: 'schema_items',
  JSONData: 'json_data',
  CSVData: 'csv_data',
  ToolDefinition: 'tool_definitions',
  VectorDatabase: 'vector_databases',
  JSONLData: 'jsonl_data',
}

export * from './flow-node'
export * from './llm'
export * from './message'
export * from './thread'
export * from './prompt'
export * from './prompt-variable'
export * from './session'
export * from './schema'
export * from './tool-definition'
export * from './vector-database'
