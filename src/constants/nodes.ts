import { Node } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'

import { DEFAULT_EMBEDDING_MODEL } from './embedding'

export const TOOLBOX_NODE_SIZE = {
  width: 440,
  height: 360,
}

export const SESSION_INFO_SIZE = {
  width: 380,
  height: 650,
}

export const APPLICATION_BAR_SIZE = {
  width: 400,
  height: 70,
}

export const EMBEDDING_MODEL_SIZE = {
  width: 400,
  height: 130,
}

export const SYSTEM_NODE_IDS = {
  [FlowNodeTypeEnum.Toolbox]: 'toolbox',
  [FlowNodeTypeEnum.SessionInfo]: 'session-info',
  [FlowNodeTypeEnum.DefaultEmbeddingModel]: 'default-embedding-model',
  [FlowNodeTypeEnum.ApplicationBar]: 'application-bar',
}

export const APPLICATION_BAR_MODEL: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.ApplicationBar],
  type: FlowNodeTypeEnum.ApplicationBar,
  position: { x: 10, y: 10 },
  data: {},
}

export const EMBEDDING_MODEL: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.DefaultEmbeddingModel],
  type: FlowNodeTypeEnum.DefaultEmbeddingModel,
  position: { x: 10, y: 10 + APPLICATION_BAR_SIZE.height + 5 },
  data: {
    model: DEFAULT_EMBEDDING_MODEL,
  },
}

export const TOOLBOX_NODE: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.Toolbox],
  type: FlowNodeTypeEnum.Toolbox,
  position: { x: 10 + SESSION_INFO_SIZE.width + 10, y: 10 },
  measured: TOOLBOX_NODE_SIZE,
  data: {},
}

export const SESSION_INFO_NODE: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.SessionInfo],
  type: FlowNodeTypeEnum.SessionInfo,
  position: { x: 10, y: 10 + APPLICATION_BAR_SIZE.height + EMBEDDING_MODEL_SIZE.height },
  measured: SESSION_INFO_SIZE,
  data: {},
}

export const DEFAULT_SYSTEM_NODES = [
  TOOLBOX_NODE,
  SESSION_INFO_NODE,
  EMBEDDING_MODEL,
  APPLICATION_BAR_MODEL,
]

export const DISABLED_DELETE_NODE_TYPES = [
  FlowNodeTypeEnum.Toolbox,
  FlowNodeTypeEnum.SessionInfo,
  FlowNodeTypeEnum.ApplicationBar,
  FlowNodeTypeEnum.EditorApp,
]
