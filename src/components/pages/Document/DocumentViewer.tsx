import { lazy, memo, Suspense, useMemo } from 'react'
import DotPattern from 'src/lib/shadcn/ui/dot-pattern'

import { components } from './Components/components'

const LLMPage = lazy(() => import('src/docs/models/llm.mdx'))
const NodesPage = lazy(() => import('src/docs/playground/nodes.mdx'))
const ConnectionsPage = lazy(() => import('src/docs/playground/connections.mdx'))
const EmbeddingPage = lazy(() => import('src/docs/models/embedding.mdx'))

const DocumentViewer = memo(
  (props: { name: string }) => {
    const inner = useMemo(() => {
      switch (props.name) {
        case 'nodes':
          return <NodesPage components={components} />
        case 'connections':
          return <ConnectionsPage components={components} />
        case 'embedding':
          return <EmbeddingPage components={components} />
        case 'llm':
        default:
          return <LLMPage components={components} />
      }
    }, [props.name])
    return (
      <div className="max-w-full max-h-full overflow-hidden relative flex flex-col">
        <Suspense fallback={<div />}>
          <div className="flex-grow h-full overflow-auto">
            <DotPattern width={32} height={32} className="h-full" cr={0.6} />
            <div className="p-4 !pb-12 relative">{inner}</div>
          </div>
        </Suspense>
      </div>
    )
  },
  () => true,
)

export default DocumentViewer
