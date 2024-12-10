import { useCallback, useEffect, useRef, useState } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { findFlowNodesWithSource } from 'src/states/flow/actions'
import {
  FlowNode,
  JSONData,
  LLM,
  LLMStatusEnum,
  Prompt,
  Schema,
  Thread,
} from 'src/services/database/types'
import { In } from 'src/services/database/typeorm-wrapper'
import { useLocalLLMState } from 'src/services/local-llm'
import { Message } from 'ai/react'

export const useChatApplicationData = () => {
  const [chatInfo, setChatInfo] = useState<{
    prompts?: Prompt[]
    schema?: Schema
  }>()
  const [threadInfo, setThreadInfo] = useState<{ thread: Thread; threadNode: FlowNode }>()
  const [mainLLMInfo, setLLMInfo] = useState<{
    llm: LLM
    status: LLMStatusEnum
    progress?: string
  }>()
  const [currentDataNode, setCurrentDataNode] = useState<{ node: FlowNode; enity: JSONData }>()
  const onThreadMessagesLoadedRef = useRef<(messages: Message[]) => void>()
  const sessionHandleStatus = useRef<{ handling?: string; handled?: string }>({})
  const currentSession = useSessionState((state) => state.currentSession)
  const loadModel = useLocalLLMState((state) => state.loadModel)
  const getChatApplicationData = useCallback(async () => {
    try {
      sessionHandleStatus.current.handling = currentSession?.id
      if (
        !currentSession?.id ||
        !currentSession?.main_source_id ||
        currentSession?.main_source_type !== 'Thread'
      ) {
        return
      }
      const [thread, threadNode] = await Promise.all([
        getRepository('Thread').findOne({
          where: { id: currentSession.main_source_id, session_id: currentSession.id },
        }),
        getRepository('FlowNode').findOne({
          where: {
            source_id: currentSession.main_source_id,
            source_type: 'Thread',
            session_id: currentSession.id,
          },
        }),
      ])
      if (!thread || !threadNode) {
        return
      }
      const threadConnections = await getRepository('FlowEdge').find({
        where: { session_id: currentSession.id, target: threadNode.id },
      })
      const { flowNodes, flowNodeDatas } = await findFlowNodesWithSource({
        where: {
          session_id: currentSession.id,
          id: In(threadConnections.map((connection) => connection.source)),
        },
      })
      const allConnections = await getRepository('FlowEdge').find({
        where: { session_id: currentSession.id },
      })

      const threadConnectedNodes = allConnections
        .filter((connection) => connection.target === threadNode.id)
        .map((connection) => {
          const node = flowNodes.find((node) => node.id === connection.source)!
          return {
            connection,
            source: node,
            entity: flowNodeDatas?.[node.source_type]?.find(
              (nodeData) => nodeData.id === node.source_id,
            ),
          }
        })
      const llmInfo = threadConnectedNodes.find((node) => node.source.source_type === 'LLM')
      const promptInfo = threadConnectedNodes.filter((node) => node.source.source_type === 'Prompt')
      const schemaInfo = threadConnectedNodes.find((node) => node.source.source_type === 'Schema')

      if (!llmInfo?.entity) {
        return
      }
      const threadData = await getRepository('FlowEdge').findOne({
        where: { session_id: currentSession.id, source: threadNode.id },
        order: { id: 'DESC' },
      })
      if (!threadData) {
        const jsonData = await getRepository('JSONData').save({
          headers: 'item',
          session_id: currentSession.id,
          json: '',
          data: [],
        })
        if (!jsonData) {
          return
        }
        const jsonDataNode = await getRepository('FlowNode').save({
          session_id: currentSession.id,
          source_id: jsonData.id,
          source_type: 'JSONData',
          node_type: 'JSON_DATA',
          x: 0,
          y: 0,
        })
        if (!jsonDataNode) {
          return
        }
        await getRepository('FlowEdge').save({
          session_id: currentSession.id,
          source: threadNode.id,
          target: jsonDataNode.id,
        })
        onThreadMessagesLoadedRef.current?.([])
        setCurrentDataNode({
          node: jsonDataNode,
          enity: jsonData,
        })
      } else {
        const dataNode = await getRepository('FlowNode').findOne({
          where: { id: threadData.target, session_id: currentSession.id },
        })
        if (!dataNode) {
          return
        }
        const jsonData = await getRepository('JSONData').findOne({
          where: { id: dataNode.source_id, session_id: currentSession.id },
        })
        if (!jsonData) {
          return
        }
        onThreadMessagesLoadedRef.current?.(jsonData.data as unknown as Message[])
        setCurrentDataNode({
          node: dataNode,
          enity: jsonData,
        })
      }

      setLLMInfo({
        llm: llmInfo.entity as LLM,
        status: LLMStatusEnum.Started,
        progress: '',
      })
      setThreadInfo({
        thread,
        threadNode,
      })
      setChatInfo({
        prompts: promptInfo?.map((info) => info.entity as Prompt) || [],
        schema: schemaInfo?.entity as Schema,
      })

      sessionHandleStatus.current.handled = currentSession.id
    } finally {
      sessionHandleStatus.current.handling = undefined
    }
  }, [currentSession?.id, currentSession?.main_source_id, currentSession?.main_source_type])

  const loadLLM = useCallback(async () => {
    if (!mainLLMInfo?.llm.name) {
      return
    }
    try {
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loading } : pre))
      await loadModel(mainLLMInfo?.llm.name, (data) => {
        setLLMInfo((pre) => (pre ? { ...pre, progress: data.text } : pre))
      })
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loaded, progress: '' } : pre))
    } catch {
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Started, progress: '' } : pre))
    }
  }, [mainLLMInfo?.llm?.name, loadModel])

  const onThreadMessagesLoaded = useCallback((callback: (messages: Message[]) => void) => {
    onThreadMessagesLoadedRef.current = callback
    return () => {
      onThreadMessagesLoadedRef.current = undefined
    }
  }, [])

  const updateMessagesData = useCallback(
    async (messages: Message[]) => {
      if (!currentDataNode?.node || !currentDataNode?.enity) {
        return
      }
      await getRepository('JSONData').save({
        ...currentDataNode.enity,
        data: messages,
      })
    },
    [currentDataNode?.enity, currentDataNode?.node],
  )

  useEffect(() => {
    if (
      sessionHandleStatus.current.handling ||
      sessionHandleStatus?.current.handled === currentSession?.id
    ) {
      return
    }
    getChatApplicationData()
  }, [currentSession?.id, getChatApplicationData])

  return {
    ...chatInfo,
    loadLLM,
    threadInfo,
    mainLLMInfo,
    currentDataNode,
    updateMessagesData,
    onThreadMessagesLoaded,
  }
}
