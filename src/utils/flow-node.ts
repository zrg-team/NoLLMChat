import type { Node, NodeProps } from '@xyflow/react'
import type { FlowNode } from 'src/services/database/types'
import type { EntityType } from './orm-type'

export type DefaultNodeData = { flowNode: FlowNode; entity: EntityType<unknown> }
export type DefaultNodeProps<CustomData extends Record<string, unknown> | unknown> = Omit<
  NodeProps,
  'data'
> & { data: DefaultNodeData & CustomData }
export type DefaultNode = Node<DefaultNodeData>
