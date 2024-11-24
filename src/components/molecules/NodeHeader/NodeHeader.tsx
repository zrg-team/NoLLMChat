import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useToast } from 'src/lib/hooks/use-toast'
import { Button } from 'src/lib/shadcn/ui/button'
import { cn } from 'src/lib/utils'
import { getRepository } from 'src/services/database'
import { useFlowState } from 'src/states/flow'

export const NodeHeader = memo(({ id, className }: { id: string; className?: string }) => {
  const { t } = useTranslation('common')
  const updateNode = useFlowState((state) => state.updateNodes)
  const updateEdges = useFlowState((state) => state.updateEdges)
  const { toast } = useToast()

  const handleDelete = useCallback(async () => {
    await getRepository('FlowNode').delete(id)
    const edges = await getRepository('FlowEdge').find({
      where: [{ source: id }, { target: id }],
    })
    await Promise.all(edges.map((edge) => getRepository('FlowEdge').delete(edge.id)))
    await updateNode([{ id, type: 'remove' as const }])
    await updateEdges(edges.map((edge) => ({ id: edge.id, type: 'remove' as const })))
    toast({
      description: t('deleted'),
    })
  }, [id, updateNode, updateEdges, toast, t])
  return (
    <div className={cn('absolute z-10 right-0 top-0 w-10 h-10', className)}>
      <Button className="w-9 h-9" onClick={handleDelete} variant="link">
        <LazyIcon name="trash-2" />
      </Button>
    </div>
  )
})
