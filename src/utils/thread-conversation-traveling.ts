import { Node, Connection } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types'

export const threadConversationTraveling = (
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
      threadConversationTraveling(
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

export const prepareThreadConnections = (
  threadNode: Node,
  functions: {
    getNode: (id: string) => Node | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const threadConnectionInfos = functions
    .getHandleConnections({
      nodeId: threadNode.id,
      type: 'target',
    })
    .map((connection) => {
      const node = functions.getNode(connection.source)
      if (!node) {
        return
      }
      const connections = functions.getHandleConnections({
        nodeId: node.id,
        type: 'target',
      })
      return {
        connections,
        node,
      }
    }) as { connections: Connection[]; node: Node }[]
  // Prompt connection
  const threadPromptNodes = threadConnectionInfos.filter((item) => {
    return item.node?.type === FlowNodeTypeEnum.Prompt
  })
  const threadPromptNodeResult: {
    node: Node
    connectedNodes?: Node[]
    connections: Connection[]
  }[] = []
  if (threadPromptNodes?.length) {
    threadPromptNodes.forEach((item) => {
      const promptConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node[]
      threadPromptNodeResult.push({
        node: item.node,
        connections: item.connections,
        connectedNodes: promptConnectedNodes,
      })
    })
  }
  // Tool connection
  const threadToolsNodes = threadConnectionInfos.filter((item) => {
    return item.node?.type === FlowNodeTypeEnum.ToolDefinition
  })
  const threadToolNodeResult: {
    node: Node
    connectedNodes?: Node[]
    connections: Connection[]
  }[] = []
  if (threadToolsNodes?.length) {
    threadToolsNodes.forEach((item) => {
      const toolConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node[]
      if (toolConnectedNodes?.find((node) => node.type === FlowNodeTypeEnum.Schema)) {
        threadToolNodeResult.push({
          node: item.node,
          connections: item.connections,
          connectedNodes: toolConnectedNodes,
        })
      }
    })
  }
  // placeholder node connection
  const threadPlaceholderNodes = threadConnectionInfos.filter((item) => {
    return item.node?.type === FlowNodeTypeEnum.PlaceHolder
  })
  const threadPlaceholderNodeResult: {
    node: Node
    connectedNodes?: Node[]
    connections: Connection[]
  }[] = []
  if (threadPlaceholderNodes?.length) {
    threadPlaceholderNodes.forEach((item) => {
      const placeholderConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node[]
      if (placeholderConnectedNodes) {
        threadPlaceholderNodeResult.push({
          node: item.node,
          connections: item.connections,
          connectedNodes: placeholderConnectedNodes,
        })
      }
    })
  }
  // Schema connection
  const schemaNode = threadConnectionInfos.find((item) => {
    return item.node?.type === FlowNodeTypeEnum.Schema
  })

  return {
    thread: threadNode,
    schemas: schemaNode ? [schemaNode] : [],
    prompts: threadPromptNodeResult,
    tools: threadToolNodeResult,
    placeholders: threadPlaceholderNodeResult,
  }
}
