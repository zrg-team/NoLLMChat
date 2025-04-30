import { ToolNode } from '@langchain/langgraph/prebuilt'
import { ContextInfoTypes } from 'src/services/agent/types'

import { TOOL_NAME as CODE_SEARCH_TOOL } from 'src/services/agent/tools/code-search-tool'
import { TOOL_NAME as SOURCE_STRUCTURE_TOOL } from 'src/services/agent/tools/source-structure-tool'
import { TOOL_NAME as TERMINAL_TOOL } from 'src/services/agent/tools/terminal-tool'
import { TOOL_NAME as VIEW_APPLICATION_TOOL } from 'src/services/agent/tools/view-application-preview'
import { TOOL_NAME as WRITE_CODE_FILE_TOOL } from 'src/services/agent/tools/write-code-file-tool'

import { getAgent } from './actions/agent'
import { getTools } from './actions/tools'
import { SimpleGraph } from './graph'
import { AGENT_SYSTEM_PROMPT } from './prompts'

export const createSimpleAgent = async (contextInfo: ContextInfoTypes) => {
  const tools = await getTools(contextInfo)
  const agent = getAgent({
    prompt: contextInfo?.prompts?.agent_system?.content || AGENT_SYSTEM_PROMPT,
    chatLLM: contextInfo.chatLLM,
    tools,
  })
  const toolExecutor = new ToolNode(tools)

  const graph = new SimpleGraph({
    contextInfo,
    toolExecutor,
    agent,
  })

  return graph
}

export const CONFIG = {
  name: 'simple',
  prompst: {
    agent_system: AGENT_SYSTEM_PROMPT,
  } as Record<string, string>,
  tools: [
    CODE_SEARCH_TOOL,
    SOURCE_STRUCTURE_TOOL,
    TERMINAL_TOOL,
    VIEW_APPLICATION_TOOL,
    WRITE_CODE_FILE_TOOL,
  ],
}
