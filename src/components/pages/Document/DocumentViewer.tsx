import { lazy, memo, Suspense, useMemo } from 'react'
import DotPattern from 'src/lib/shadcn/ui/dot-pattern'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

import { components } from './Components/components'

const LLMPage = lazy(() => import('src/docs/models/llm.mdx'))
const NodesPage = lazy(() => import('src/docs/playground/nodes.mdx'))
const ConnectionsPage = lazy(() => import('src/docs/playground/connections.mdx'))
const EmbeddingPage = lazy(() => import('src/docs/models/embedding.mdx'))
const GetStartedTutorialPage = lazy(() => import('src/docs/tutorials/get-started.mdx'))
const StructuredOutputTutorialPage = lazy(
  () => import('src/docs/tutorials/ai-structured-output.mdx'),
)
const VectorDatabaseTutorialPage = lazy(() => import('src/docs/tutorials/vector-database.mdx'))
const ToolCallingTutorialPage = lazy(() => import('src/docs/tutorials/tool-calling.mdx'))
const ChatApplicationTutorialPage = lazy(() => import('src/docs/tutorials/chat-application.mdx'))
const EditorApplicationTutorialPage = lazy(
  () => import('src/docs/tutorials/editor-application.mdx'),
)
const SimpleWorkflowTutorialPage = lazy(() => import('src/docs/tutorials/simple-workflow.mdx'))
const ChatApplicationPage = lazy(() => import('src/docs/applications/chat.mdx'))
const EditorApplicationPage = lazy(() => import('src/docs/applications/editor.mdx'))
const VSLiteApplicationPage = lazy(() => import('src/docs/applications/vslite.mdx'))

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
          return <LLMPage components={components} />
        case 'get-started':
          return <GetStartedTutorialPage components={components} />
        case 'ai-structured-output':
          return <StructuredOutputTutorialPage components={components} />
        case 'vector-database':
          return <VectorDatabaseTutorialPage components={components} />
        case 'tool-calling':
          return <ToolCallingTutorialPage components={components} />
        case 'chat-application':
          return <ChatApplicationTutorialPage components={components} />
        case 'editor-application':
          return <EditorApplicationTutorialPage components={components} />
        case 'simple-workflow':
          return <SimpleWorkflowTutorialPage components={components} />
        case 'chat':
          return <ChatApplicationPage components={components} />
        case 'editor':
          return <EditorApplicationPage components={components} />
        case 'vslite':
          return <VSLiteApplicationPage components={components} />
        default:
          return <LLMPage components={components} />
      }
    }, [props.name])
    return (
      <div className="max-w-full max-h-full overflow-hidden relative flex flex-col min-h-full">
        <Suspense fallback={<DefaultLoader simple />}>
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
