import { Connection } from '@xyflow/react'
import { FlowNodeTypeEnum, Schema, SchemaItem, ToolDefinition } from 'src/services/database/types'
import { DefaultNode } from './flow-node'

export const toLocalLLMToolCallingInput = (
  tools?: {
    node: DefaultNode
    connectedNodes?: DefaultNode[]
    connections: Connection[]
  }[],
): {
  name: string
  description: string
  schemaItems: SchemaItem[]
}[] => {
  if (!tools) {
    return []
  }
  return tools.reduce(
    (all: { name: string; description: string; schemaItems: SchemaItem[] }[], item) => {
      const toolEntity = item.node.data?.entity as ToolDefinition
      const toolSchemaEnity = item?.connectedNodes?.find(
        (node) => node.type === FlowNodeTypeEnum.Schema,
      )?.data?.entity as Schema
      if (toolEntity && toolSchemaEnity?.schema_items?.length) {
        all.push({
          name: toolEntity.name,
          description: toolEntity.description,
          schemaItems: toolSchemaEnity.schema_items,
        })
      }
      return all
    },
    [],
  )
}
