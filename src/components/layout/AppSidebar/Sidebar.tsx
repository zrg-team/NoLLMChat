import * as React from 'react'

import { NavDocuments } from 'src/components/layout/AppSidebar/NavDocuments'
import { NavSessions } from 'src/components/layout/AppSidebar/NavSessions'
import { NavUser } from 'src/components/layout/AppSidebar/NavUser'
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from 'src/lib/shadcn/ui/sidebar'
import LazyIcon from 'src/components/atoms/LazyIcon'

const data = {
  navMain: [
    {
      title: 'playground.title',
      icon: <LazyIcon name="square-terminal" />,
      isActive: true,
      items: [
        {
          title: 'playground.nodes',
          id: 'nodes',
        },
        {
          title: 'playground.connections',
          id: 'connections',
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
          id: 'llm',
        },
        {
          title: 'model.embedding',
          id: 'embedding',
        },
      ],
    },
    {
      title: 'tutorial.title',
      icon: <LazyIcon name="book-open" />,
      items: [
        {
          title: 'tutorial.get_started',
          id: 'get-started',
        },
        {
          title: 'tutorial.simple_workflow',
          id: 'simple-workflow',
        },
        {
          title: 'tutorial.ai_structured_output',
          id: 'ai-structured-output',
        },
        {
          title: 'tutorial.standalone_chat_application',
          id: 'chat-application',
        },
        {
          title: 'tutorial.standalone_editor_application',
          id: 'editor-application',
        },
        {
          title: 'tutorial.tool_calling',
          id: 'tool-calling',
        },
        {
          title: 'tutorial.vector_database',
          id: 'vector-database',
        },
      ],
    },
    {
      title: 'application.title',
      icon: <LazyIcon name="settings-2" />,
      items: [
        {
          title: 'application.chat',
          id: 'chat',
        },
        {
          title: 'application.editor',
          id: 'editor',
        },
        {
          title: 'application.vslite',
          id: 'vslite',
        },
      ],
    },
  ],
}

export function AppSidebar({
  currentSession,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentSession?: {
    id: string
  }
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <div className="h-1" />
      <SidebarContent>
        <NavSessions currentSession={currentSession} />
        <NavDocuments items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
