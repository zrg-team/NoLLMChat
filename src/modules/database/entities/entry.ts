import { Thread } from './thread'
import { Message } from './message'
import { LLM } from './llm'

export { Thread, Message }

type AppEntity = typeof Thread | typeof Message | typeof LLM

export const entitiesMap: Record<string, AppEntity> = {
  LLM,
  Thread,
  Message,
}
