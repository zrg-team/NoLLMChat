import { Thread } from './thread'
import { Message } from './message'
import { LLM } from './llm'
import { FlowNode } from './flow-node'
import { FlowEdge } from './flow-edge'
import { Prompt } from './prompt'
import { PromptVariable } from './prompt-variable'
import { Session } from './session'

export { Thread, Message, LLM, FlowNode, FlowEdge, Prompt, PromptVariable, Session }

type AppEntity =
  | typeof Thread
  | typeof Message
  | typeof LLM
  | typeof FlowNode
  | typeof FlowEdge
  | typeof Prompt
  | typeof PromptVariable
  | typeof Session

export const entitiesMap: Record<string, AppEntity> = {
  LLM,
  Thread,
  Message,
  FlowNode,
  FlowEdge,
  Prompt,
  PromptVariable,
  Session,
}
// This file should not be use in main codebase. ONLY WORKER should use this file.
