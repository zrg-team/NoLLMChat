'use client'

import { memo, lazy, Suspense, useCallback, useMemo, useEffect } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import type { MainVSLiteContextType } from 'src/lib/vslite/contexts/main'

import { useChat } from './hooks/use-chat'
import { useFileSystemTree } from './hooks/use-file-system-tree'
import { useWorkspace } from './hooks/use-workspace'
import Copilot from './components/Copilot'
import { useVSLiteApplicationState } from './state/vslite'

const VSLiteApp = lazy(() => import('src/lib/vslite/index'))

const Session = memo(() => {
  const currentSessionId = useSessionState(useShallow((state) => state.currentSession?.id))
  const setFileTreeState = useVSLiteApplicationState(useShallow((state) => state.setFileTreeState))
  const resetVSLite = useVSLiteApplicationState(useShallow((state) => state.reset))
  const initState = useVSLiteApplicationState(useShallow((state) => state.initState))
  const setTerminal = useVSLiteApplicationState(useShallow((state) => state.setTerminal))
  const setContainer = useVSLiteApplicationState(useShallow((state) => state.setContainer))
  const setTerminalProcessWriter = useVSLiteApplicationState(
    useShallow((state) => state.setTerminalProcessWriter),
  )
  const setReady = useVSLiteApplicationState(useShallow((state) => state.setReady))
  const setContainerPreviewInfo = useVSLiteApplicationState(
    useShallow((state) => state.setContainerPreviewInfo),
  )
  const setTerminalProcess = useVSLiteApplicationState(
    useShallow((state) => state.setTerminalProcess),
  )
  const setPreviewElementRef = useVSLiteApplicationState(
    useShallow((state) => state.setPreviewElementRef),
  )
  const { fileSystemTree, updateCodeContainerFile } = useFileSystemTree()
  const {
    resetWorkspace,
    resetChatState,
    init: initWorkspace,
    loadCurrentModel,
    createOrUpdateLLM,
  } = useWorkspace()
  const { createMessage } = useChat({
    loadCurrentModel,
    updateCodeContainerFile,
  })

  const renderCustomPanel = useCallback(
    (rest: MainVSLiteContextType) => {
      return (
        <Copilot
          {...rest}
          sendMessage={createMessage}
          loadCurrentModel={loadCurrentModel}
          createOrUpdateLLM={createOrUpdateLLM}
        />
      )
    },
    [loadCurrentModel, createMessage, createOrUpdateLLM],
  )

  useEffect(() => {
    if (!currentSessionId) {
      return
    }

    initWorkspace()
    return () => {
      resetVSLite()
      resetWorkspace()
      resetChatState()
    }
  }, [currentSessionId])

  const setState = useMemo(() => {
    return {
      setReady,
      setContainer,
      setTerminal,
      setFileTreeState,
      setTerminalProcess,
      setPreviewElementRef,
      setContainerPreviewInfo,
      setTerminalProcessWriter,
    }
  }, [
    setReady,
    setTerminal,
    setContainer,
    setFileTreeState,
    setTerminalProcess,
    setPreviewElementRef,
    setContainerPreviewInfo,
    setTerminalProcessWriter,
  ])

  return (
    <div className="h-full w-full relative" data-registry="plate">
      <Suspense fallback={<DefaultLoader morphing />}>
        {fileSystemTree !== undefined ? (
          <VSLiteApp
            autoLoad
            hideAppName
            fileSystemTree={fileSystemTree}
            onUpdateFileContent={updateCodeContainerFile}
            renderCustomPanel={renderCustomPanel}
            initState={initState}
            setState={setState}
          />
        ) : undefined}
      </Suspense>
    </div>
  )
})

export default Session
