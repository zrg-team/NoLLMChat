import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from '@ebay/nice-modal-react'
import { useNavigate, useParams } from 'react-router-dom'
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
import DeleteSessionDialog from 'src/components/dialogs/DeleteSessionDialog'

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
  const { applicationId } = useParams()
  const [loadingId, setLoadingId] = useState<string>()
  const deleteSessionDialog = useModal(DeleteSessionDialog)

  const handleDeleteSession = useCallback(
    (e: React.MouseEvent<SVGSVGElement>, id: string) => {
      e.preventDefault()
      e.stopPropagation()
      deleteSessionDialog.show({
        id,
      })
    },
    [deleteSessionDialog],
  )
  const handleSetCurrentSession = async (session: Session) => {
    try {
      setLoadingId(session.id)
      setCurrentSession(session)
      navigate(getRouteURL('application', { applicationId: session.id }))
    } catch (error) {
      console.error(error)
      setLoadingId(undefined)
    }
  }
  const renderBadge = (session: Session) => {
    switch (session.main_source_type) {
      case 'Thread':
        return (
          <LazyIcon
            className="inline-flex items-center ml-2"
            name="message-circle-more"
            size={14}
          />
        )
      default:
        return null
    }
  }
  useEffect(() => {
    if (!loadingId || loadingId !== currentSession?.id) {
      return
    }

    setLoadingId(undefined)
  }, [loadingId, currentSession?.id])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-0">
      <SidebarGroupLabel>
        <div className="text-sm">{t('applications')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {applications?.map((item) => (
          <SidebarMenuItem className="cursor-pointer" key={item.id}>
            <SidebarMenuButton
              disabled={!!loadingId}
              asChild
              autoHide
              onClick={() => handleSetCurrentSession(item)}
            >
              <div className="flex flex-row justify-between items-center !h-auto">
                <div className="flex gap-2">
                  {item.id === loadingId ? (
                    <LazyIcon size={16} name="loader" className="animate-spin" />
                  ) : applicationId === item.id ? (
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
                  className="!z-50"
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
