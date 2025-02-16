import { useCallback, useEffect, useRef, useState } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import { findFlowNodesWithSource } from 'src/states/flow/actions'
import {
  EntityTypes,
  FlowEdge,
  FlowNode,
  FlowNodePlaceholder,
  FlowNodeTypeEnum,
  JSONData,
  LLM,
  LLMStatusEnum,
  Prompt,
  Schema,
  Thread,
  VectorDatabase,
} from 'src/services/database/types'
import { In } from 'src/services/database/typeorm-wrapper'
import { Message } from 'ai/react'
import { useLoadModel } from 'src/hooks/mutations/use-load-model'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'
import { passphraseConfirm } from 'src/utils/passphrase'
import { useModalRef } from 'src/hooks/use-modal-ref'

export const useChatApplicationData = () => {
  const [chatInfo, setChatInfo] = useState<{
    prompts?: Prompt[]
    schema?: Schema
  }>()
  const [mainEmbeddingInfo, setMainEmbeddingInfo] = useState<{
    embedding?: FlowNodePlaceholder
  }>()
  const [threadInfo, setThreadInfo] = useState<{ thread: Thread; threadNode: FlowNode }>()
  const [mainLLMInfo, setLLMInfo] = useState<{
    llm: LLM
    status: `${LLMStatusEnum}`
    progress?: string
  }>()
  const [retriverInfo, setRetriverInfo] = useState<
    {
      promptNode: FlowNode
      vectorDatabaseNode: FlowNode
      placeholderNode: FlowNode
      placeholderEntity: FlowNodePlaceholder
      promptEntity: Prompt
      vectorDatabaseEntity: VectorDatabase
    }[]
  >([])
  const [currentDataNode, setCurrentDataNode] = useState<{ node: FlowNode; enity: JSONData }>()
  const onThreadMessagesLoadedRef = useRef<(messages: Message[]) => void>()
  const sessionHandleStatus = useRef<{ handling?: string; handled?: string }>({})
  const currentSession = useSessionState((state) => state.currentSession)
  const { loadModel } = useLoadModel()
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  const selectDataNode = useCallback(
    async (dataNode: FlowNode) => {
      if (!currentSession) {
        return
      }
      const jsonData = await getRepository('JSONData').findOne({
        where: { id: dataNode.source_id, session_id: currentSession?.id },
      })
      if (!jsonData) {
        return
      }
      onThreadMessagesLoadedRef.current?.(
        jsonData.data ? (jsonData.data as unknown as Message[]) : [],
      )
      setCurrentDataNode({
        node: dataNode,
        enity: jsonData,
      })
    },
    [currentSession],
  )

  const addNewDataNode = useCallback(
    async (input?: { sessionId?: string; threadNode?: FlowNode; prompts?: Prompt[] }) => {
      const sessionId = input?.sessionId || currentSession?.id
      const threadNode = input?.threadNode || threadInfo?.threadNode
      const systemPrompt = input?.prompts || chatInfo?.prompts

      if (!sessionId || !threadNode?.id) {
        return
      }
      const initialMessages = systemPrompt
        ?.map((prompt) => {
          if (prompt.type === 'few_shot_example') {
            return undefined
          }
          switch (prompt.role) {
            case 'ai':
            case 'assistant':
            case 'tool':
              return {
                id: prompt.id,
                content: prompt.content,
                role: 'assistant',
              }
            case 'system':
              return {
                id: prompt.id,
                content: prompt.content,
                role: 'system',
              }
            default:
              return {
                id: prompt.id,
                content: prompt.content,
                role: 'user',
              }
          }
        })
        .filter(Boolean) as Message[]
      const jsonData = await getRepository('JSONData').save({
        headers: 'item',
        session_id: sessionId,
        json: '',
        data: initialMessages,
      })
      if (!jsonData) {
        return
      }
      const jsonDataNode = await getRepository('FlowNode').save({
        session_id: sessionId,
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
        session_id: sessionId,
        source: threadNode.id,
        target: jsonDataNode.id,
      })
      onThreadMessagesLoadedRef.current?.(initialMessages)
      setCurrentDataNode({
        node: jsonDataNode,
        enity: jsonData,
      })
      return {
        jsonData,
        jsonDataNode,
      }
    },
    [chatInfo?.prompts, currentSession?.id, threadInfo?.threadNode],
  )

  const handleThreadData = useCallback(
    async (threadNode: FlowNode, prompts: Prompt[]) => {
      if (!currentSession) {
        return
      }
      const threadData = await getRepository('FlowEdge').findOne({
        where: { session_id: currentSession.id, source: threadNode.id },
        order: { id: 'DESC' },
      })
      if (!threadData) {
        const result = await addNewDataNode({
          sessionId: currentSession.id,
          threadNode,
          prompts: prompts || [],
        })
        if (!result) {
          return
        }
      } else {
        const dataNode = await getRepository('FlowNode').findOne({
          where: { id: threadData.target, session_id: currentSession.id },
        })
        if (!dataNode) {
          return
        }
        await selectDataNode(dataNode)
      }
    },
    [addNewDataNode, currentSession, selectDataNode],
  )

  const getRetrieveVectorDatabase = useCallback(
    async (
      placeholderInfo: {
        connection: FlowEdge
        source: FlowNode
        entity?: EntityTypes
      }[],
    ) => {
      if (placeholderInfo?.length && currentSession?.id) {
        const data = await Promise.all(
          placeholderInfo.map(async (info) => {
            return getRepository('FlowEdge')
              .find({
                where: {
                  target: info.source.id,
                },
              })
              .then((connections) => {
                return findFlowNodesWithSource({
                  where: {
                    session_id: currentSession.id,
                    id: In(connections.map((connection) => connection.source)),
                  },
                }).then((result) => ({
                  ...result,
                  ...info,
                }))
              })
          }),
        )
        const retriverInfo = data
          .map((item) => {
            const promptNode = item.flowNodes.find((node) => node.source_type === 'Prompt')
            const vectorDatabaseNode = item.flowNodes.find(
              (node) => node.source_type === 'VectorDatabase',
            )
            if (!vectorDatabaseNode || !promptNode) {
              return
            }
            const promptEntity = item.flowNodeDatas?.Prompt?.find(
              (nodeData) => nodeData.id === promptNode.source_id,
            )
            const vectorDatabaseEntity = item.flowNodeDatas?.VectorDatabase?.find(
              (nodeData) => nodeData.id === vectorDatabaseNode.source_id,
            )
            return {
              promptNode,
              vectorDatabaseNode,
              placeholderNode: item.source,
              placeholderEntity: item.entity,
              promptEntity: promptEntity as Prompt,
              vectorDatabaseEntity: vectorDatabaseEntity as VectorDatabase,
            }
          })
          .filter(Boolean) as {
          promptNode: FlowNode
          vectorDatabaseNode: FlowNode
          placeholderNode: FlowNode
          placeholderEntity: FlowNodePlaceholder
          promptEntity: Prompt
          vectorDatabaseEntity: VectorDatabase
        }[]
        setRetriverInfo(retriverInfo)
      }
    },
    [currentSession?.id],
  )

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
            id: currentSession.main_node_id,
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

      const llm = llmInfo?.entity as LLM

      if (!llm) {
        return
      }

      if (currentSession.passphrase) {
        await passphraseConfirm(currentSession.passphrase!, sessionPassphraseDialogRef.current)
      }

      const placeholderInfo = threadConnectedNodes.filter(
        (node) => node.source.source_type === 'FlowNodePlaceholder',
      )

      await getRetrieveVectorDatabase(placeholderInfo)
      await handleThreadData(threadNode, promptInfo?.map((info) => info.entity as Prompt) || [])

      // Handle Embedding Node
      const embeddingNode = await getRepository('FlowNode').findOne({
        where: {
          node_type: FlowNodeTypeEnum.DefaultEmbeddingModel,
          source_type: 'FlowNodePlaceholder',
        },
      })

      if (embeddingNode) {
        const embeddingEntity = await getRepository('FlowNodePlaceholder').findOne({
          where: { id: embeddingNode.source_id },
        })
        setMainEmbeddingInfo({
          embedding: embeddingEntity,
        })
      }

      setLLMInfo({
        llm,
        status: llm.status || LLMStatusEnum.Started,
        progress: '',
      })
      setThreadInfo({
        thread,
        threadNode,
      })
      const schemaEntity = schemaInfo?.entity as Schema
      if (schemaEntity) {
        const schemaItems = await getRepository('SchemaItem').find({
          where: { schema_id: schemaEntity.id },
        })
        schemaEntity.schema_items = schemaItems || []
      }

      setChatInfo({
        prompts: promptInfo?.map((info) => info.entity as Prompt) || [],
        schema: schemaEntity,
      })

      sessionHandleStatus.current.handled = currentSession.id
    } finally {
      sessionHandleStatus.current.handling = undefined
    }
  }, [
    currentSession?.id,
    currentSession?.main_node_id,
    currentSession?.main_source_id,
    currentSession?.main_source_type,
    currentSession?.passphrase,
    getRetrieveVectorDatabase,
    handleThreadData,
    sessionPassphraseDialogRef,
  ])

  const loadLLM = useCallback(async () => {
    if (!mainLLMInfo?.llm?.name) {
      return
    }
    try {
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loading } : pre))
      await loadModel(mainLLMInfo.llm.provider, mainLLMInfo?.llm.name, (data) => {
        setLLMInfo((pre) => (pre ? { ...pre, progress: data.text } : pre))
      })
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Loaded, progress: '' } : pre))
    } catch {
      setLLMInfo((pre) => (pre ? { ...pre, status: LLMStatusEnum.Started, progress: '' } : pre))
    }
  }, [mainLLMInfo?.llm?.name, mainLLMInfo?.llm?.provider, loadModel])

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
    mainEmbeddingInfo,
    retriverInfo,
    currentDataNode,
    updateMessagesData,
    addNewDataNode,
    selectDataNode,
    setLLMInfo,
    onThreadMessagesLoaded,
  }
}
