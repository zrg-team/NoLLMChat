import { lazy, Suspense, useMemo } from 'react'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import { withSessionLocalServiceProvider } from 'src/components/molecules/SessionLocalServiceProvider'
import { useSessionState } from 'src/states/session'

const ChatApplication = lazy(() => import('src/components/pages/ChatApplication/ChatApplication'))
const EditorApplication = lazy(
  () => import('src/components/pages/EditorApplication/EditorApplication'),
)
const VSLiteApplication = lazy(
  () => import('src/components/pages/VSLiteApplication/VSLiteApplication'),
)

function ApplicationPage() {
  const currentSession = useSessionState((state) => state.currentSession)
  const inner = useMemo(() => {
    if (!currentSession?.id) {
      return <DefaultLoader simple className="w-full h-full" />
    }

    if (currentSession.main_source_type === 'Thread') {
      return <ChatApplication />
    }
    if (currentSession.main_node?.node_type === 'EDITOR_APP') {
      return <EditorApplication />
    }
    if (currentSession.main_node?.node_type === 'VSLITE_APP') {
      return <VSLiteApplication />
    }
  }, [currentSession?.id, currentSession?.main_source_type, currentSession?.main_node?.node_type])
  return (
    <Suspense fallback={<DefaultLoader flickeringGrid className="w-full h-full" />}>
      {inner}
    </Suspense>
  )
}

const ApplicationPafeWithLocalServices = withSessionLocalServiceProvider(ApplicationPage)

export default ApplicationPafeWithLocalServices
