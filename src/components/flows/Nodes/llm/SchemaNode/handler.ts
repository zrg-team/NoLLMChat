import { FlowNode, FlowNodeTypeEnum, Schema, SchemaItem } from 'src/services/database/types'
import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import { OpenAISchema, OpenAISchemaProperty } from 'src/types/openai'

interface SchemaNodeData {
  entity: Schema
  [key: string]: unknown
}

export class SchemaNodeHandler extends BaseNodeHandler<void, void> {
  nodeType = FlowNodeTypeEnum.Schema

  /**
   * Prepare phase - parse database schema to OpenAI format and store in state
   */
  async prepare(node: FlowNode, context: FlowExecutionContext): Promise<void> {
    const nodeData = node.data as SchemaNodeData
    const schema = nodeData.entity

    if (!schema) {
      throw new Error(`No schema entity found for node: ${node.id}`)
    }

    // Convert database schema to OpenAI format
    const openAISchema = this.parseToOpenAIFormat(schema)

    // Add to schemas array in state
    const schemas = (context.getState('schemas') as OpenAISchema[]) || []
    schemas.push(openAISchema)
    context.setState('schemas', schemas)
  }

  /**
   * Execute phase - no action needed for schema nodes
   * Schema nodes only provide structure information, they don't execute workflows
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Schema nodes don't need to execute anything, they just provide schema information
  }

  /**
   * Parse database Schema to OpenAI structured output format
   */
  private parseToOpenAIFormat(schema: Schema): OpenAISchema {
    const properties: Record<string, OpenAISchemaProperty> = {}
    const required: string[] = []

    // Parse schema items into properties
    if (schema.schema_items && schema.schema_items.length > 0) {
      schema.schema_items.forEach((item) => {
        if (item.name) {
          const property = this.parseSchemaItem(item)
          properties[item.name] = property

          if (item.required) {
            required.push(item.name)
          }
        }
      })
    }

    return {
      name: schema.name,
      schema: {
        type: 'object',
        properties,
        ...(required.length > 0 && { required }),
        additionalProperties: false,
      },
    }
  }

  /**
   * Parse individual SchemaItem to OpenAI property format
   */
  private parseSchemaItem(item: SchemaItem): OpenAISchemaProperty {
    const property: OpenAISchemaProperty = {
      type: item.type.toLowerCase(),
    }

    if (item.description) {
      property.description = item.description
    }

    if (item.enum) {
      try {
        property.enum = JSON.parse(item.enum)
      } catch {
        // If enum is not valid JSON, treat as comma-separated values
        property.enum = item.enum.split(',').map((v) => v.trim())
      }
    }

    // Handle nested objects and arrays
    if (item.type === 'object' && item.schemas && item.schemas.length > 0) {
      property.properties = {}
      const nestedRequired: string[] = []

      item.schemas.forEach((nestedItem) => {
        if (nestedItem.name && property.properties) {
          property.properties[nestedItem.name] = this.parseSchemaItem(nestedItem)
          if (nestedItem.required) {
            nestedRequired.push(nestedItem.name)
          }
        }
      })

      if (nestedRequired.length > 0) {
        property.required = nestedRequired
      }
    }

    if (item.type === 'array' && item.schemas && item.schemas.length > 0) {
      // For arrays, use the first schema item as the items definition
      property.items = this.parseSchemaItem(item.schemas[0])
    }

    return property
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as SchemaNodeData
    const isValid = Boolean(nodeData?.entity?.id && nodeData?.entity?.name)

    return isValid
  }
}
