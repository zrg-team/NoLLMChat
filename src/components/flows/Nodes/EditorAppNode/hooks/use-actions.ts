import { useCallback, useRef } from 'react'
import { useInternalNode } from '@xyflow/react'
import { getRepository } from 'src/services/database'

export const useActions = (id: string) => {
  const node = useInternalNode(id)
  const refDebounce = useRef<number | null>(null)

  const updateEditorContent = useCallback(
    async (value: unknown[]) => {
      if (!node) return
      clearTimeout(refDebounce.current!)
      refDebounce.current = setTimeout(async () => {
        await getRepository('FlowNode').update(node.id, {
          data: value,
        })
      }, 150) as unknown as number
    },
    [node],
  )

  return {
    updateEditorContent,
  }
}
