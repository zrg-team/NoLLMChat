import { lazy, memo, Suspense, useMemo } from 'react'
import DotPattern from 'src/lib/shadcn/ui/dot-pattern'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

import { components } from './Components/components'

const LLMPage = lazy(() => import('src/docs/models/llm.mdx'))
const EmbeddingPage = lazy(() => import('src/docs/models/embedding.mdx'))
const VSLiteApplicationPage = lazy(() => import('src/docs/applications/vslite.mdx'))

const DocumentViewer = memo(
  (props: { name: string }) => {
    const inner = useMemo(() => {
      switch (props.name) {
        case 'embedding':
          return <EmbeddingPage components={components} />
        case 'llm':
          return <LLMPage components={components} />
        case 'vslite':
          return <VSLiteApplicationPage components={components} />
        default:
          return <LLMPage components={components} />
      }
    }, [props.name])
    return (
      <div className="max-w-full max-h-full overflow-hidden relative flex flex-col min-h-full">
        <Suspense fallback={<DefaultLoader morphing />}>
          <div className="flex-grow h-full overflow-auto flex justify-center min-h-full">
            <DotPattern width={32} height={32} className="h-full" cr={0.6} />
            <div className="p-6 !pb-12 relative max-w-5xl">{inner}</div>
          </div>
        </Suspense>
      </div>
    )
  },
  (pre, next) => pre.name === next.name,
)

export default DocumentViewer
