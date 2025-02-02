import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
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
import CreateSessionDialog from 'src/components/dialogs/CreateSessionDialog'
import DeleteSessionDialog from 'src/components/dialogs/DeleteSessionDialog'
import { logError } from 'src/utils/logger'

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
  const { sessionId } = useParams()
  const [loadingId, setLoadingId] = useState<string>()
  const createSessionDialog = useModal(CreateSessionDialog)
  const deleteSessionDialog = useModal(DeleteSessionDialog)

  const handleNewSession = useCallback(() => {
    createSessionDialog.show({})
  }, [createSessionDialog])

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
      await setCurrentSession(session)
      navigate(getRouteURL('whiteboard', { sessionId: session.id }))
    } catch (error) {
      logError(error)
      setLoadingId(undefined)
    }
  }
  useEffect(() => {
    if (!loadingId || loadingId !== currentSession?.id) {
      return
    }

    setLoadingId(undefined)
  }, [loadingId, currentSession?.id])

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
            <SidebarMenuButton
              disabled={!!loadingId}
              asChild
              onClick={() => handleSetCurrentSession(item)}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex gap-2">
                  {item.id === loadingId ? (
                    <LazyIcon size={16} name="loader" className="animate-spin" />
                  ) : sessionId === item.id ? (
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
                  className="!z-50"
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
