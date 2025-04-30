import { AgentAction } from '@langchain/core/agents'

export const appendToolActionToResponse = (
  message: string,
  action: AgentAction,
  actionResponse: { content: string },
) => {
  return [
    message,
    '<cplusai_tool_call>',
    `<name>${action.tool}</name>`,
    `<input>${JSON.stringify(action.toolInput)}</input>`,
    `<response>${actionResponse.content}</response>`,
    '</cplusai_tool_call>',
  ].join('\n')
}
