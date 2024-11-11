import { FlowNodeTypeEnum } from 'src/services/database/types'

import { ToolbarNode } from './ToolboxNode'
import { LLMNode } from './LLMNode/LLMNode'
import { ThreadNode } from './ThreadNode'
import { MessageNode } from './MessageNode'
import { PromptNode } from './PromptNode'
import { SessionInfoNode } from './SessionInfoNode'
import { SchemaNode } from './SchemaNode'
import { CSVDataNode } from './CSVDataNode'

export const nodeTypes = {
  [FlowNodeTypeEnum.LLM]: LLMNode,
  [FlowNodeTypeEnum.Toolbox]: ToolbarNode,
  [FlowNodeTypeEnum.Thread]: ThreadNode,
  [FlowNodeTypeEnum.Message]: MessageNode,
  [FlowNodeTypeEnum.Prompt]: PromptNode,
  [FlowNodeTypeEnum.SessionInfo]: SessionInfoNode,
  [FlowNodeTypeEnum.Schema]: SchemaNode,
  [FlowNodeTypeEnum.CSVData]: CSVDataNode,
}
