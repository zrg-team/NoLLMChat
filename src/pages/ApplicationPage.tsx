import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import ChatApplication from 'src/components/pages/ChatApplication/ChatApplication'
import EditorApplication from 'src/components/pages/EditorApplication/EditorApplication'
import { useSessionState } from 'src/states/session'

export default function ApplicationPage() {
  const currentSession = useSessionState((state) => state.currentSession)
  if (!currentSession) {
    return <DefaultLoader flickeringGrid className="w-full h-full" />
  }

  if (currentSession.main_source_type === 'Thread') {
    return <ChatApplication />
  }
  if (currentSession.main_node?.node_type === 'EDITOR_APP') {
    return <EditorApplication />
  }
  return undefined
}
