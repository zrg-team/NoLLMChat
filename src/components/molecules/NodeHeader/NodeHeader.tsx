import { memo, useCallback } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { cn } from 'src/lib/utils'
import { getRepository } from 'src/services/database'
import { useFlowState } from 'src/states/flow'

export const NodeHeader = memo(({ id, className }: { id: string; className?: string }) => {
  const updateNode = useFlowState((state) => state.updateNodes)

  const handleDelete = useCallback(async () => {
    await getRepository('FlowNode').delete(id)
    await updateNode([{ id, type: 'remove' as const }])
  }, [id, updateNode])
  return (
    <div className={cn('tw-w-full tw-flex tw-justify-end tw-absolute tw-z-10', className)}>
      <Button onClick={handleDelete} variant="ghost">
        <LazyIcon name="trash-2" />
      </Button>
    </div>
  )
})
