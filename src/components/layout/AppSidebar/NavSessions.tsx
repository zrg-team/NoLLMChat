import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@ebay/nice-modal-react'
import { getRouteURL } from 'src/utils/routes'
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
import NewSessionButton from 'src/components/layout/AppSidebar/NewSessionButton'
import CreateSessionDialog from 'src/components/molecules/dialogs/CreateSessionDialog'
import DeleteSessionDialog from 'src/components/molecules/dialogs/DeleteSessionDialog'

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
  const navigate = useNavigate()
  const createSessionDialog = useModal(CreateSessionDialog)
  const deleteSessionDialog = useModal(DeleteSessionDialog)

  const handleNewSession = useCallback(() => {
    createSessionDialog.show({})
  }, [createSessionDialog])

  const handleDeleteSession = useCallback(
    (e: React.MouseEvent<SVGSVGElement>, id: string) => {
      deleteSessionDialog.show({
        id,
      })
      e.preventDefault()
    },
    [deleteSessionDialog],
  )
  const handleSetCurrentSession = (session: Session) => {
    setCurrentSession(session)
    navigate(getRouteURL('whiteboard', { sessionId: session.id }))
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <div className="text-sm">{t('sessions')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <NewSessionButton onClick={handleNewSession} className="w-full" />
        </SidebarMenuItem>
        {sessions.map((item) => (
          <SidebarMenuItem className="cursor-pointer" key={item.id}>
            <SidebarMenuButton asChild onClick={() => handleSetCurrentSession(item)}>
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  {currentSession?.id === item.id ? (
                    <LazyIcon size={16} color="green" name="check" />
                  ) : (
                    <LazyIcon size={16} name="chevron-right" />
                  )}
                  <span>{item.name}</span>
                </div>
                <LazyIcon
                  onClick={(e) => handleDeleteSession(e, item.id)}
                  size={16}
                  name="trash-2"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {sessions?.length ? (
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <LazyIcon name="ellipsis" className="text-sidebar-foreground/70" />
              <span>{t('more_session')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : null}
      </SidebarMenu>
    </SidebarGroup>
  )
}
