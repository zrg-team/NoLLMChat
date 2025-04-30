import { Workflow } from 'src/services/agent/base'

import { ToolNode } from '@langchain/langgraph/prebuilt'
import { RunnableSequence } from '@langchain/core/runnables'
import { AgentAction, AgentFinish } from 'langchain/agents'
import { actionToAIMessage, responseToStep } from 'src/services/agent/utils/tool-node'
import { logDebug, logError } from 'src/utils/logger'
import { ContextInfoTypes, ExecuteFuncConfig } from 'src/services/agent/types'

import type { SimpleGraphState } from './state'
import { NodeNames } from './type'
import { PREPARING_SYSTEM_PROMPT, preparingAnswerSchema } from './actions/preparing'
import { AIMessage } from '@langchain/core/messages'

export class SimpleGraph extends Workflow<
  SimpleGraphState,
  [NodeNames.PREPARING, NodeNames.RETRIEVAL, NodeNames.AGENT, NodeNames.TOOL, NodeNames.RESPONSE]
> {
  protected contextInfo: ContextInfoTypes
  protected toolExecutor: ToolNode
  protected agent: RunnableSequence<
    { steps: SimpleGraphState['steps'] },
    AgentFinish | AgentAction[]
  >
  private readonly DISABLE_AUTO_RETRIEVE = true

  constructor({
    toolExecutor,
    contextInfo,
    agent,
  }: {
    agent: RunnableSequence<{ steps: SimpleGraphState['steps'] }, AgentFinish | AgentAction[]>
    contextInfo: ContextInfoTypes
    toolExecutor: ToolNode
  }) {
    super({
      steps: [],
      messages: [],
      actions: undefined,
      thoughts: [],
    })
    this.agent = agent
    this.contextInfo = contextInfo
    this.toolExecutor = toolExecutor
    this.buildWorkflow()
  }

  private buildWorkflow() {
    this.addNode('preparing', this.preparingNode)
    this.addNode('tool', this.toolNode)
    this.addNode('agent', this.agentNode)
    this.addNode('retrieval', this.retrievalNode)
    this.addNode('response', this.responseNode)

    this.setStartNode('preparing')
    this.setEndNode('response')

    this.addConditionConnection(
      'preparing',
      [NodeNames.RETRIEVAL, NodeNames.AGENT],
      this.retrievalCondition,
    )
    this.addConnection('retrieval', 'agent')
    this.addConditionConnection(
      'agent',
      [NodeNames.AGENT, NodeNames.TOOL, NodeNames.RESPONSE],
      this.agentCondition,
    )
    this.addConnection('tool', 'agent')
  }

  retrievalCondition(state: SimpleGraphState) {
    if (!state.shouldRetrieve) {
      return NodeNames.RETRIEVAL
    }
    return NodeNames.AGENT
  }

  agentCondition(state: SimpleGraphState) {
    logDebug('[AgentCondition] action', state.actions)
    if (!state.actions) {
      return NodeNames.AGENT
    } else if ('returnValues' in state.actions) {
      return NodeNames.RESPONSE
    }
    return NodeNames.TOOL
  }

  preparingNode = async (state: SimpleGraphState, config?: ExecuteFuncConfig<SimpleGraphState>) => {
    try {
      if (this.DISABLE_AUTO_RETRIEVE) {
        config?.setState({
          shouldRetrieve: false,
        })
        return
      }
      const structuredLLM = this.contextInfo.chatLLM.withStructuredOutput(preparingAnswerSchema)

      const result = await structuredLLM.invoke([PREPARING_SYSTEM_PROMPT, ...state.messages])

      config?.setState({
        shouldRetrieve: !!result.shouldRetrieve,
      })
    } catch (error) {
      // Handle error
      logError('[SimpleGraph] preparingNode error', error)
    }
  }

  toolNode = async (state: SimpleGraphState, config?: ExecuteFuncConfig<SimpleGraphState>) => {
    let { actions } = state
    if (!actions) {
      throw new Error('No action found in state')
    }
    if ('ReturnValues' in actions) {
      return
    }
    const callbacks = this.getCallbacks(`${NodeNames.TOOL}`)
    if (!Array.isArray(actions)) {
      actions = [actions as unknown as AgentAction]
    }
    actions.forEach((action) => {
      callbacks.forEach((callback) => {
        callback({ action, key: 'TOOL_START' }, state)
      })
    })
    const results = await this.toolExecutor.invoke([actionToAIMessage(actions)], {
      signal: config?.abortController?.signal,
    })

    const toolCallResponse: { action: AgentAction; actionResponse: { content: string } }[] = []
    actions.forEach((action) => {
      const result = results.find(
        (item: { tool_call_id: string }) =>
          'toolCallId' in action && item.tool_call_id === action.toolCallId,
      )
      if (result) {
        toolCallResponse.push({
          action,
          actionResponse: result,
        })
        callbacks.forEach((callback) => {
          callback({ action, result, key: 'TOOL_END' }, state)
        })
      }
    })

    const steps = responseToStep(results, actions)

    config?.setState((prevState) => {
      return {
        ...prevState,
        steps: [...prevState.steps, ...steps],
      }
    })
  }

  agentNode = async (state: SimpleGraphState, config?: ExecuteFuncConfig<SimpleGraphState>) => {
    const invokeState = {
      ...state,
    }
    if (state.response) {
      invokeState.thoughts = [new AIMessage(state.response)]
    }
    const result = await this.agent.invoke(invokeState, {
      callbacks: [
        {
          handleLLMNewToken: (token: string) => {
            config?.setState((prevState) => ({
              ...prevState,
              response: prevState.response ? `${prevState.response || ''}${token}` : token,
            }))
          },
        },
      ],
      signal: config?.abortController?.signal,
    })

    config?.setState({
      actions: result,
    })
  }

  retrievalNode() {}

  responseNode(state: SimpleGraphState, config?: ExecuteFuncConfig<SimpleGraphState>) {
    const finishAction = state.actions
    if (finishAction && 'returnValues' in finishAction) {
      finishAction.returnValues.output += state.response || ''
      config?.setState({
        actions: finishAction,
      })
    }
  }
}
