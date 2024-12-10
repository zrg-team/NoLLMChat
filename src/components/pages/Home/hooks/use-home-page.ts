import { useEffect, useMemo, useRef, useState } from 'react'
import { LLMStatusEnum } from 'src/services/database/types/llm'
import { useFlowManager } from 'src/hooks/flows/handlers/use-flow-manager'

import { useAutomaticallyRenderFlows } from 'src/hooks/flows/handlers/use-automatically-render-flow'
import { useLocalLLMState } from 'src/services/local-llm'

export const useHomePage = () => {
  const [initializing, setInitializing] = useState(true)
  const flowManager = useFlowManager()
  const selectedModel = useLocalLLMState((state) => state.selectedModel)
  const selectedModelRef = useRef(selectedModel)
  const setInitProgressCallback = useLocalLLMState((state) => state.setInitProgressCallback)
  const { updateOrCreateNode, updateNodeChanges, updateEdgeChanges, updateEdgeConnection } =
    flowManager
  useAutomaticallyRenderFlows(flowManager)

  selectedModelRef.current = selectedModel

  useEffect(() => {
    const callbackRemoval = setInitProgressCallback?.((input) => {
      if (!selectedModelRef.current) {
        return
      }
      const modelName = `${selectedModelRef.current}`
      updateOrCreateNode((nodeRefs) => {
        const flowNode = nodeRefs?.find((node) => {
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

        return flowNode
      })
    })

    return () => {
      callbackRemoval?.()
    }
  }, [setInitProgressCallback, updateOrCreateNode])

  const contextValue = useMemo(
    () => ({
      updateNodeChanges,
      updateEdgeChanges,
      initializing,
      setInitializing,
      updateEdgeConnection,
    }),
    [updateNodeChanges, updateEdgeChanges, initializing, setInitializing, updateEdgeConnection],
  )

  return contextValue
}
