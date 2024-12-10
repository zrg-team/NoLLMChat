import { useCallback, useEffect, useState } from 'react'
import { useSessionState } from 'src/states/session'
import { FlowNode, JSONData } from 'src/services/database/types'
import { getRepository } from 'src/services/database'
import { In } from 'src/services/database/typeorm-wrapper'
import { findFlowNodesWithSource } from 'src/states/flow/actions'

export const useChatList = (threadNode?: FlowNode) => {
  const [chatList, setChatList] = useState<{ node: FlowNode; entity: JSONData }[]>([])
  const currentSession = useSessionState((state) => state.currentSession)
  const getChatList = useCallback(async () => {
    if (!threadNode || !currentSession?.id) {
      return
    }
    const threadDataEdged = await getRepository('FlowEdge').find({
      where: { session_id: currentSession.id, source: threadNode.id },
      order: { id: 'DESC' },
    })
    const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource({
      where: {
        session_id: currentSession.id,
        id: In(threadDataEdged.map((edge) => edge.target)),
        source_type: 'JSONData',
      },
      order: { updated_at: 'DESC' },
      select: ['id', 'source_id', 'source_type', 'updated_at'],
    })
    setChatList(
      flowNodes.reduce((all: { node: FlowNode; entity: JSONData }[], node) => {
        const entity = flowNodeDatas[node.source_type]?.find((data) => data.id === node.source_id)
        if (entity) {
          all.push({
            node,
            entity: entity as JSONData,
          })
        }
        return all
      }, []),
    )
  }, [currentSession?.id, threadNode])

  useEffect(() => {
    if (!threadNode) {
      return
    }
    getChatList()
  }, [getChatList, threadNode])

  return {
    chatList,
    getChatList,
  }
}
