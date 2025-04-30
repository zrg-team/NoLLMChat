import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'src/lib/shadcn/ui/sidebar'
import { getRouteURL } from 'src/utils/routes'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'
import SparklesText from 'src/lib/shadcn/ui/sparkles-text'

export function NavSessions() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  const handleNewSession = useCallback(async () => {
    navigate(getRouteURL('sessions'))
  }, [navigate])

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <div className="text-sm">{t('sessions')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className={cn('tw-w-full')} onClick={handleNewSession}>
            <LazyIcon name="frame" />
            <SparklesText text={t('sessions')} className="text-sm" sparklesCount={3} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
