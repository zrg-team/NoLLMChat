import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from 'src/components/molecules/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { Separator } from 'src/lib/shadcn/ui/separator'
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
        <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="ml-1" />
            <Label>{t('whiteboard')}</Label>
          </div>
        </header>
        <Separator />
        <div className="flex flex-1 flex-col p-0 m-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
