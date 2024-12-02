import { Node } from '@xyflow/react'
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'
import {
  CSVData,
  FlowNodeTypeEnum,
  Message,
  Prompt,
  PromptTypeEnum,
} from 'src/services/database/types'
import { decodeCSVData } from './string-data'

export const buildHistories = (nodes: { node: Node; connectedNodes: Node[] }[]) => {
  const histories: BaseMessage[] = []
  nodes.forEach((item) => {
    const { node, connectedNodes } = item
    if (!node.data?.entity) {
      return
    }
    if (node.type === FlowNodeTypeEnum.Message) {
      const message = node.data.entity as Message
      switch (message.role) {
        case 'human':
          histories.push(new HumanMessage(message.content))
          break
        case 'ai':
          histories.push(new AIMessage(message.content))
          break
      }
    } else if (node.type === FlowNodeTypeEnum.Prompt) {
      // Prompt
      const prompt = node.data.entity as Prompt

      let content = `${prompt.prefix ? `${prompt.prefix}\n` : ''}`
      if (prompt.type === PromptTypeEnum.FewShotExample) {
        const connectedDataNode = connectedNodes.find((n) => n.type === FlowNodeTypeEnum.CSVData)
        const csvData = connectedDataNode?.data?.entity as CSVData
        if (csvData) {
          const { rows } = decodeCSVData(csvData.headers, csvData.csv)
          rows.forEach((row: Record<string, unknown>) => {
            content += `${prompt.content.replace(/{([^{}]*)}/g, (_, key) => `${row[key as keyof typeof row]}`)}\n`
          })
        }
      } else {
        content += prompt.content
      }
      if (prompt.suffix) {
        content += `\n${prompt.suffix}`
      }

      switch (prompt.role) {
        case 'human':
          histories.push(new HumanMessage(content))
          break
        case 'system':
          histories.push(new SystemMessage(content))
          break
        default:
          histories.push(new AIMessage(content))
          break
      }
    }
  })
  return histories
}

export const prepareThreadHistory = (
  connectedNodes: Node[],
  threadPromptNodes: { node: Node; connectedNodes?: Node[] }[],
) => {
  const messageNodes =
    connectedNodes
      ?.filter((node) => node.type === FlowNodeTypeEnum.Message)
      .map((node) => ({ node: node, connectedNodes: [] as Node[] }))
      .reverse() || []

  const systems: { node: Node; connectedNodes: Node[] }[] = []
  threadPromptNodes.forEach(async (threadPromptNode) => {
    systems.unshift({
      node: threadPromptNode.node,
      connectedNodes: threadPromptNode.connectedNodes || [],
    })
  })
  return {
    history: buildHistories(messageNodes),
    systems: buildHistories(systems),
  }
}
