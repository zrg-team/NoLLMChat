import { lazy, memo, Suspense, useCallback } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { DefaultNodeResizer } from 'src/components/flows/DefaultNodeResizer'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'
import { EditorAppNodeProps } from './type'

const PlateAppEditor = lazy(() => import('src/components/organisms/editor/PlateEditor'))

export const EditorAppNode = memo((props: EditorAppNodeProps) => {
  const { id, data, selected, isConnectable } = props
  useConnectionToHandler(id)
  const { createMessage, updateEditorContent } = useActions(id)

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
      <div className="min-w-10 min-h-10 w-full h-full rounded-lg border bg-background">
        <NodeHeader className="!z-[100]" id={id} />
        <Suspense
          fallback={
            <div className="h-full w-ful rounded-lg flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <div className="h-full w-ful rounded-lg" data-registry="plate">
            <PlateAppEditor
              defaultValue={data?.flowNode?.data}
              onValueChange={handleChangeContent}
              copilotStream={createMessage}
            />
          </div>
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
