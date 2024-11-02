import { Node } from "@xyflow/react"

export const ADD_MODEL_NODE_SIZE = {
  width: 340,
  height: 200,
}

export const ADD_MODEL_NODE: Node = {
  id: 'init',
  type: 'addLLM',
  position: { x: window.innerWidth / 2 - ADD_MODEL_NODE_SIZE.width / 2, y: 10 },
  measured: ADD_MODEL_NODE_SIZE,
  data: {},
}
