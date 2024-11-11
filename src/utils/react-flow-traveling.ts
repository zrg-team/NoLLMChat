import { Node, Connection } from '@xyflow/react'
import { FlowNodeTypeEnum, Prompt, PromptTypeEnum } from 'src/services/database/types'

export const reactFlowTraveling = (
  list: string[],
  result: Node[],
  connections: Connection[],
  handledIds: string[] = [],
  functions: {
    getNode: (id: string) => Node | undefined
    getHandleConnections: (props: { type: 'source' | 'target'; nodeId: string }) => Connection[]
  },
) => {
  const nodes = list.map((id) => functions.getNode(id))
  for (const node of nodes) {
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
      const promptConnection = connectedNodes.find((node) => node?.type === FlowNodeTypeEnum.Prompt)
      if (promptConnection) {
        handledIds.push(promptConnection.id)
        result.push(promptConnection)
        // If prompt is few shot example, finding few shot example data connected with the prompt
        const promptEntity = promptConnection.data.entity as Prompt
        if (promptEntity.type === PromptTypeEnum.FewShotExample) {
          const fewShotExampleConnection = functions.getHandleConnections({
            type: 'target',
            nodeId: promptConnection.id,
          })
          connections.push(...fewShotExampleConnection)
          const fewShotExampleDataConnection = fewShotExampleConnection
            .map((connection) => functions.getNode(connection.source))
            .find((node) => node?.type === FlowNodeTypeEnum.CSVData)

          if (fewShotExampleDataConnection) {
            handledIds.push(fewShotExampleDataConnection.id)
            result.push(fewShotExampleDataConnection)
          }
        }
      }
      // Finding schema connected with the thread
      const schemaConnection = connectedNodes.find((node) => node?.type === FlowNodeTypeEnum.Schema)
      if (schemaConnection) {
        handledIds.push(schemaConnection.id)
        result.push(schemaConnection)
      }
      handledIds.push(node.id)
      result.push(node)
      continue
    } else if (node.type !== FlowNodeTypeEnum.Message) {
      handledIds.push(node.id)
      continue
    } else if (handledIds.includes(node.id)) {
      continue
    }

    handledIds.push(node.id)
    result.push(node)
    if (nodeConnections.length) {
      reactFlowTraveling(
        nodeConnections.map((c) => c.source),
        result,
        connections,
        handledIds,
        functions,
      )
    }
  }

  return {
    nodes: result,
    connections,
  }
}
