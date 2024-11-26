import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from 'src/components/layout/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { useSessionState } from 'src/states/session'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useAppState } from 'src/states/app'

export function MainLayout() {
  const { t } = useTranslation('common')
  const setTheme = useAppState((state) => state.setTheme)
  const theme = useAppState((state) => state.theme)
  const currentSession = useSessionState((state) => state.currentSession)
  const sessions = useSessionState((state) => state.sessions)
  const setCurrentSession = useSessionState((state) => state.setCurrentSession)

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        sessions={sessions}
        currentSession={currentSession}
        setCurrentSession={setCurrentSession}
      />
      <SidebarInset>
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
        <Separator />
        <div className="flex flex-1 flex-col p-0 m-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
