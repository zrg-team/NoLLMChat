import { FlowNodeTypeEnum } from 'src/services/database/types'

export const DEFAULT_NODE_SIZE: Partial<{
  [key in FlowNodeTypeEnum]: { width: number; height: number }
}> = {
  [FlowNodeTypeEnum.Shape]: { width: 100, height: 100 },
  [FlowNodeTypeEnum.CircleShape]: { width: 100, height: 100 },
  [FlowNodeTypeEnum.TriangleShape]: { width: 100, height: 100 },
  [FlowNodeTypeEnum.EditorApp]: { width: 1240, height: 400 },
}
