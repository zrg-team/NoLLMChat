import { useContext, useEffect, useMemo, useState } from 'react'
import { applyNodeChanges, Edge, Node } from '@xyflow/react'
import { LocalLLMContext } from 'src/modules/llm/provider'
import { ADD_MODEL_NODE } from 'src/constants/nodes'
import { LLMStatusEnum } from 'src/modules/database/types/llm'
import { LLMDatabaseContext } from 'src/contexts/LLMDatabase/context'

import { HomePageContextProvider } from './context'
import { HomePageContextType } from './type'

export interface JNScreenDocumentProviderProps {
  children: React.ReactNode
}

// [
//   {
//     id: 'init',
//     type: 'llm',
//     position: { x: window.innerWidth / 2 - 250, y: window.innerHeight / 2 - 300 },
//     data: { label: 'Initilize', title: 'LLM', ready: false },
//   },
//   {
//     id: 'input',
//     type: 'newMessage',
//     position: { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 },
//     data: { ready: false },
//   },
// ]
// [{ id: 'init', source: 'init', target: 'input' }]

const HomePageProvider: React.FC<JNScreenDocumentProviderProps> = ({ children }) => {
  const { initializing: databaseLLMsInitializing, llms } = useContext(LLMDatabaseContext)
  const [initializing, setInitializing] = useState(true)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const localLLm = useContext(LocalLLMContext)

  useEffect(() => {
    if (databaseLLMsInitializing) {
      return
    }
    if (!llms.length) {
      setNodes([ADD_MODEL_NODE])
      return
    }
    const initalX = window.innerWidth / 2 - llms.length * 150
    const initalY = ADD_MODEL_NODE.position.y + (ADD_MODEL_NODE.measured?.height || 0) + 50 
    const nodes = llms.map((llm, index) => ({
      id: llm.name,
      type: 'llm',
      position: { x: initalX + index * 150, y: initalY },
      data: {
        label: llm.name,
        model: llm.name,
        status: LLMStatusEnum.Started,
      },
    }))
    setNodes([ ADD_MODEL_NODE, ...nodes ])
  }, [databaseLLMsInitializing, llms])
  useEffect(() => {
    if (!localLLm.selectedModel || !localLLm.initializing || Object.values(localLLm.initializing).every(Boolean)) {
      return
    }
    const nodeId= `${localLLm.selectedModel}`
    console.log('localLLm.selectedModel', localLLm.selectedModel)
    const callbackRemoval = localLLm.setInitProgressCallback?.((input) => {
      setNodes((nds) => {
        const node = nds.find((n) => n.id === nodeId)
        if (!node) {
          return nds
        }
        node.data.label = input.text
        node.data.status = LLMStatusEnum.Loading
        const updatedNodes = [
          {
            id: nodeId,
            item: node,
            type: 'replace' as const,
          },
        ]
        if (input.progress === 100) {
          node.data.status = LLMStatusEnum.Loaded
          // updatedNodes.push({
          //   id: 'input',
          //   item: {
          //     id: `${input}`,
          //     type: 'text' as const,
          //     data: input.text,
          //   },
          //   type: 'replace' as const,
          // })
        }
        return applyNodeChanges(updatedNodes, nds)
      })
    })

    return () => {
      callbackRemoval?.()
    }
  }, [localLLm.initializing, localLLm.selectedModel])

  const contextValue = useMemo<HomePageContextType>(
    () => ({
      edges,
      nodes,
      setEdges,
      setNodes,
      initializing,
      setInitializing,
    }),
    [edges, setEdges, nodes, setNodes, initializing, setInitializing],
  )

  return <HomePageContextProvider value={contextValue}>{children}</HomePageContextProvider>
}

HomePageProvider.displayName = 'HomePageProvider'

export { HomePageProvider }
