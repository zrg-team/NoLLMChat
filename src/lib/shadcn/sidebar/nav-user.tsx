'use client'

import LazyIcon from 'src/components/atoms/LazyIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/lib/shadcn/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from 'src/lib/shadcn/ui/sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { useTranslation } from 'react-i18next'

export function NavUser() {
  const { t } = useTranslation('sidebar')
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:tw-bg-sidebar-accent data-[state=open]:tw-text-sidebar-accent-foreground"
            >
              <LazyIcon name="user" />
              <Label>{t('user')}</Label>
              <LazyIcon name="chevrons-up-down" className="tw-ml-auto tw-size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="tw-w-[--radix-dropdown-menu-trigger-width] tw-min-w-56 tw-rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LazyIcon name="sparkles" />
                {t('contact')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
