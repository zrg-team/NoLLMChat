import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'src/lib/shadcn/ui/sidebar'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { FlowNode } from 'src/services/database/types'

import { ChatLLMInfo } from './ChatLLMInfo'
import { useChatApplicationData } from '../hooks/use-chat-application-data'
import { useChatList } from '../hooks/use-chat-list'

export function ChatPanel({
  mainLLMInfo,
  loadLLM,
  threadNode,
  currentDataNode,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  threadNode?: FlowNode
  currentDataNode: ReturnType<typeof useChatApplicationData>['currentDataNode']
  loadLLM: ReturnType<typeof useChatApplicationData>['loadLLM']
  mainLLMInfo: ReturnType<typeof useChatApplicationData>['mainLLMInfo']
}) {
  const { chatList } = useChatList(threadNode)
  return (
    <Sidebar variant="sidebar" side="right" collapsible="none" {...props}>
      <div className="h-1" />
      <SidebarContent>
        <SidebarGroup className="flex-1">
          <SidebarMenu>
            {chatList.map(({ node }, index) => (
              <SidebarMenuItem key={node.id}>
                <SidebarMenuButton className="cursor-pointer">
                  <span>{`Thread ${index + 1}`}</span>
                  <LazyIcon
                    name={currentDataNode?.node?.id === node.id ? 'check' : 'chevron-right'}
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <ChatLLMInfo
          llm={mainLLMInfo?.llm}
          status={mainLLMInfo?.status}
          progress={mainLLMInfo?.progress}
          loadLLM={loadLLM}
        />
      </SidebarContent>
    </Sidebar>
  )
}
