import { Node } from '@xyflow/react'
import { useCallback, useContext, useState } from 'react'
import { HomePageContext } from 'src/contexts/HomePage/context'

export const useCreateNewMessage = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { edges, nodes } = useContext(HomePageContext)

  const createMessage = useCallback(
    async (input: string) => {
      const node = nodes.find((node: Node) => node.id === id)
      if (!node) {
        return
      }
      setLoading(true)
      const nodeEdges = edges.filter((edge) => edge.target === id)
      console.log('input', input)
      console.log('nodeEdges', nodeEdges)
    },
    [id, nodes, edges],
  )

  return {
    loading,
    createMessage,
  }
}
