import { DynamicStructuredTool } from '@langchain/core/tools'
import { getMCPClientTools } from 'src/services/agent/mcp'
import { getKnowledgeRetrievalTool } from 'src/services/agent/tools/knowledge-retrieval-tool'
import { getWriteCodeFileToEditorTool } from 'src/services/agent/tools/write-code-file-to-editor-tool'
import { ContextInfoTypes } from 'src/services/agent/types'
import { logInfo } from 'src/utils/logger'

export const getTools = async ({
  mpcs,
  container,
  contextVectorStore,
}: ContextInfoTypes): Promise<DynamicStructuredTool[]> => {
  const tools: DynamicStructuredTool[] = []
  tools.push(
    getWriteCodeFileToEditorTool({
      container,
    }),
  )
  if (contextVectorStore) {
    const knowledgeRetrievalTool = getKnowledgeRetrievalTool({
      contextVectorStore,
    })
    tools.push(knowledgeRetrievalTool)
  }
  if (mpcs?.length) {
    const mcpTools = await getMCPClientTools(mpcs)
    logInfo(
      `[Tools] Found ${mcpTools.length} MCP tools. Tools: ${mcpTools.map((item) => item.name).join(', ')}.`,
    )
    tools.push(...mcpTools)
  }

  return tools
}
