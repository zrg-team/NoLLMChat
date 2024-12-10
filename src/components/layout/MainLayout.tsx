import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppSidebar } from 'src/components/layout/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { useSessionState } from 'src/states/session'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useAppState } from 'src/states/app'
import { getRouteURL } from 'src/utils/routes'
import { SessionTypeEnum } from 'src/services/database/types'

export function MainLayout() {
  const { t } = useTranslation('common')
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const locationRef = useRef(location)
  const setTheme = useAppState((state) => state.setTheme)
  const theme = useAppState((state) => state.theme)
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

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        sessions={sessions}
        applications={applications}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
      />
      <SidebarInset className="max-h-screen overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Label>{t('whiteboard')}</Label>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Button onClick={handleChangeTheme} variant="link">
              <LazyIcon size={18} name={theme === 'dark' ? 'moon' : 'sun'} />
            </Button>
            <a
              referrerPolicy="no-referrer"
              target="_blank"
              href="https://github.com/zrg-team/NoLLMChat"
            >
              <LazyIcon size={18} name="github" />
            </a>
          </div>
        </header>
        <Separator className="shrink-0" />
        <div className="flex flex-1 flex-col p-0 m-0 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
