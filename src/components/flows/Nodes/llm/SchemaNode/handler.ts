import { FlowNode } from 'src/services/database/entities'
import { FlowNodeTypeEnum, Schema } from 'src/services/database/types'
import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'

interface SchemaNodeData {
  entity: Schema
  [key: string]: unknown
}

export class SchemaNodeHandler extends BaseNodeHandler<void, void> {
  nodeType = FlowNodeTypeEnum.Schema

  /**
   * Prepare phase - collect schema and schema_items information and put in state
   */
  async prepare(node: FlowNode, context: FlowExecutionContext): Promise<void> {
    const nodeData = node.data as SchemaNodeData
    const schema = nodeData.entity

    if (!schema) {
      throw new Error(`No schema entity found for node: ${node.id}`)
    }

    // Add to schemas array in state
    const schemas = (context.getState('schemas') as Schema[]) || []
    schemas.push(schema)
    context.setState('schemas', schemas)
  }

  /**
   * Execute phase - no action needed for schema nodes
   * Schema nodes only provide structure information, they don't execute workflows
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Schema nodes don't need to execute anything, they just provide schema information
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as SchemaNodeData
    const isValid = Boolean(nodeData?.entity?.id && nodeData?.entity?.name)

    return isValid
  }
}
