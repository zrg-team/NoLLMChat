import { Node, Connection } from '@xyflow/react'
import { FlowNodeTypeEnum, Prompt, PromptTypeEnum } from 'src/services/database/types'

const threadPromptHandler = (
  _node: Node,
  connectedNodes: (Node | undefined)[],
  functions: {
    getNode: (id: string) => Node | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const nodes: Node[] = []
  const handledIds: string[] = []
  const connections: Connection[] = []
  const promptNode = connectedNodes.find((node) => node?.type === FlowNodeTypeEnum.Prompt)
  if (promptNode) {
    handledIds.push(promptNode.id)
    nodes.push(promptNode)
    // If prompt is few shot example, finding few shot example data connected with the prompt
    const promptEntity = promptNode.data.entity as Prompt
    if (promptEntity.type === PromptTypeEnum.FewShotExample) {
      const fewShotExampleConnection = functions.getHandleConnections({
        type: 'target',
        nodeId: promptNode.id,
      })
      connections.push(...fewShotExampleConnection)
      const fewShotExampleDataConnection = fewShotExampleConnection
        .map((connection) => functions.getNode(connection.source))
        .find((node) => node?.type === FlowNodeTypeEnum.CSVData)

      if (fewShotExampleDataConnection) {
        handledIds.push(fewShotExampleDataConnection.id)
        nodes.push(fewShotExampleDataConnection)
      }
    }
  }

  return {
    nodes,
    handledIds,
    connections,
  }
}
const threadToolHandler = (
  _node: Node,
  connectedNodes: (Node | undefined)[],
  functions: {
    getNode: (id: string) => Node | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const nodes: Node[] = []
  const handledIds: string[] = []
  const connections: Connection[] = []

  const toolNode = connectedNodes.find((node) => node?.type === FlowNodeTypeEnum.ToolDefinition)
  if (toolNode) {
    handledIds.push(toolNode.id)
    nodes.push(toolNode)

    const toolSchemaConnection = functions.getHandleConnections({
      type: 'target',
      nodeId: toolNode.id,
    })
    const toolSchemaNode = toolSchemaConnection
      .map((connection) => functions.getNode(connection.source))
      .find((node) => node?.type === FlowNodeTypeEnum.Schema)
    if (toolSchemaNode) {
      connections.push(...toolSchemaConnection)
      handledIds.push(toolSchemaNode.id, toolNode.id)
      nodes.push(toolSchemaNode, toolNode)
    }
  }

  return {
    nodes,
    handledIds,
    connections,
  }
}
export const threadNodesTraveling = (
  list: string[],
  nodes: Node[],
  connections: Connection[],
  handledIds: string[] = [],
  functions: {
    getNode: (id: string) => Node | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const runningNodes = list.map((id) => functions.getNode(id))
  for (const node of runningNodes) {
    if (!node) {
      continue
    }

    const nodeConnections = functions.getHandleConnections({
      type: 'target',
      nodeId: node.id,
    })
    connections.push(...nodeConnections)

    if (node.type === FlowNodeTypeEnum.Thread) {
      const connectedNodes = nodeConnections.map((c) => functions.getNode(c.source))
      // Finding prompt connected with the thread
      const handledPromptInfo = threadPromptHandler(node, connectedNodes, functions)
      handledIds.push(...handledPromptInfo.handledIds)
      nodes.push(...handledPromptInfo.nodes)
      connections.push(...handledPromptInfo.connections)

      // Finding schema connected with the thread
      const schemaConnection = connectedNodes.find((node) => node?.type === FlowNodeTypeEnum.Schema)
      if (schemaConnection) {
        handledIds.push(schemaConnection.id)
        nodes.push(schemaConnection)
      }

      // Finding tool connected with the tread
      const handleToolInfo = threadToolHandler(node, connectedNodes, functions)
      handledIds.push(...handleToolInfo.handledIds)
      nodes.push(...handleToolInfo.nodes)
      connections.push(...handleToolInfo.connections)

      handledIds.push(node.id)
      nodes.push(node)
      continue
    } else if (node.type !== FlowNodeTypeEnum.Message) {
      handledIds.push(node.id)
      continue
    } else if (handledIds.includes(node.id)) {
      continue
    }

    handledIds.push(node.id)
    nodes.push(node)
    if (nodeConnections.length) {
      threadNodesTraveling(
        nodeConnections.map((c) => c.source),
        nodes,
        connections,
        handledIds,
        functions,
      )
    }
  }

  return {
    nodes,
    connections,
  }
}
