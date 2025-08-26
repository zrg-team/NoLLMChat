import { FlowNodeTypeEnum } from 'src/services/database/types'

import { ToolbarNode } from './system/ToolboxNode'
import { ApplicationBarNode } from './system/ApplicationBarNode'
import { EmbeddingNode } from './system/EmbeddingNode'
import { SessionInfoNode } from './system/SessionInfoNode'

import { ThreadNode } from './chat/ThreadNode'
import { MessageNode } from './chat/MessageNode'

import { LLMNode } from './llm/LLMNode/LLMNode'
import { PromptNode } from './llm/PromptNode'
import { SchemaNode } from './llm/SchemaNode'
import { ToolNode } from './llm/ToolNode'

import { CSVDataNode } from './data/CSVDataNode'
import { VectorDatabaseNode } from './data/VectorDatabaseNode'
import { JSONLDataNode } from './data/JSONLDataNode'
import { PlaceholderNode } from './PlaceholderNode'
import { McpNode } from './llm/MCPNode'
import { BasicAgentNode } from './llm/BasicAgentNode'

import { EditorAppNode } from './apps/EditorAppNode'
import { VSLiteAppNode } from './apps/VSLiteAppNode'

import { ShapeNode } from './shapes/ShapeNode'
import { CircleNode } from './shapes/CircleNode'
import { TriangleNode } from './shapes/TriangleNode'

export const nodeTypes = {
  [FlowNodeTypeEnum.LLM]: LLMNode,
  [FlowNodeTypeEnum.Toolbox]: ToolbarNode,
  [FlowNodeTypeEnum.Thread]: ThreadNode,
  [FlowNodeTypeEnum.Message]: MessageNode,
  [FlowNodeTypeEnum.Prompt]: PromptNode,
  [FlowNodeTypeEnum.SessionInfo]: SessionInfoNode,
  [FlowNodeTypeEnum.Schema]: SchemaNode,
  [FlowNodeTypeEnum.CSVData]: CSVDataNode,
  [FlowNodeTypeEnum.ToolDefinition]: ToolNode,
  [FlowNodeTypeEnum.DefaultEmbeddingModel]: EmbeddingNode,
  [FlowNodeTypeEnum.VectorDatabase]: VectorDatabaseNode,
  [FlowNodeTypeEnum.JSONLData]: JSONLDataNode,
  [FlowNodeTypeEnum.ApplicationBar]: ApplicationBarNode,
  [FlowNodeTypeEnum.Shape]: ShapeNode,
  [FlowNodeTypeEnum.CircleShape]: CircleNode,
  [FlowNodeTypeEnum.TriangleShape]: TriangleNode,
  [FlowNodeTypeEnum.EditorApp]: EditorAppNode,
  [FlowNodeTypeEnum.PlaceHolder]: PlaceholderNode,
  [FlowNodeTypeEnum.VSLiteApp]: VSLiteAppNode,
  [FlowNodeTypeEnum.MCP]: McpNode,
  [FlowNodeTypeEnum.BasicAgent]: BasicAgentNode,
}
