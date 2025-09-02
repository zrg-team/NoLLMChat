import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import type { FlowNode, ToolDefinition } from 'src/services/database/types'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { OpenAPITool, SchemaField, OpenAISchemaProperty } from 'src/types/openai'

interface ToolNodeData {
  entity: ToolDefinition
  label?: string
}

export class ToolNodeHandler extends BaseNodeHandler<void, void> {
  nodeType = FlowNodeTypeEnum.ToolDefinition

  /**
   * Prepare phase - parse tool schema and info into OpenAPI tool format
   * Store tool info in flow state for other handlers to use
   */
  async prepare(node: FlowNode, context: FlowExecutionContext) {
    const nodeData = node.data as ToolNodeData
    const toolEntity = nodeData.entity

    if (!toolEntity) {
      throw new Error(`No tool entity found for node: ${node.id}`)
    }

    // Parse schema into OpenAPI tool format
    const openAPITool = this.parseToOpenAPIFormat(toolEntity)

    // Add to tools array in state (similar to how SchemaNode handles schemas)
    const tools = (context.getState('tools') as OpenAPITool[]) || []
    tools.push(openAPITool)
    context.setState('tools', tools)
  }

  /**
   * Execute phase - no action needed for Tool nodes
   * Tool nodes only provide information, they don't execute workflows
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Tool nodes don't need to execute anything, they just provide information
  }

  /**
   * Parse ToolDefinition schema into OpenAPI tool format
   */
  private parseToOpenAPIFormat(toolDefinition: ToolDefinition): OpenAPITool {
    const properties: Record<string, OpenAISchemaProperty> = {}
    const required: string[] = []

    // Parse schema array into properties object
    if (toolDefinition.schema && Array.isArray(toolDefinition.schema)) {
      toolDefinition.schema.forEach((fieldData) => {
        const field = fieldData as unknown as SchemaField
        if (field.name) {
          const property: OpenAISchemaProperty = {
            type: field.type || 'string',
            description: field.description || '',
          }

          if (field.enum) {
            property.enum = field.enum
          }

          if (field.default !== undefined) {
            property.default = field.default
          }

          properties[field.name] = property

          if (field.required === true) {
            required.push(field.name)
          }
        }
      })
    }

    return {
      type: 'function',
      function: {
        name: toolDefinition.name,
        description: toolDefinition.description || '',
        parameters: {
          type: 'object',
          properties,
          ...(required.length > 0 && { required }),
        },
      },
    }
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as ToolNodeData
    const isValid = Boolean(nodeData?.entity?.id && nodeData?.entity?.name)

    return isValid
  }

  async onBeforeExecute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // No action needed for Tool nodes
  }

  async onAfterExecute(
    _node: FlowNode,
    _result: void,
    _context: FlowExecutionContext,
  ): Promise<void> {
    // No action needed for Tool nodes
  }
}
