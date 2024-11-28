import { lazy, memo, Suspense } from 'react'
import { Position, NodeProps } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { DefaultNodeResizer } from 'src/components/flows/DefaultNodeResizer'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

const PlateEditor = lazy(() => import('src/components/organisms/editor/plate-editor'))

export const EditorAppNode = memo((props: NodeProps) => {
  const { id, selected, isConnectable } = props
  useConnectionToHandler(id)
  return (
    <>
      <DefaultNodeResizer isVisible={!!selected} minWidth={40} minHeight={40} />
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="min-w-10 min-h-10 w-full h-full bg-border border">
        <NodeHeader id={id} />
        <Suspense fallback={<div />}>
          <PlateEditor />
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </>
  )
})
