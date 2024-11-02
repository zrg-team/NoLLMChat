import TextUpdaterNode from './TextUpdaterNode'
import AlertNode from './AlertNode'
import NewMessageNode from './NewMessageNode'
import LLMNode from './LLMNode'
import AddLLMNode from './AddLLMNode'

export const nodeTypes = {
  textUpdater: TextUpdaterNode,
  alert: AlertNode,
  newMessage: NewMessageNode,
  llm: LLMNode,
  addLLM: AddLLMNode,
}
