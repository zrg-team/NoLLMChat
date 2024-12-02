import { lazy, memo, Suspense, useState } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { VITE_VUE_BASE } from 'src/services/web-container/source-bases/vite-vue'
import { convertToElementsTree, ElementTree } from 'src/services/web-container/utils/file-tree'

import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { EditorAppNodeProps } from './type'

const CodeEditor = lazy(() => import('./components/CodeEditor'))

export const CodeContainerAppNode = memo((props: EditorAppNodeProps) => {
  const { id, isConnectable } = props
  const [filesystem] = useState<ElementTree[]>(convertToElementsTree(VITE_VUE_BASE))
  useConnectionToHandler(id)

  return (
    <div className="w-[1000px] h-[600px]">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="w-full h-full rounded-lg border bg-background">
        <NodeHeader id={id} />
        <Suspense
          fallback={
            <div className="h-full w-ful rounded-lg flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <CodeEditor filesystem={filesystem} />
        </Suspense>
      </div>
      <DefaultHandle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})
