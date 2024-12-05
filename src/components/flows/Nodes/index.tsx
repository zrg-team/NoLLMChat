import { FlowNodeTypeEnum } from 'src/services/database/types'

import { ToolbarNode } from './ToolboxNode'
import { LLMNode } from './LLMNode/LLMNode'
import { ThreadNode } from './ThreadNode'
import { MessageNode } from './MessageNode'
import { PromptNode } from './PromptNode'
import { SessionInfoNode } from './SessionInfoNode'
import { SchemaNode } from './SchemaNode'
import { CSVDataNode } from './CSVDataNode'
import { ToolNode } from './ToolNode'
import { EmbeddingNode } from './EmbeddingNode'
import { VectorDatabaseNode } from './VectorDatabaseNode'
import { JSONLDataNode } from './JSONLDataNode'
import { ApplicationBarNode } from './ApplicationBarNode'
import { ShapeNode } from './ShapeNode'
import { CircleNode } from './CircleNode'
import { TriangleNode } from './TriangleNode'
import { EditorAppNode } from './EditorAppNode'
import { PlaceholderNode } from './PlaceholderNode'
import { CodeContainerAppNode } from './CodeContainerAppNode'
import { VSLiteAppNode } from './VSLiteAppNode'

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
  [FlowNodeTypeEnum.CodeContainerApp]: CodeContainerAppNode,
  [FlowNodeTypeEnum.VSLiteApp]: VSLiteAppNode,
}
