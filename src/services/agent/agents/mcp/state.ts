import { BaseMessage } from '@langchain/core/messages'
import { AgentAction, AgentFinish, AgentStep } from 'langchain/agents'
import { BaseWorkflowState } from 'src/services/agent/base'

export type MCPGraphState = {
  steps: AgentStep[]
  messages: BaseMessage[]
  actions?: AgentAction[] | AgentFinish
  shouldRetrieve?: boolean
  thoughts: BaseMessage[]
} & BaseWorkflowState
