import { lazy, memo, Suspense } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { EditorAppNodeProps } from './type'

const VSLiteApp = lazy(() => import('src/lib/vslite/index'))

export const VSLiteAppNode = memo((props: EditorAppNodeProps) => {
  const { id, isConnectable } = props

  return (
    <div className="w-[1380px] h-[600px]">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="w-full h-full rounded-lg border bg-card overflow-hidden">
        <NodeHeader id={id} />
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <VSLiteApp />
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
