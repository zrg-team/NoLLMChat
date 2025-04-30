import type { Message } from '../entities/message'
import type { LLM } from '../entities/llm'
import type { Prompt } from '../entities/prompt'
import type { PromptVariable } from '../entities/prompt-variable'
import type { Session } from '../entities/session'
import type { Schema } from '../entities/schema'
import type { SchemaItem } from '../entities/schema-item'
import type { VectorDatabase } from '../entities/vector-database'
import type { Embedding } from '../entities/embedding'
import type { Mcp } from '../entities/mcp'

export type EntityTypesMap = {
  Message: Message
  LLM: LLM
  Prompt: Prompt
  PromptVariable: PromptVariable
  Session: Session
  Schema: Schema
  SchemaItem: SchemaItem
  VectorDatabase: VectorDatabase
  Embedding: Embedding
  Mcp: Mcp
}

export type EntityArrayTypes = {
  [K in keyof EntityTypesMap]: EntityTypesMap[K][]
}[keyof EntityTypesMap]

export type EntityTypes = {
  [K in keyof EntityTypesMap]: EntityTypesMap[K]
}[keyof EntityTypesMap]

export type AppEntityNames = keyof EntityTypesMap

export type {
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
}

export const TABLE_NAMES = {
  Message: 'messages',
  LLM: 'llms',
  Prompt: 'prompts',
  PromptVariable: 'prompt_variables',
  Session: 'sessions',
  Schema: 'schemas',
  SchemaItem: 'schema_items',
  VectorDatabase: 'vector_databases',
  Embedding: 'embeddings',
  VectorDatabaseData: 'vector_database_data',
  MCP: 'mcps',
}

export * from './llm'
export * from './message'
export * from './prompt'
export * from './prompt-variable'
export * from './session'
export * from './schema'
export * from './vector-database'
export * from './embedding'
