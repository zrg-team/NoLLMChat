import { useRef, useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useToast } from 'src/lib/hooks/use-toast'
import { LLMStatusEnum, Message } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { useSessionState } from 'src/states/session'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import { useChatState } from 'src/components/pages/Session/state/chat'
import { logError } from 'src/utils/logger'
import { useLLM } from 'src/hooks/use-llm'
import { createSimpleAgent } from 'src/services/agent/agents/simple'
import { formatLangChainMessage } from 'src/utils/langchain-message'
import { getRepository } from 'src/services/database'
import { usePreview } from 'src/hooks/use-preview'

import { useWorkspace } from './use-workspace'
import { useFileSystemTree } from './use-file-system-tree'
import { SendMessage } from '../types/message'
import { useVSLiteApplicationState } from '../state/vslite'
import { createMCPAgent } from 'src/services/agent/agents/mcp'

export const useChat = ({
  loadCurrentModel,
  updateCodeContainerFile,
}: {
  loadCurrentModel: ReturnType<typeof useWorkspace>['loadCurrentModel']
  updateCodeContainerFile: ReturnType<typeof useFileSystemTree>['updateCodeContainerFile']
}) => {
  const { t } = useTranslation('chat')
  const { toast } = useToast()
  const { getLLM } = useLLM()
  const { sendMessageIframe } = usePreview()
  // SESSION
  const currentSessionId = useSessionState(useShallow((state) => state.currentSession?.id))
  // WORKSPACE
  const currentLLM = useWorkspaceState(useShallow((state) => state.llm))
  const currentLLMStatus = useWorkspaceState(useShallow((state) => state.llmStatus))
  const codeVectorStore = useWorkspaceState((state) => state.codeVectorDatabaseInstance)
  const contextVectorStore = useWorkspaceState((state) => state.contextVectorDatabaseInstance)
  const prompts = useWorkspaceState(useShallow((state) => state.prompts))
  const mcps = useWorkspaceState(useShallow((state) => state.mcps))
  const graph = useWorkspaceState(useShallow((state) => state.graph))
  // VSL
  const container = useVSLiteApplicationState(useShallow((state) => state.container))
  const terminal = useVSLiteApplicationState(useShallow((state) => state.terminal))
  const terminalProcessWriter = useVSLiteApplicationState(
    useShallow((state) => state.terminalProcessWriter),
  )
  const terminalProcess = useVSLiteApplicationState(useShallow((state) => state.terminalProcess))
  // CHAT
  const messages = useChatState(useShallow((state) => state.messages))
  const graphInstance = useChatState(useShallow((state) => state.graph))
  const setGraph = useChatState((state) => state.setGraph)
  const appendMessages = useChatState((state) => state.appendMessages)
  const setMessages = useChatState((state) => state.setMessages)
  const setInProgressMessage = useChatState((state) => state.setInProgressMessage)
  const setInProgressMessageMetadata = useChatState((state) => state.setInProgressMessageMetadata)
  // REF
  const messagesRef = useRef(messages)
  const llmRef = useRef(currentLLM)
  const llmStatusRef = useRef(currentLLMStatus)
  const graphInstanceRef = useRef(graphInstance)
  const codeVectorStoreRef = useRef(codeVectorStore)
  const contextVectorStoreRef = useRef(contextVectorStore)
  const updateCodeContainerFileRef = useRef(updateCodeContainerFile)
  const containerRef = useRef(container)
  const terminalRef = useRef(terminal)
  const terminalProcessRef = useRef(terminalProcess)
  const terminalProcessWriterRef = useRef(terminalProcessWriter)
  const promptsRef = useRef(prompts)
  const mcpsRef = useRef(mcps)
  const sendMessageIframeRef = useRef(sendMessageIframe)
  const graphRef = useRef(graph)
  // ASSIGN REFS
  codeVectorStoreRef.current = codeVectorStore
  contextVectorStoreRef.current = contextVectorStore
  messagesRef.current = messages
  llmRef.current = currentLLM
  llmStatusRef.current = currentLLMStatus
  updateCodeContainerFileRef.current = updateCodeContainerFile
  containerRef.current = container
  terminalRef.current = terminal
  terminalProcessRef.current = terminalProcess
  terminalProcessWriterRef.current = terminalProcessWriter
  promptsRef.current = prompts
  mcpsRef.current = mcps
  graphInstanceRef.current = graphInstance
  sendMessageIframeRef.current = sendMessageIframe
  graphRef.current = graph

  const getAgentGraph = useCallback(async () => {
    console.log('graphRef.current', graphRef.current)
    if (graphInstanceRef.current) {
      return graphInstanceRef.current
    }
    const llm = llmRef.current
    if (!llm) {
      return
    }
    if (!codeVectorStoreRef.current || !contextVectorStoreRef.current) {
      return undefined
    }
    const chatLLM = await getLLM(llm.provider, llm)
    if (!chatLLM) {
      return
    }
    switch (graphRef.current?.name) {
      case 'mcp': {
        const currentGraph = await createMCPAgent({
          chatLLM: chatLLM,
          codeVectorStore: codeVectorStoreRef.current,
          contextVectorStore: contextVectorStoreRef.current,
          container: containerRef.current,
          terminal: terminalRef.current,
          terminalProcess: terminalProcessRef.current,
          terminalProcessWriter: terminalProcessWriterRef.current,
          prompts: promptsRef.current,
          mpcs: mcpsRef.current,
          preview: {
            sendMessage: sendMessageIframeRef.current,
          },
        })
        setGraph(currentGraph)
        return currentGraph
      }
      default: {
        const currentGraph = await createSimpleAgent({
          chatLLM: chatLLM,
          codeVectorStore: codeVectorStoreRef.current,
          contextVectorStore: contextVectorStoreRef.current,
          container: containerRef.current,
          terminal: terminalRef.current,
          terminalProcess: terminalProcessRef.current,
          terminalProcessWriter: terminalProcessWriterRef.current,
          prompts: promptsRef.current,
          mpcs: mcpsRef.current,
          preview: {
            sendMessage: sendMessageIframeRef.current,
          },
        })
        setGraph(currentGraph)
        return currentGraph
      }
    }
  }, [getLLM, setGraph])

  const createMessage = useCallback(
    async (
      inputMessages: SendMessage[],
      {
        abortController,
        onMessageUpdate,
      }: {
        abortController?: AbortController
        onMessageUpdate?: (chunk: string) => void
      },
    ) => {
      if (currentSessionId) {
        const llm = llmRef.current
        if (!llm) {
          toast({
            variant: 'destructive',
            description: t('errors.llm_not_found'),
          })
          return
        }
        let content = ''
        const metadata: {
          tool_calls: {
            id: string
            tool: string
            toolInput: Record<string, unknown>
            result: string
          }[]
        } = {
          tool_calls: [],
        }

        try {
          setInProgressMessage({
            content: '',
            role: 'ai',
            status: 'inprogress',
          })

          const savedMessages: Message[] = []
          await Promise.all(
            inputMessages
              .filter((message) => !message.ignore)
              .map(async (message) => {
                return getRepository('Message')
                  .save({
                    ...message,
                    llm_id: llm.id,
                    status: message.status || 'started',
                    session_id: currentSessionId,
                  })
                  .then((entity) => {
                    savedMessages.push(entity)
                    return entity
                  })
              }),
          )
          appendMessages(savedMessages)

          if (llmStatusRef.current !== LLMStatusEnum.Loaded) {
            setInProgressMessage({
              content: t('messages.loading_llm'),
              role: 'ai',
              status: 'inprogress',
            })
            await loadCurrentModel(llm, (data) => {
              setInProgressMessage({
                content: `${t('messages.loading_llm')}\n${data.text}`,
                role: 'ai',
                status: 'inprogress',
              })
            })
            setInProgressMessage({
              content: `${t('messages.llm_loaded')}`,
              role: 'ai',
              status: 'inprogress',
            })
            onMessageUpdate?.('')
          }

          const history = messagesRef.current.map(formatLangChainMessage)
          const newMessage = inputMessages.map(formatLangChainMessage)

          const agentGraph = await getAgentGraph()
          onMessageUpdate?.('')

          if (agentGraph) {
            agentGraph.reset()
            const response = agentGraph.stream(
              {
                messages: [...history, ...newMessage],
              },
              {
                abortController,
                onStateChange: (currentState) => {
                  if (
                    typeof currentState?.response === 'string' &&
                    currentState?.response !== content
                  ) {
                    content = currentState.response
                    onMessageUpdate?.(content)
                    setInProgressMessage({
                      content,
                      role: 'ai',
                      status: 'inprogress',
                      metadata,
                    })
                  }
                },
                callbacks: {
                  tool: [
                    ({ action, result, key }) => {
                      if (!key || !action) {
                        return
                      }
                      if (key === 'TOOL_START') {
                        const item = action as {
                          toolCallId: string
                          tool: string
                          toolInput: Record<string, unknown>
                        }
                        metadata.tool_calls.push({
                          id: item.toolCallId,
                          tool: item.tool,
                          toolInput: item.toolInput,
                          result: '',
                        })
                      } else if (key === 'TOOL_END') {
                        const item = action as {
                          toolCallId: string
                          tool: string
                          toolInput: Record<string, unknown>
                        }
                        metadata.tool_calls = metadata.tool_calls.map((toolCall) => {
                          if (
                            toolCall.id === item.toolCallId &&
                            result &&
                            typeof result === 'object' &&
                            'content' in result
                          ) {
                            return {
                              ...toolCall,
                              result: `${result.content}`,
                            }
                          }
                          return toolCall
                        })
                      }
                      setInProgressMessageMetadata(metadata)
                      onMessageUpdate?.('')
                    },
                  ],
                },
              },
            )
            let lastState
            for await (const data of response) {
              lastState = data
            }
            if (lastState?.actions && 'returnValues' in lastState.actions) {
              content = lastState?.actions?.returnValues?.output || ''
            }
          } else {
            // Fallback handle RAG instead of Agentic
          }
          const aiMessage = await getRepository('Message').save({
            content,
            llm_id: llm.id,
            role: 'ai',
            session_id: currentSessionId,
            status: 'success',
            metadata,
          })
          appendMessages([aiMessage])
          onMessageUpdate?.('')
          return content
        } catch (error) {
          if (error instanceof Error && error.message === 'Aborted') {
            const aiMessage = await getRepository('Message').save({
              content,
              llm_id: llm.id,
              role: 'ai',
              session_id: currentSessionId,
              status: 'success',
              metadata,
            })
            appendMessages([aiMessage])
            onMessageUpdate?.('')
            return
          }
          logError('[CreateMessage]', error)
          await getRepository('Message').save({
            content: t('errors.stream_message_failed'),
            llm_id: llm.id,
            role: 'ai',
            session_id: currentSessionId,
            status: 'success',
          })
          if (error instanceof Error && error.message.includes('LLM_NOT_LOADED_YET')) {
            toast({
              title: t('errors.llm_not_loaded_yet'),
            })
            return
          }
          toast({
            variant: 'destructive',
            title: t('errors.stream_message_failed'),
          })
        } finally {
          setInProgressMessage(undefined)
        }
      }
    },
    [
      currentSessionId,
      toast,
      t,
      setInProgressMessage,
      appendMessages,
      getAgentGraph,
      loadCurrentModel,
      setInProgressMessageMetadata,
    ],
  )

  useEffect(() => {
    if (currentSessionId) {
      getRepository('Message')
        .find({
          where: {
            session_id: currentSessionId,
          },
          order: {
            updated_at: 'ASC',
          },
        })
        .then((entities) => {
          setMessages(entities)
        })
    }
  }, [currentSessionId, setMessages, t])

  return {
    createMessage,
  }
}
