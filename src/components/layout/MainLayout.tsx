import { useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AppSidebar } from 'src/components/layout/AppSidebar/Sidebar'
import { SidebarInset, SidebarProvider } from 'src/lib/shadcn/ui//sidebar'
import { Separator } from 'src/lib/shadcn/ui/separator'
import { useSessionState } from 'src/states/session'
import { useShallow } from 'zustand/react/shallow'
import { SessionStateActions } from 'src/states/session/actions'
import { SessionState } from 'src/states/session/state'
import { DefaultError } from 'src/components/atoms/DefaultError'

import { MainHeader } from './MainHeader'

export function MainLayout() {
  const location = useLocation()
  const locationRef = useRef(location)
  const sessions = useSessionState((state) => state.sessions)
  const applications = useSessionState((state) => state.applications)
  const { error, ready } = useSessionState(
    useShallow((state: SessionState & SessionStateActions) => ({
      error: state.error,
      ready: state.ready,
    })),
  )

  locationRef.current = location

  if (!ready) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar sessions={sessions} applications={applications} />
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
