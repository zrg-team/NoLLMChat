import type { Node, Connection } from '@xyflow/react'
import { FlowNodeTypeEnum } from 'src/services/database/types/flow-node'

import type { DefaultNodeData } from './flow-node'

export const threadConversationTraveling = (
  list: string[],
  nodes: Node<DefaultNodeData>[],
  connections: Connection[],
  handledIds: string[] = [],
  functions: {
    getNode: (id: string) => Node<DefaultNodeData> | undefined
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
  threadNode: Node<DefaultNodeData>,
  functions: {
    getNode: (id: string) => Node<DefaultNodeData> | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const threadConnections = functions.getHandleConnections({
    nodeId: threadNode.id,
    type: 'target',
  })
  const threadConnectionInfos = threadConnections.map((connection) => {
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
  }) as { connections: Connection[]; node: Node<DefaultNodeData> }[]
  // Prompt connection
  const threadPromptNodes = threadConnectionInfos.filter((item) => {
    return item.node?.type === FlowNodeTypeEnum.Prompt
  })
  const threadPromptNodeResult: {
    node: Node<DefaultNodeData>
    connectedNodes?: Node<DefaultNodeData>[]
    connections: Connection[]
  }[] = []
  if (threadPromptNodes?.length) {
    threadPromptNodes.forEach((item) => {
      const promptConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node<DefaultNodeData>[]
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
    node: Node<DefaultNodeData>
    connectedNodes?: Node<DefaultNodeData>[]
    connections: Connection[]
  }[] = []
  if (threadToolsNodes?.length) {
    threadToolsNodes.forEach((item) => {
      const toolConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node<DefaultNodeData>[]
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
    node: Node<DefaultNodeData>
    connectedNodes?: Node<DefaultNodeData>[]
    connections: Connection[]
  }[] = []
  if (threadPlaceholderNodes?.length) {
    threadPlaceholderNodes.forEach((item) => {
      const placeholderConnectedNodes = item.connections
        ?.map((connection) => {
          return functions.getNode(connection.source)
        })
        .filter(Boolean) as Node<DefaultNodeData>[]
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
    thread: {
      node: threadNode,
      connections: threadConnections,
    },
    llm: threadConnectionInfos.find((item) => {
      return item.node?.type === FlowNodeTypeEnum.LLM
    }),
    schemas: schemaNode ? [schemaNode] : [],
    prompts: threadPromptNodeResult,
    tools: threadToolNodeResult,
    placeholders: threadPlaceholderNodeResult,
  }
}
