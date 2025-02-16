import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from 'src/lib/shadcn/ui/sidebar'
import { useModal } from '@ebay/nice-modal-react'
import DeleteChatDataNodeDialog from 'src/components/dialogs/DeleteChatDataNodeDialog'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { FlowNode, Schema } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { convertToZodSchemaString } from 'src/utils/schema-format'
import MessageLoading from 'src/lib/shadcn/chat/message-loading'
import { cn } from 'src/lib/utils'
import { MarkdownViewer } from 'src/components/molecules/MarkdownViewer'
import { Card } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { LLMSetting } from 'src/components/atoms/LLMSetting'

import { ChatLLMInfo } from './ChatLLMInfo'
import VectorDatabaseDialog from './VectorDatabaseDialog'
import { useChatApplicationData } from '../hooks/use-chat-application-data'
import { useChatList } from '../hooks/use-chat-list'
import { useUpdateLLMOptions } from '../hooks/use-update-llm-options'

export function ChatPanel({
  schema,
  mainLLMInfo,
  mainEmbeddingInfo,
  loadLLM,
  retriverInfo,
  threadNode,
  onSelectThread,
  onAddNewThread,
  currentDataNode,
  setLLMInfo,
  changeLLMOptions,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  schema?: Schema
  threadNode?: FlowNode
  onAddNewThread?: () => void
  onSelectThread: (node: FlowNode) => void
  retriverInfo: ReturnType<typeof useChatApplicationData>['retriverInfo']
  currentDataNode: ReturnType<typeof useChatApplicationData>['currentDataNode']
  loadLLM: ReturnType<typeof useChatApplicationData>['loadLLM']
  mainLLMInfo: ReturnType<typeof useChatApplicationData>['mainLLMInfo']
  mainEmbeddingInfo: ReturnType<typeof useChatApplicationData>['mainEmbeddingInfo']
  setLLMInfo: ReturnType<typeof useChatApplicationData>['setLLMInfo']
  changeLLMOptions: ReturnType<typeof useUpdateLLMOptions>['changeLLMOptions']
}) {
  const { t } = useTranslation('applications')
  const [loading, setLoading] = React.useState(false)
  const deleteChatDataNodeDialog = useModal(DeleteChatDataNodeDialog)
  const vectorDatabaseDialog = useModal(VectorDatabaseDialog)
  const { chatList, getChatList, deleteChat } = useChatList(threadNode)

  const handleAddNewThread = React.useCallback(async () => {
    try {
      setLoading(true)
      await onAddNewThread?.()
      getChatList()
    } finally {
      setLoading(false)
    }
  }, [getChatList, onAddNewThread])

  const handleShowVectorDatabase = React.useCallback(() => {
    vectorDatabaseDialog.show({
      retriverInfo: retriverInfo[0],
      mainEmbeddingInfo: mainEmbeddingInfo,
    })
  }, [mainEmbeddingInfo, retriverInfo, vectorDatabaseDialog])

  const handleDeleteDataNode = React.useCallback(
    async (e: React.MouseEvent, node: FlowNode) => {
      e.stopPropagation()
      deleteChatDataNodeDialog.show({ onDelete: () => deleteChat(node) })
    },
    [deleteChat, deleteChatDataNodeDialog],
  )

  const handleChangeOptions = React.useCallback(
    async (options: Record<string, unknown>) => {
      if (!mainLLMInfo?.llm) {
        return
      }
      await changeLLMOptions(mainLLMInfo?.llm, options)
      setLLMInfo((pre) =>
        pre
          ? {
              ...pre,
              llm: {
                ...pre.llm,
                options,
              },
            }
          : undefined,
      )
    },
    [changeLLMOptions, mainLLMInfo?.llm, setLLMInfo],
  )

  const content = React.useMemo(() => {
    return (
      <MarkdownViewer
        className={cn('overflow-hidden break-words whitespace-pre-wrap w-full rounded-lg')}
        source={
          schema?.schema_items?.length
            ? `\`\`\`javascript\n${convertToZodSchemaString(schema?.schema_items || [])}\n\`\`\``
            : ''
        }
      />
    )
  }, [schema?.schema_items])

  return (
    <Sidebar variant="sidebar" side="right" collapsible="none" {...props}>
      <div className="h-1" />
      <SidebarGroupLabel className="justify-between">
        <div className="text-sm pl-2">{t('chat.history')}</div>
        <LoadingButton
          loading={loading}
          onClick={handleAddNewThread}
          variant="link"
          className="mr-[-6px]"
        >
          <LazyIcon name="circle-plus" />
        </LoadingButton>
      </SidebarGroupLabel>
      <SidebarContent>
        <SidebarGroup className="flex-1">
          <SidebarMenu>
            {chatList.map(({ node }, index) => (
              <SidebarMenuItem key={node.id} onClick={() => onSelectThread(node)}>
                <SidebarMenuButton className="cursor-pointer">
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex gap-2">
                      <LazyIcon
                        size={16}
                        name={currentDataNode?.node?.id === node.id ? 'check' : 'chevron-right'}
                        className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      />
                      <span>{`Thread ${index + 1}`}</span>
                    </div>
                    <LazyIcon
                      onClick={(e) => handleDeleteDataNode(e, node)}
                      size={16}
                      name="trash-2"
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        {retriverInfo?.length ? (
          <Card className="m-2 p-2 max-w-full">
            <pre className="overflow-auto">
              {retriverInfo.map((info, key) => (
                <span key={`${key}`}>{info.promptEntity?.content || ''}</span>
              ))}
            </pre>
            <Button onClick={handleShowVectorDatabase} className="w-full mt-4">
              {t('chat.vector_database')}
            </Button>
          </Card>
        ) : undefined}
        {schema?.schema_items?.length ? (
          <div className="m-2 !mb-0">
            <React.Suspense fallback={<MessageLoading />}>{content}</React.Suspense>
          </div>
        ) : undefined}
        <LLMSetting
          options={mainLLMInfo?.llm?.options}
          onChangeOptions={handleChangeOptions}
          className="p-2"
        />
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
