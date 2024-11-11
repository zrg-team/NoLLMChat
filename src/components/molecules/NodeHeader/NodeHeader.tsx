import { memo, useCallback } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { cn } from 'src/lib/utils'
import { getRepository } from 'src/services/database'
import { useFlowState } from 'src/states/flow'

export const NodeHeader = memo(({ id, className }: { id: string; className?: string }) => {
  const updateNode = useFlowState((state) => state.updateNodes)
  const updateEdges = useFlowState((state) => state.updateEdges)

  const handleDelete = useCallback(async () => {
    await getRepository('FlowNode').delete(id)
    const edges = await getRepository('FlowEdge').find({
      where: [{ source: id }, { target: id }],
    })
    await Promise.all(edges.map((edge) => getRepository('FlowEdge').delete(edge.id)))
    await updateNode([{ id, type: 'remove' as const }])
    await updateEdges(edges.map((edge) => ({ id: edge.id, type: 'remove' as const })))
  }, [id, updateNode, updateEdges])
  return (
    <div className={cn('tw-absolute tw-z-10 tw-right-0 tw-top-0 tw-w-10 tw-h-10', className)}>
      <Button className="tw-w-9 tw-h-9" onClick={handleDelete} variant="link">
        <LazyIcon name="trash-2" />
      </Button>
    </div>
  )
})
