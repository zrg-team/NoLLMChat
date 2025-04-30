import type { FileSystemTree } from '@webcontainer/api'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'
import type {
  Embedding,
  LLM,
  LLMStatusEnum,
  Mcp,
  Prompt,
  VectorDatabase,
} from 'src/services/database/types'

export interface WorkspaceState {
  showExtendedMenu: boolean
  loading: boolean
  llm?: LLM
  llmStatus?: LLMStatusEnum
  llmProgress?: string
  fileSystemTree?: FileSystemTree
  embedding?: Embedding
  codeVectorDatabase?: VectorDatabase
  codeVectorDatabaseInstance?: PGLiteVectorStore
  contextVectorDatabase?: VectorDatabase
  contextVectorDatabaseInstance?: PGLiteVectorStore
  prompts: Record<string, Prompt>
  mcps: Mcp[]
}

export const defaultWorkspaceState: WorkspaceState = {
  prompts: {},
  loading: false,
  llm: undefined,
  llmStatus: undefined,
  llmProgress: undefined,
  fileSystemTree: undefined,
  showExtendedMenu: false,
  embedding: undefined,
  codeVectorDatabase: undefined,
  contextVectorDatabase: undefined,
  codeVectorDatabaseInstance: undefined,
  contextVectorDatabaseInstance: undefined,
  mcps: [],
}
