import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StructuredToolInterface } from '@langchain/core/tools'
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
import { LanguageModelLike, ToolDefinition } from '@langchain/core/language_models/base'
import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { AgentAction, AgentFinish, AgentStep } from '@langchain/core/agents'
import { ToolCall } from '@langchain/core/messages/tool'
import { BaseOutputParser, OutputParserException } from '@langchain/core/output_parsers'
import { ChatGeneration } from '@langchain/core/outputs'
import { AIMessage, BaseMessage, isBaseMessage } from '@langchain/core/messages'

function _isBaseChatModel(x: LanguageModelLike): x is BaseChatModel {
  const model = x as BaseChatModel
  return typeof model._modelType === 'function' && model._modelType() === 'base_chat_model'
}

export function formatLogToString(
  intermediateSteps: AgentStep[],
  observationPrefix = 'Observation: ',
  llmPrefix = 'Thought: ',
): string {
  const formattedSteps = intermediateSteps.reduce(
    (thoughts, { action, observation }) =>
      thoughts + [action.log, `${observationPrefix}${observation}`, llmPrefix, '\n'].join('\n'),
    '',
  )
  return ['Chain of Thought:', formattedSteps].join('\n')
}

export type ToolsAgentAction = AgentAction & {
  toolCallId: string
  messageLog?: BaseMessage[]
}

export type ToolsAgentStep = AgentStep & {
  action: ToolsAgentAction
}

export function parseAIMessageToToolAction(message: AIMessage): ToolsAgentAction[] | AgentFinish {
  const stringifiedMessageContent =
    typeof message.content === 'string' ? message.content : JSON.stringify(message.content)
  let toolCalls: ToolCall[] = []
  if (message.tool_calls !== undefined && message.tool_calls.length > 0) {
    toolCalls = message.tool_calls
  } else {
    if (
      message.additional_kwargs.tool_calls === undefined ||
      message.additional_kwargs.tool_calls.length === 0
    ) {
      return {
        returnValues: { output: message.content },
        log: stringifiedMessageContent,
      }
    }
    // Best effort parsing
    for (const toolCall of message.additional_kwargs.tool_calls ?? []) {
      const functionName = toolCall.function?.name
      try {
        const args = JSON.parse(toolCall.function.arguments)
        toolCalls.push({ name: functionName, args, id: toolCall.id })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw new OutputParserException(
          `Failed to parse tool arguments from chat model response. Text: "${JSON.stringify(
            toolCalls,
          )}". ${e}`,
        )
      }
    }
  }
  return toolCalls.map((toolCall, i) => {
    const messageLog = i === 0 ? [message] : []
    const log = `Invoking "${toolCall.name}" with ${JSON.stringify(
      toolCall.args ?? {},
    )}\n${stringifiedMessageContent}`
    return {
      tool: toolCall.name as string,
      toolInput: toolCall.args,
      toolCallId: toolCall.id ?? '',
      log,
      messageLog,
    }
  })
}

export abstract class AgentMultiActionOutputParser extends BaseOutputParser<
  AgentAction[] | AgentFinish
> {}

export class ToolCallingAgentOutputParser extends AgentMultiActionOutputParser {
  lc_namespace = ['langchain', 'agents', 'tool_calling']

  static lc_name() {
    return 'ToolCallingAgentOutputParser'
  }

  async parse(text: string): Promise<AgentAction[] | AgentFinish> {
    throw new Error(`ToolCallingAgentOutputParser can only parse messages.\nPassed input: ${text}`)
  }

  async parseResult(generations: ChatGeneration[]) {
    if ('message' in generations[0] && isBaseMessage(generations[0].message)) {
      return parseAIMessageToToolAction(generations[0].message)
    }
    throw new Error(
      'parseResult on ToolCallingAgentOutputParser only works on ChatGeneration output',
    )
  }

  getFormatInstructions(): string {
    throw new Error('getFormatInstructions not implemented inside ToolCallingAgentOutputParser.')
  }
}

export type CreateToolCallingAgentParams = {
  llm: LanguageModelLike
  tools: StructuredToolInterface[] | ToolDefinition[]
  prompt: ChatPromptTemplate
}

export function createToolCallingAgent({ llm, tools, prompt }: CreateToolCallingAgentParams) {
  if (!prompt.inputVariables.includes('agent_scratchpad')) {
    throw new Error(
      [
        `Prompt must have an input variable named "agent_scratchpad".`,
        `Found ${JSON.stringify(prompt.inputVariables)} instead.`,
      ].join('\n'),
    )
  }
  let modelWithTools
  if (_isBaseChatModel(llm)) {
    if (llm.bindTools === undefined) {
      throw new Error(
        `This agent requires that the "bind_tools()" method be implemented on the input model.`,
      )
    }
    modelWithTools = llm.bindTools(tools)
  } else {
    modelWithTools = llm
  }

  const agent = RunnableSequence.from(
    [
      RunnablePassthrough.assign({
        agent_scratchpad: (input: { steps: AgentStep[] }) => formatLogToString(input.steps),
      }),
      prompt,
      modelWithTools,
      new ToolCallingAgentOutputParser(),
    ],
    {
      name: 'ToolCallingAgent',
    },
  )
  return agent
}
