import { HumanMessage, SystemMessage, AIMessage, BaseMessage } from '@langchain/core/messages'
import {
  FlowNode,
  FlowNodeTypeEnum,
  Prompt,
  PromptTypeEnum,
  CSVData,
} from 'src/services/database/types'
import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import { decodeCSVData } from 'src/utils/string-data'

interface PromptNodeData {
  entity: Prompt
  [key: string]: unknown
}

export class PromptNodeHandler extends BaseNodeHandler<void, void> {
  nodeType = FlowNodeTypeEnum.Prompt

  /**
   * Prepare phase - collect CSV data from connected nodes and build prompts following buildHistories logic
   */
  async prepare(node: FlowNode, context: FlowExecutionContext): Promise<void> {
    const nodeData = node.data as PromptNodeData
    const prompt = nodeData.entity

    if (!prompt) {
      throw new Error(`No prompt entity found for node: ${node.id}`)
    }

    // Get connected nodes to find CSV data
    const connectedNodes = context.getConnectedNodes(node.id, 'target')
    const csvDataNode = connectedNodes.find((n) => n.node_type === FlowNodeTypeEnum.CSVData)

    // Collect variables from prompt entity's variables relationship or session state
    const variables: Record<string, string> = {}

    // Check if prompt has variables relationship loaded
    if (prompt.variables && prompt.variables.length > 0) {
      prompt.variables.forEach((promptVariable) => {
        if (promptVariable.name && promptVariable.value) {
          variables[promptVariable.name] = promptVariable.value
        }
      })
    }

    // Also check session state for additional variables
    const sessionVariables = (context.getState('prompt_variables') as Record<string, string>) || {}
    Object.assign(variables, sessionVariables)

    let content = `${prompt.prefix ? `${prompt.prefix}\n` : ''}`

    // Handle FewShotExample prompts with CSV data (following buildHistories logic)
    if (prompt.type === PromptTypeEnum.FewShotExample && csvDataNode) {
      const csvData = (csvDataNode.data as { entity: CSVData })?.entity

      if (csvData && csvData.headers && csvData.csv) {
        const { rows } = decodeCSVData(csvData.headers, csvData.csv)
        rows.forEach((row: Record<string, unknown>) => {
          // Replace {variable} patterns with CSV row data
          content += `${prompt.content.replace(/{([^{}]*)}/g, (_, key) => `${row[key as keyof typeof row]}`)}\n`
        })
      }
    } else {
      content += prompt.content
    }

    if (prompt.suffix) {
      content += `\n${prompt.suffix}`
    }

    // Replace variables in the final content using collected variables
    if (Object.keys(variables).length > 0) {
      Object.entries(variables).forEach(([name, value]) => {
        // Replace {variable} patterns
        const regex = new RegExp(`{\\s*${name}\\s*}`, 'g')
        content = content.replace(regex, value)

        // Also replace {{variable}} patterns for compatibility
        const doubleRegex = new RegExp(`{{\\s*${name}\\s*}}`, 'g')
        content = content.replace(doubleRegex, value)
      })
    }

    // Create message based on role (following buildHistories logic)
    const messages: BaseMessage[] = []
    switch (prompt.role) {
      case 'human':
        messages.push(new HumanMessage(content))
        break
      case 'system':
        messages.push(new SystemMessage(content))
        break
      default:
        messages.push(new AIMessage(content))
        break
    }

    // Add to prompts array in state
    const prompts = (context.getState('prompts') as BaseMessage[]) || []
    prompts.push(...messages)
    context.setState('prompts', prompts)
  }

  /**
   * Execute phase - no action needed for prompt nodes
   * Prompt nodes only prepare data, they don't execute workflows
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Prompt nodes don't need to execute anything, they just prepare prompt data
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as PromptNodeData
    const isValid = Boolean(nodeData?.entity?.content)

    return isValid
  }
}
