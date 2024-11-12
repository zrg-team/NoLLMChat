import { Node } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'

export const TOOLBOX_NODE_SIZE = {
  width: 340,
  height: 200,
}

export const SESSION_INFO_SIZE = {
  width: 340,
  height: 200,
}

export const SYSTEM_NODE_IDS = {
  toolbox: 'toolbox',
  sessionInfo: 'session-info',
}

export const TOOLBOX_NODE: Node = {
  id: SYSTEM_NODE_IDS.toolbox,
  type: FlowNodeTypeEnum.Toolbox,
  position: { x: window.innerWidth / 2 - TOOLBOX_NODE_SIZE.width / 2, y: 10 },
  measured: TOOLBOX_NODE_SIZE,
  data: {},
}

export const SESSION_INFO_NODE: Node = {
  id: SYSTEM_NODE_IDS.sessionInfo,
  type: FlowNodeTypeEnum.SessionInfo,
  position: { x: 10, y: 10 },
  measured: SESSION_INFO_SIZE,
  data: {},
}
