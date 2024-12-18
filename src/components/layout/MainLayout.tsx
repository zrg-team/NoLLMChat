import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppSidebar } from 'src/components/layout/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider } from 'src/lib/shadcn/ui//sidebar'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { useSessionState } from 'src/states/session'
import { getRouteURL, getSearchParams } from 'src/utils/routes'
import { SessionTypeEnum } from 'src/services/database/types'
import { MainHeader } from './MainHeader'

export function MainLayout() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const locationRef = useRef(location)
  const currentSession = useSessionState((state) => state.currentSession)
  const sessions = useSessionState((state) => state.sessions)
  const applications = useSessionState((state) => state.applications)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)

  locationRef.current = location

  useEffect(() => {
    if (!currentSession?.id) {
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
    setCurrentSession,
  ])

  useEffect(() => {
    setCurrentSession(params.sessionId || params.applicationId).then((item) => {
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
  }, [navigate, params.applicationId, params.sessionId, setCurrentSession])

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
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
