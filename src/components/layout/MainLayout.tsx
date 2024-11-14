import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from 'src/lib/shadcn/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { useSessionState } from 'src/states/session'

export function MainLayout() {
  const { t } = useTranslation('common')
  const currentSession = useSessionState((state) => state.currentSession)
  const sessions = useSessionState((state) => state.sessions)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        sessions={sessions}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
      />
      <SidebarInset>
        <header className="tw-flex tw-h-14 tw-shrink-0 tw-items-center tw-gap-2 tw-transition-[width,height] tw-ease-linear">
          <div className="tw-flex tw-items-center tw-gap-2 tw-px-4">
            <SidebarTrigger className="tw-ml-1" />
            <Label>{t('whiteboard')}</Label>
          </div>
        </header>
        <div className="tw-flex tw-flex-1 tw-flex-col tw-p-0 tw-m-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
