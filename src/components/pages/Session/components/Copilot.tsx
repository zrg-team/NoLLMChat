import { memo, useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'

import ChatMainPanel from './Chat/ChatMainPanel'
import GeneralInfo from './GeneralInfo'
import MCPInfo from './MCPInfo'

import { ContextVectorDatabase } from './ContextVectorDatabase'
import { CodeVectorDatabase } from './CodeVectorDatabase/CodeVectorDatabase'
import { useTranslation } from 'react-i18next'
import { useChat } from '../hooks/use-chat'
import { useWorkspace } from '../hooks/use-workspace'
import { useWorkspaceState } from '../state/workspace'
import { useShallow } from 'zustand/react/shallow'

interface CopilotProps {
  sendMessage: ReturnType<typeof useChat>['createMessage']
  loadCurrentModel: ReturnType<typeof useWorkspace>['loadCurrentModel']
  createOrUpdateLLM: ReturnType<typeof useWorkspace>['createOrUpdateLLM']
}

const Copilot = memo((props: CopilotProps) => {
  const { t } = useTranslation('molecules')
  const graph = useWorkspaceState(useShallow((state) => state.graph))
  const { sendMessage, loadCurrentModel, createOrUpdateLLM } = props
  const [mode, setMode] = useState('chat')
  const generalComponent = useMemo(() => {
    return <GeneralInfo loadCurrentModel={loadCurrentModel} createOrUpdateLLM={createOrUpdateLLM} />
  }, [loadCurrentModel, createOrUpdateLLM])

  const chatComponent = useMemo(() => {
    return <ChatMainPanel sendMessage={sendMessage} />
  }, [sendMessage])

  const codeComponent = useMemo(() => {
    if (graph && graph?.name !== 'mcp') {
      return <CodeVectorDatabase />
    }
    return undefined
  }, [graph])

  const contextComponent = useMemo(() => {
    return <ContextVectorDatabase />
  }, [])

  const mcpComponent = useMemo(() => {
    return <MCPInfo />
  }, [])

  return (
    <div className="relative w-full h-full flex overflow-auto">
      <Tabs
        value={mode}
        defaultValue="chat"
        className="w-full h-full flex flex-col"
        onValueChange={setMode}
      >
        <TabsList className="!rounded-none w-full border-b-1 border-b-border">
          <TabsTrigger value="chat" className="flex items-center justify-center relative">
            {t('copilot.chat')}
            {mode === 'chat' ? (
              <div className="absolute bottom-[-3px] h-[2px] w-full bg-current" />
            ) : undefined}
          </TabsTrigger>
          {graph && graph?.name !== 'mcp' ? (
            <TabsTrigger value="code" className="flex items-center justify-center relative">
              {t('copilot.code')}
              {mode === 'code' ? (
                <div className="absolute bottom-[-3px] h-[2px] w-full bg-current" />
              ) : undefined}
            </TabsTrigger>
          ) : undefined}
          <TabsTrigger value="context" className="flex items-center justify-center relative">
            {t('copilot.context')}
            {mode === 'context' ? (
              <div className="absolute bottom-[-3px] h-[2px] w-full bg-current" />
            ) : undefined}
          </TabsTrigger>
          <TabsTrigger value="mcp" className="flex items-center justify-center relative">
            {t('copilot.mcp')}
            {mode === 'mcp' ? (
              <div className="absolute bottom-[-3px] h-[2px] w-full bg-current" />
            ) : undefined}
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center justify-center relative">
            {t('copilot.config')}
            {mode === 'config' ? (
              <div className="absolute bottom-[-3px] h-[2px] w-full bg-current" />
            ) : undefined}
          </TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0 h-full overflow-auto" value="chat">
          {chatComponent}
        </TabsContent>
        <TabsContent className="mt-0 h-full overflow-auto" value="code">
          {codeComponent}
        </TabsContent>
        <TabsContent className="mt-0 h-full overflow-auto" value="context">
          {contextComponent}
        </TabsContent>
        <TabsContent className="mt-0 h-full overflow-auto" value="config">
          {generalComponent}
        </TabsContent>
        <TabsContent className="mt-0 h-full overflow-auto" value="mcp">
          {mcpComponent}
        </TabsContent>
      </Tabs>
    </div>
  )
})

export default Copilot
