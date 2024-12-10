import { DefaultLoader } from 'src/components/atoms/DefaultLoader'
import ChatApplication from 'src/components/pages/ChatApplication/ChatApplication'
import { useSessionState } from 'src/states/session'

export default function ApplicationPage() {
  const currentSession = useSessionState((state) => state.currentSession)
  if (!currentSession) {
    return <DefaultLoader flickeringGrid className="w-full h-full" />
  }

  if (currentSession.main_source_type === 'Thread') {
    return <ChatApplication />
  }
  return undefined
}
