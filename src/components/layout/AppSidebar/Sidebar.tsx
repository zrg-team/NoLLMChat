import * as React from 'react'

import { NavDocuments } from 'src/components/layout/AppSidebar/NavDocuments'
import { NavSessions } from 'src/components/layout/AppSidebar/NavSessions'
import { NavUser } from 'src/components/layout/AppSidebar/NavUser'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from 'src/lib/shadcn/ui/sidebar'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { SessionStateActions } from 'src/states/session/actions'
import { Session } from 'src/services/database/types'
import { NavStandaloneApp } from './NavStandaloneApp'

const data = {
  navMain: [
    {
      title: 'playground.title',
      icon: <LazyIcon name="square-terminal" />,
      isActive: true,
      items: [
        {
          title: 'playground.drag_and_drop',
        },
        {
          title: 'playground.node_connections',
        },
        {
          title: 'playground.delete_nodes',
        },
      ],
    },
    {
      title: 'model.title',
      url: '#',
      icon: <LazyIcon name="bot" />,
      items: [
        {
          title: 'model.llm',
        },
        {
          title: 'model.embedding',
        },
      ],
    },
    {
      title: 'tutorial.title',
      icon: <LazyIcon name="book-open" />,
      items: [
        {
          title: 'tutorial.get_started',
        },
        {
          title: 'tutorial.chat_with_llm',
        },
        {
          title: 'tutorial.ai_structured_output',
        },
        {
          title: 'tutorial.tool_calling',
        },
        {
          title: 'tutorial.few_shot_example',
        },
        {
          title: 'tutorial.vector_database',
        },
      ],
    },
    {
      title: 'application.title',
      icon: <LazyIcon name="settings-2" />,
      items: [
        {
          title: 'application.changelog',
        },
      ],
    },
  ],
}

export function AppSidebar({
  sessions,
  applications,
  currentSession,
  setCurrentSession,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  sessions?: Session[]
  applications?: Session[]
  currentSession?: {
    id: string
  }
  setCurrentSession: SessionStateActions['setCurrentSession']
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="h-1" />
      <SidebarContent>
        <NavSessions
          sessions={sessions || []}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
        />
        <NavStandaloneApp
          applications={applications || []}
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
        />
        <NavDocuments items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
