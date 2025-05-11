import { Message } from './message'
import { LLM } from './llm'
import { Prompt } from './prompt'
import { PromptVariable } from './prompt-variable'
import { Session } from './session'
import { Schema } from './schema'
import { SchemaItem } from './schema-item'
import { VectorDatabase } from './vector-database'
import { Embedding } from './embedding'
import { Mcp } from './mcp'
import { Graph } from './graph'

export {
  Message,
  LLM,
  Prompt,
  PromptVariable,
  Session,
  Schema,
  SchemaItem,
  VectorDatabase,
  Embedding,
  Mcp,
  Graph,
}

export type AppEntites =
  | typeof Message
  | typeof LLM
  | typeof Prompt
  | typeof PromptVariable
  | typeof Session
  | typeof Schema
  | typeof SchemaItem
  | typeof VectorDatabase
  | typeof Embedding
  | typeof Mcp
  | typeof Graph

export const entitiesMap: Record<string, AppEntites> = {
  LLM,
  Message,
  Prompt,
  PromptVariable,
  Session,
  Schema,
  SchemaItem,
  VectorDatabase,
  Embedding,
  Mcp,
  Graph,
}

// This file should not be use in main codebase. ONLY WORKER should use this file.
