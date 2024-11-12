import { Node } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'

import { DEFAULT_EMBEDDING_MODEL } from './embedding'

export const TOOLBOX_NODE_SIZE = {
  width: 340,
  height: 200,
}

export const SESSION_INFO_SIZE = {
  width: 340,
  height: 580,
}

export const SYSTEM_NODE_IDS = {
  [FlowNodeTypeEnum.Toolbox]: 'toolbox',
  [FlowNodeTypeEnum.SessionInfo]: 'session-info',
  [FlowNodeTypeEnum.DefaultEmbeddingModel]: 'default-embedding-model',
}

export const TOOLBOX_NODE: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.Toolbox],
  type: FlowNodeTypeEnum.Toolbox,
  position: { x: window.innerWidth / 2 - TOOLBOX_NODE_SIZE.width / 2, y: 10 },
  measured: TOOLBOX_NODE_SIZE,
  data: {},
}

export const SESSION_INFO_NODE: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.SessionInfo],
  type: FlowNodeTypeEnum.SessionInfo,
  position: { x: 10, y: 10 },
  measured: SESSION_INFO_SIZE,
  data: {},
}

export const EMBEDDING_MODEL: Node = {
  id: SYSTEM_NODE_IDS[FlowNodeTypeEnum.DefaultEmbeddingModel],
  type: FlowNodeTypeEnum.DefaultEmbeddingModel,
  position: { x: 10, y: 30 + SESSION_INFO_SIZE.height },
  data: {
    model: DEFAULT_EMBEDDING_MODEL,
  },
}

export const DEFAULT_SYSTEM_NODES = [TOOLBOX_NODE, SESSION_INFO_NODE, EMBEDDING_MODEL]
