import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import type { FlowNode, LLM } from 'src/services/database/types'
import { LLMStatusEnum, FlowNodeTypeEnum } from 'src/services/database/types'

interface LLMNodeData {
  entity: LLM
  status: LLMStatusEnum
  label?: string
}

export interface LLMInfo {
  llm: LLM
  status: LLMStatusEnum
  isLoaded: boolean
  isReady: boolean
}

export class LLMNodeHandler extends BaseNodeHandler<void, void> {
  nodeType = FlowNodeTypeEnum.LLM

  /**
   * Prepare phase - collect LLM information and load information from current node
   * Store LLM info in state for other handlers to use
   */
  async prepare(node: FlowNode, context: FlowExecutionContext) {
    const nodeData = node.data as LLMNodeData
    const llmEntity = nodeData.entity

    if (!llmEntity) {
      throw new Error(`No LLM entity found for node: ${node.id}`)
    }

    // Check if LLM is loaded and ready
    const isLoaded =
      nodeData.status === LLMStatusEnum.Loaded || llmEntity.status === LLMStatusEnum.Loaded
    const isReady = isLoaded && Boolean(llmEntity.connection_info)

    const llmInfo: LLMInfo = {
      llm: llmEntity,
      status: nodeData.status || llmEntity.status,
      isLoaded,
      isReady,
    }
    context.setState('llm', llmInfo)
  }

  /**
   * Execute phase - no action needed for LLM nodes
   * LLM nodes only provide information, they don't execute workflows
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // LLM nodes don't need to execute anything, they just provide information
  }

  validate(node: FlowNode): boolean {
    const nodeData = node.data as LLMNodeData
    const isValid = Boolean(nodeData?.entity?.id && nodeData?.entity?.name)

    return isValid
  }

  async onBeforeExecute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // No action needed for LLM nodes
  }

  async onAfterExecute(
    _node: FlowNode,
    _result: LLMInfo,
    _context: FlowExecutionContext,
  ): Promise<void> {
    // No action needed for LLM nodes
  }
}
