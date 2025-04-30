import { AIMessage } from '@langchain/core/messages'
import { AgentAction, AgentStep } from 'langchain/agents'

export const responseToStep = (
  results: { tool_call_id: string; content: string }[],
  action: AgentAction[],
): AgentStep[] => {
  return results
    .map((step: { tool_call_id: string; content: string }) => {
      const inputAction = action.find((action) =>
        'toolCallId' in action ? action.toolCallId === step.tool_call_id : false,
      ) as AgentAction & { toolCallId: string }
      if (!inputAction) {
        return undefined
      }
      return {
        action: {
          tool: inputAction?.tool || '',
          toolInput: inputAction?.toolInput || {},
          toolCallId: inputAction?.toolCallId || '',
          log: inputAction?.log || '',
          messageLog: [
            new AIMessage({
              content: '',
              tool_calls: [
                {
                  name: inputAction.tool,
                  args:
                    typeof inputAction.toolInput === 'string'
                      ? { query: inputAction.toolInput }
                      : inputAction.toolInput,
                  id: inputAction.toolCallId,
                  type: 'tool_call',
                },
              ],
            }),
          ],
        },
        observation: JSON.stringify(`${step.content}`),
      }
    })
    .filter(Boolean) as AgentStep[]
}

export const actionToAIMessage = (action: AgentAction[]) => {
  return new AIMessage({
    content: '',
    tool_calls: action.map((action) => ({
      name: action.tool,
      args: typeof action.toolInput === 'string' ? { query: action.toolInput } : action.toolInput,
      id: 'toolCallId' in action ? `${action.toolCallId}` : `${Date.now()}`,
      type: 'tool_call',
    })),
  })
}
