import { Thread } from './thread'
import { Message } from './message'
import { LLM } from './llm'
import { FlowNode } from './flow-node'
import { FlowEdge } from './flow-edge'
import { Prompt } from './prompt'
import { PromptVariable } from './prompt-variable'
import { Session } from './session'
import { Schema } from './schema'
import { SchemaItem } from './schema_item'
import { JSONData } from './json-data'
import { CSVData } from './csv-data'

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
}
// This file should not be use in main codebase. ONLY WORKER should use this file.
