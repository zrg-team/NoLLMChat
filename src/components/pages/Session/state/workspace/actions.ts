import type {
  Embedding,
  Graph,
  LLM,
  LLMStatusEnum,
  Mcp,
  Prompt,
  VectorDatabase,
} from 'src/services/database/types'
import type { FileSystemTree } from '@webcontainer/api'
import {
  updateFileSystemTree,
  type FileSystemTreeChange,
} from 'src/services/web-container/utils/file-tree'
import { SetState, GetState } from 'src/utils/zustand'
import { PGLiteVectorStore } from 'src/lib/langchain-pglite-vector-store'

import { defaultWorkspaceState, WorkspaceState } from './state'

export interface WorkspaceActions {
  setMainLLMInfo: (info: { llm: LLM; status: LLMStatusEnum; progress?: string }) => void
  setLLMInfo: (llm: LLM) => void
  updateLLMProgress: (progress: string) => void
  setLoading: (loading: boolean) => void
  updateLLMStatus: (status: LLMStatusEnum) => void
  setFileSystemTree: (tree: FileSystemTree) => void
  updateFileSystemTree: (changes: FileSystemTreeChange[]) => FileSystemTree
  setShowExtendedMenu: (show: boolean) => void
  setEmbedding: (embedding: Embedding) => void
  setCodeVectorDatabase: (vectorDatabase: VectorDatabase) => void
  setCodeVectorDatabaseInstance: (vectorDatabase: PGLiteVectorStore) => void
  setContextVectorDatabase: (vectorDatabase: VectorDatabase) => void
  setContextVectorDatabaseInstance: (vectorDatabase: PGLiteVectorStore) => void
  setPrompts: (prompts: Record<string, Prompt>) => void
  updatePrompts: (prompts: Record<string, Prompt>) => void
  setMCP: (mcps: Mcp[]) => void
  createOrUpdateMCP: (mcp: Mcp) => void
  reset: () => void
  setGraph: (input?: Graph) => void
}

export const getWorkspaceActions = (
  set: SetState<WorkspaceState>,
  get: GetState<WorkspaceState & WorkspaceActions>,
): WorkspaceActions => {
  return {
    setMainLLMInfo: (info) => {
      set({ llm: info.llm, llmStatus: info.status, llmProgress: info.progress })
    },
    setLLMInfo: (llm) => {
      set({ llm })
    },
    updateLLMProgress: (progress) => {
      set({ llmProgress: progress })
    },
    setLoading: (loading) => {
      set({ loading })
    },
    updateLLMStatus: (status) => {
      set({ llmStatus: status, llmProgress: '' })
    },
    setFileSystemTree: (tree) => {
      set({ fileSystemTree: tree })
    },
    updateFileSystemTree: (changes) => {
      const fileSystemTree = get().fileSystemTree
      const tree = updateFileSystemTree(fileSystemTree || {}, changes)
      set({ fileSystemTree: tree })
      return tree
    },
    setShowExtendedMenu: (show) => {
      set({ showExtendedMenu: show })
    },
    setEmbedding: (embedding) => {
      set({ embedding })
    },
    setCodeVectorDatabase: (vectorDatabase) => {
      set({ codeVectorDatabase: vectorDatabase })
    },
    setCodeVectorDatabaseInstance: (vectorDatabase) => {
      set({ codeVectorDatabaseInstance: vectorDatabase })
    },
    setContextVectorDatabase: (vectorDatabase) => {
      set({ contextVectorDatabase: vectorDatabase })
    },
    setContextVectorDatabaseInstance: (vectorDatabase) => {
      set({ contextVectorDatabaseInstance: vectorDatabase })
    },
    setPrompts: (prompts) => {
      set({ prompts })
    },
    updatePrompts: (prompts) => {
      const currentPrompts = get().prompts
      const updatedPrompts = { ...currentPrompts, ...prompts }
      set({ prompts: updatedPrompts })
      return updatedPrompts
    },
    setMCP: (mcps) => {
      set({ mcps })
    },
    setGraph: (graph) => {
      set({ graph })
    },
    createOrUpdateMCP: (mcp) => {
      const currentMcps = get().mcps
      const existingMcpIndex = currentMcps.findIndex((existingMcp) => existingMcp.id === mcp.id)
      if (existingMcpIndex !== -1) {
        // Update existing MCP
        const updatedMcps = [...currentMcps]
        updatedMcps[existingMcpIndex] = mcp
        set({ mcps: updatedMcps })
        return updatedMcps
      }
      const updatedMcps = [...currentMcps, mcp]
      set({ mcps: updatedMcps })
      return updatedMcps
    },
    reset: () => {
      set(JSON.parse(JSON.stringify(defaultWorkspaceState)))
    },
  }
}
