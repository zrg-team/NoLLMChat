import { useContext, useEffect, useMemo, useState } from 'react'
import { LocalLLMContext } from 'src/services/llm/provider'
import { LLMStatusEnum } from 'src/services/database/types/llm'
import { useFlowManager } from 'src/hooks/handlers/use-flow-manager'

import { HomePageContextProvider } from './context'
import { HomePageContextType } from './type'
import { useAutomaticallyRenderFlows } from 'src/hooks/handlers/use-automatically-render-flow'

export interface JNScreenDocumentProviderProps {
  children: React.ReactNode
}

const HomePageProvider: React.FC<JNScreenDocumentProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const flowManager = useFlowManager()
  const {
    nodes,
    nodesRef,
    edges,
    updateOrCreateNode,
    updateNodeChanges,
    updateEdgeChanges,
    updateEdgeConnection,
  } = flowManager
  useAutomaticallyRenderFlows(flowManager)

  const localLLm = useContext(LocalLLMContext)

  useEffect(() => {
    if (
      !localLLm.selectedModel ||
      !localLLm.initializing ||
      Object.values(localLLm.initializing).every(Boolean)
    ) {
      return
    }
    const modelName = `${localLLm.selectedModel}`
    const callbackRemoval = localLLm.setInitProgressCallback?.((input) => {
      const flowNode = nodesRef.current?.find((node) => {
        if (
          node.data?.entity &&
          typeof node.data.entity === 'object' &&
          'name' in node.data.entity
        ) {
          return node.data.entity.name === modelName
        }
        return false
      })
      if (!flowNode) return

      flowNode.data.label = input.text
      flowNode.data.status = LLMStatusEnum.Loading
      if (input.progress === 100) {
        flowNode.data.label = ``
        flowNode.data.status = LLMStatusEnum.Loaded
      }
      updateOrCreateNode(flowNode)
    })

    return () => {
      callbackRemoval?.()
    }
  }, [localLLm, localLLm.initializing, localLLm.selectedModel, nodesRef, updateOrCreateNode])

  const contextValue = useMemo<HomePageContextType>(
    () => ({
      edges,
      nodes,
      updateNodeChanges,
      updateEdgeChanges,
      initializing,
      setInitializing,
      updateEdgeConnection,
    }),
    [
      edges,
      updateNodeChanges,
      nodes,
      updateEdgeChanges,
      initializing,
      setInitializing,
      updateEdgeConnection,
    ],
  )

  return <HomePageContextProvider value={contextValue}>{children}</HomePageContextProvider>
}

HomePageProvider.displayName = 'HomePageProvider'

export { HomePageProvider }
