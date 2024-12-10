import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from '@ebay/nice-modal-react'
import { useNavigate } from 'react-router-dom'
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
import DeleteSessionDialog from 'src/components/molecules/dialogs/DeleteSessionDialog'
import { Badge } from 'src/lib/shadcn/ui/badge'

export function NavStandaloneApp({
  applications,
  currentSession,
  setCurrentSession,
}: {
  applications: Session[]
  currentSession?: {
    id: string
  }
  setCurrentSession: SessionStateActions['setCurrentSession']
}) {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()
  const deleteSessionDialog = useModal(DeleteSessionDialog)

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
    navigate(getRouteURL('application', { applicationId: session.id }))
  }
  const renderBadge = (session: Session) => {
    switch (session.main_source_type) {
      case 'Thread':
        return (
          <Badge className="ml-1" color="blue">
            {t('application_types.chat')}
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-0">
      <SidebarGroupLabel>
        <div className="text-sm">{t('applications')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {applications?.map((item) => (
          <SidebarMenuItem className="cursor-pointer" key={item.id}>
            <SidebarMenuButton asChild onClick={() => handleSetCurrentSession(item)}>
              <div className="flex flex-row justify-between items-center !h-auto">
                <div className="flex gap-2">
                  {currentSession?.id === item.id ? (
                    <LazyIcon size={16} color="green" name="check" />
                  ) : (
                    <LazyIcon size={16} name="chevron-right" />
                  )}
                  <span>
                    {item.name}
                    {renderBadge(item)}
                  </span>
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
        {applications ? (
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
