import { Thread } from './thread'
import { Message } from './message'
import { LLM } from './llm'
import { FlowNode } from './flow-node'
import { FlowEdge } from './flow-edge'
import { Prompt } from './prompt'
import { PromptVariable } from './prompt-variable'
import { Session } from './session'
import { Schema } from './schema'
import { SchemaItem } from './schema-item'
import { JSONData } from './json-data'
import { CSVData } from './csv-data'
import { ToolDefinition } from './tool-definition'
import { VectorDatabase } from './vector-database'
import { JSONLData } from './jsonl-data'
import { FlowNodeData } from './flow-node-data'
import { FlowNodePlaceholder } from './flow-node-placeholder'

export {
  Thread,
  Message,
  LLM,
  FlowNode,
  FlowEdge,
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
  FlowNodeData,
  FlowNodePlaceholder,
}

export type AppEntites =
  | typeof Thread
  | typeof Message
  | typeof LLM
  | typeof FlowNode
  | typeof FlowEdge
  | typeof Prompt
  | typeof PromptVariable
  | typeof Session
  | typeof Schema
  | typeof SchemaItem
  | typeof JSONData
  | typeof CSVData
  | typeof ToolDefinition
  | typeof VectorDatabase
  | typeof JSONLData
  | typeof FlowNodeData
  | typeof FlowNodePlaceholder

export const entitiesMap: Record<string, AppEntites> = {
  LLM,
  Thread,
  Message,
  FlowNode,
  FlowEdge,
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
  FlowNodeData,
  FlowNodePlaceholder,
}
// This file should not be use in main codebase. ONLY WORKER should use this file.
