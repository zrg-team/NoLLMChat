import { lazy, memo, Suspense, useCallback } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { DefaultNodeResizer } from 'src/components/flows/DefaultNodeResizer'
import { Skeleton } from 'src/lib/shadcn/ui/skeleton'

import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'
import { EditorAppNodeProps } from './type'

const PlateEditor = lazy(() => import('src/components/organisms/editor/plate-editor'))

export const EditorAppNode = memo((props: EditorAppNodeProps) => {
  const { id, data, selected, isConnectable } = props
  useConnectionToHandler(id)
  const { updateEditorContent } = useActions(id)

  const handleChangeContent = useCallback(
    (value: unknown[]) => {
      updateEditorContent(value)
    },
    [updateEditorContent],
  )

  return (
    <div className="w-full min-w-[1240px] h-full">
      <DefaultNodeResizer isVisible={!!selected} minWidth={1240} minHeight={400} />
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="min-w-10 min-h-10 w-full h-full rounded-lg border">
        <NodeHeader id={id} />
        <Suspense
          fallback={
            <div className="bg-white flex gap-4 w-full h-full flex-col">
              <Skeleton className="h-6 max-w-full !rounded-none" />
              <Skeleton className="flex-1 max-w-full !rounded-none" />
            </div>
          }
        >
          <div className="h-full w-full bg-white rounded-lg" data-registry="plate">
            <PlateEditor defaultValue={data?.flowNode?.data} onValueChange={handleChangeContent} />
          </div>
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
