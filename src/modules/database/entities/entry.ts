import { Thread } from './thread'
import { Message } from './message'

export { Thread, Message, }

type AppEntity =
  | typeof Thread
  | typeof Message

export const entitiesMap: Record<string, AppEntity> = {
  Thread,
  Message,
}
