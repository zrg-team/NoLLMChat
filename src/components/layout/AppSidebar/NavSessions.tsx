import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@ebay/nice-modal-react'
import { getRouteURL } from 'src/utils/routes'
import { SidebarGroup, SidebarMenu, SidebarMenuItem } from 'src/lib/shadcn/ui/sidebar'
import NewSessionButton from 'src/components/layout/AppSidebar/NewSessionButton'
import CreateSessionDialog from 'src/components/dialogs/CreateSessionDialog'

export function NavSessions({
  currentSession,
}: {
  currentSession?: {
    id: string
  }
}) {
  const { t } = useTranslation('sidebar')
  const navigate = useNavigate()
  const [loadingId, setLoadingId] = useState<string>()
  const createSessionDialog = useModal(CreateSessionDialog)

  const handleNewSession = useCallback(async () => {
    try {
      const sessionId = await createSessionDialog.show({})
      if (sessionId && typeof sessionId === 'string') {
        navigate(getRouteURL('whiteboard', { sessionId: sessionId }))
      }
    } catch {
      // ignore
    }
  }, [createSessionDialog, navigate])

  const navigateToList = useCallback(() => {
    navigate(getRouteURL('sessions'))
  }, [navigate])

  useEffect(() => {
    if (!loadingId || loadingId !== currentSession?.id) {
      return
    }

    setLoadingId(undefined)
  }, [loadingId, currentSession?.id])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden pb-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <NewSessionButton
            icon="layout-grid"
            onClick={navigateToList}
            className="w-full"
            text={t('sessions')}
          />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <NewSessionButton
            icon="frame"
            onClick={handleNewSession}
            className="w-full"
            text={t('new_session')}
            bold
            sparkles
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
