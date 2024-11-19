'use client'

import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'src/lib/shadcn/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from 'src/lib/shadcn/ui/sidebar'

export function NavDocuments({
  items,
}: {
  items: {
    title: string
    icon?: JSX.Element
    isActive?: boolean
    items?: {
      title: string
    }[]
  }[]
}) {
  const { t } = useTranslation('documents')

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="tw-text-sm">{t('title')}</div>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="tw-group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="tw-cursor-pointer" tooltip={t(item.title)}>
                  {item.icon}
                  <span>{t(item.title)}</span>
                  <LazyIcon
                    name="chevron-right"
                    className="tw-ml-auto tw-transition-transform tw-duration-200 tw-group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem className="tw-cursor-pointer" key={t(subItem.title)}>
                      <SidebarMenuSubButton asChild>
                        <span>{t(subItem.title)}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}