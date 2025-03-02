import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppSidebar } from 'src/components/layout/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider } from 'src/lib/shadcn/ui//sidebar'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { useSessionState } from 'src/states/session'
import { getRouteURL, getSearchParams } from 'src/utils/routes'
import { SessionTypeEnum } from 'src/services/database/types'
import { useShallow } from 'zustand/react/shallow'
import { SessionStateActions } from 'src/states/session/actions'
import { SessionState } from 'src/states/session/state'
import { DefaultError } from 'src/components/atoms/DefaultError'

import { MainHeader } from './MainHeader'

export function MainLayout({ requiredSession }: { requiredSession?: boolean }) {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const locationRef = useRef(location)
  const currentSession = useSessionState((state) => state.currentSession)
  const sessions = useSessionState((state) => state.sessions)
  const applications = useSessionState((state) => state.applications)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)
  const setToDefaultSession = useSessionState((state) => state.setToDefaultSession)
  const { error, ready, initSessionState } = useSessionState(
    useShallow((state: SessionState & SessionStateActions) => ({
      initSessionState: state.init,
      error: state.error,
      ready: state.ready,
    })),
  )
  useLayoutEffect(() => {
    initSessionState()
  }, [initSessionState])


  locationRef.current = location

  useEffect(() => {
    if (!currentSession?.id || !requiredSession) {
      return
    }

    if (location.pathname.includes(getRouteURL('whiteboard'))) {
      if (!params.sessionId) {
        navigate(getRouteURL('whiteboard', { sessionId: currentSession?.id }))
      } else if (params.sessionId && params.sessionId !== currentSession?.id) {
        setCurrentSession(params.sessionId)
      }
    } else if (location.pathname.includes(getRouteURL('application'))) {
      if (!params.applicationId) {
        navigate(getRouteURL('application', { applicationId: currentSession?.id }))
      } else if (params.applicationId && params.applicationId !== currentSession?.id) {
        setCurrentSession(params.applicationId)
      }
    }
  }, [
    currentSession?.id,
    location.pathname,
    navigate,
    params.applicationId,
    params.sessionId,
    requiredSession,
    setCurrentSession,
  ])

  useEffect(() => {
    if (!requiredSession) {
      return
    }
    setCurrentSession(params.sessionId || params.applicationId).then((item) => {
      if (!item) {
        return setToDefaultSession(
          location.pathname.includes(getRouteURL('whiteboard'))
            ? SessionTypeEnum.Whiteboard
            : SessionTypeEnum.StandaloneApp,
        )
      }
      const searchParams = getSearchParams()
      if (searchParams.has('flow') && item.type === SessionTypeEnum.StandaloneApp) {
        return
      }
      if (
        item.type === SessionTypeEnum.StandaloneApp &&
        locationRef.current.pathname.includes(getRouteURL('whiteboard').replace('/', ''))
      ) {
        navigate(getRouteURL('application', { applicationId: item.id }))
      } else if (
        item.type === SessionTypeEnum.Whiteboard &&
        locationRef.current.pathname.includes(getRouteURL('application').replace('/', ''))
      ) {
        navigate(getRouteURL('whiteboard', { sessionId: item.id }))
      }
    })
  }, [
    navigate,
    params.applicationId,
    params.sessionId,
    requiredSession,
    setCurrentSession,
    setToDefaultSession,
  ])

  if (!ready) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        sessions={sessions}
        applications={applications}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
      />
      <SidebarInset className="max-h-screen overflow-hidden">
        <MainHeader />
        <Separator className="shrink-0" />
        <div className="flex flex-1 flex-col p-0 m-0 overflow-y-auto">
          {error ? <DefaultError /> : <Outlet />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
