import { DynamicStructuredTool } from '@langchain/core/tools'
import { getMCPClientTools } from 'src/services/agent/mcp'
import { getCodeSearchTool } from 'src/services/agent/tools/code-search-tool'
import { getKnowledgeRetrievalTool } from 'src/services/agent/tools/knowledge-retrieval-tool'
import { getSourceStructureTool } from 'src/services/agent/tools/source-structure-tool'
import { getTernimalTool } from 'src/services/agent/tools/terminal-tool'
import { getViewApplicationPreview } from 'src/services/agent/tools/view-application-preview'
import { getWriteCodeFileTool } from 'src/services/agent/tools/write-code-file-tool'
import { ContextInfoTypes } from 'src/services/agent/types'
import { logInfo } from 'src/utils/logger'

export const getTools = async ({
  mpcs,
  preview,
  chatLLM,
  terminal,
  container,
  codeVectorStore,
  contextVectorStore,
  terminalProcessWriter,
}: ContextInfoTypes): Promise<DynamicStructuredTool[]> => {
  const tools: DynamicStructuredTool[] = []
  if (codeVectorStore) {
    const codeSearchTool = getCodeSearchTool({
      codeVectorStore,
    })
    tools.push(codeSearchTool)
  }
  if (codeVectorStore && contextVectorStore) {
    const fileStructureTool = getSourceStructureTool({
      codeVectorStore,
      contextVectorStore,
    })
    tools.push(fileStructureTool)
  }
  if (codeVectorStore) {
    const writeCodeFileTool = getWriteCodeFileTool({
      chatLLM,
      container,
      codeVectorStore,
    })
    tools.push(writeCodeFileTool)
  }
  if (terminal && container) {
    const executeTerminalTool = getTernimalTool({
      terminal,
      container,
      terminalProcessWriter,
    })
    tools.push(executeTerminalTool)
  }
  if (contextVectorStore) {
    const knowledgeRetrievalTool = getKnowledgeRetrievalTool({
      contextVectorStore,
    })
    tools.push(knowledgeRetrievalTool)
  }
  if (container) {
    tools.push(
      getViewApplicationPreview({
        container,
        preview,
      }),
    )
  }
  if (mpcs?.length) {
    const mcpTools = await getMCPClientTools(mpcs)
    logInfo(`[Tools] Found ${mcpTools.length} MCP tools`)
    tools.push(...mcpTools)
  }

  return tools
}
