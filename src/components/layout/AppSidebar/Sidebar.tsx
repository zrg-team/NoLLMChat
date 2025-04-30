import * as React from 'react'

import { NavDocuments } from 'src/components/layout/AppSidebar/NavDocuments'
import { NavSessions } from 'src/components/layout/AppSidebar/NavSessions'
import { NavUser } from 'src/components/layout/AppSidebar/NavUser'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from 'src/lib/shadcn/ui/sidebar'
import LazyIcon from 'src/components/atoms/LazyIcon'

const data = {
  navMain: [
    {
      title: 'model.title',
      url: '#',
      icon: <LazyIcon name="bot" />,
      items: [
        {
          title: 'model.llm',
          id: 'llm',
        },
        {
          title: 'model.embedding',
          id: 'embedding',
        },
      ],
    },
    {
      title: 'application.title',
      icon: <LazyIcon name="settings-2" />,
      items: [
        {
          title: 'application.vslite',
          id: 'vslite',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <div className="h-1" />
      <SidebarContent>
        <NavSessions />
        <NavDocuments items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
