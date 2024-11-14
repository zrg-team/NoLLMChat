import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'src/lib/shadcn/ui/sidebar'
import { Session } from 'src/services/database/types'
import { SessionStateActions } from 'src/states/session/actions'
import NewProjectButton from 'src/lib/shadcn/sidebar/new-project-button'

export function NavSessions({
  sessions,
  currentSession,
  setCurrentSession,
}: {
  sessions: Session[]
  currentSession?: {
    id: string
  }
  setCurrentSession: SessionStateActions['setCurrentSession']
}) {
  const { t } = useTranslation('sidebar')

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:tw-hidden">
      <SidebarGroupLabel>
        <div className="tw-text-sm">{t('sessions')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <NewProjectButton className="tw-w-full" />
        </SidebarMenuItem>
        {sessions.map((item) => (
          <SidebarMenuItem className="tw-cursor-pointer" key={item.id}>
            <SidebarMenuButton asChild onClick={() => setCurrentSession(item)}>
              <div>
                {currentSession?.id === item.id ? (
                  <LazyIcon color="green" name="check" />
                ) : (
                  <LazyIcon name="chevron-right" />
                )}
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="tw-text-sidebar-foreground/70">
            <LazyIcon name="ellipsis" className="tw-text-sidebar-foreground/70" />
            <span>{t('more_session')}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
