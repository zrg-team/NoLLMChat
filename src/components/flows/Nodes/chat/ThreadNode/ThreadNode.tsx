import { memo, useCallback, useMemo, useState } from 'react'
import { Position, useHandleConnections, useReactFlow } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { Card, CardTitle } from 'src/lib/shadcn/ui/card'
import {
  FlowNodePlaceholder,
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
  Prompt,
  PromptTypeEnum,
} from 'src/services/database/types'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { Button } from 'src/lib/shadcn/ui/button'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { ThreadNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const ThreadNode = memo((props: ThreadNodeProps) => {
  const { id, data, isConnectable } = props
  const { t } = useTranslation('flows')
  const [showThread, setShowThread] = useState(false)
  const connections = useHandleConnections({
    type: 'source',
  })
  const targetConnections = useHandleConnections({
    type: 'target',
  })
  const { getNode } = useReactFlow()
  const { loading, createMessage, getLinkedConnections } = useActions(id, data)

  useConnectionToHandler(id)

  const handleCreateMessage = useCallback(
    async (...args: Parameters<typeof createMessage>) => {
      setShowThread(false)
      const result = await createMessage(...args)
      return result
    },
    [createMessage],
  )

  const containMessage = useMemo(() => {
    return connections.length > 0
  }, [connections])

  const handleNewThread = useCallback(() => {
    setShowThread((pre) => !pre)
  }, [])

  const inner = useMemo(() => {
    const tags = targetConnections
      .map((connection, index) => {
        const source = getNode(connection.source)
        if (source?.type === FlowNodeTypeEnum.Schema) {
          return <Badge key={`${index}`}>{t('thread_node.structured_output')}</Badge>
        } else if (source?.type === FlowNodeTypeEnum.Prompt) {
          const entity = source.data.entity as Prompt
          return (
            <Badge key={`${index}`}>
              {t(
                entity.type === PromptTypeEnum.FewShotExample
                  ? 'thread_node.prompts.few_shot_example'
                  : `thread_node.prompts.${entity.role.toLowerCase()}`,
              )}
            </Badge>
          )
        } else if (source?.type === FlowNodeTypeEnum.PlaceHolder) {
          const entity = source.data.entity as FlowNodePlaceholder
          if (entity?.placeholder_type === FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER) {
            return <Badge key={`${index}`}>{t('thread_node.vector_database_retriever')}</Badge>
          }
        }
        return undefined
      })
      .filter(Boolean)

    if (props.data.entity && !props.data.entity?.messages?.length && !containMessage) {
      return (
        <NewMessageCard
          disabled={loading}
          loading={loading}
          onSubmit={handleCreateMessage}
          tags={tags}
        />
      )
    }

    if (!tags?.length) {
      return <div className="w-12 h-10" />
    }

    return (
      <Card className="p-4 pt-2">
        <CardTitle className="mb-2">{t('thread_node.title')}</CardTitle>
        <div className="flex gap-1.5">{tags}</div>
        <div className="mt-4 w-full flex justify-end">
          <Button onClick={handleNewThread} variant="outline">
            <LazyIcon name={showThread ? 'copy-minus' : 'copy-plus'} />
            {showThread ? t('thread_node.hide') : t('thread_node.clone')}
          </Button>
        </div>
      </Card>
    )
  }, [
    containMessage,
    getNode,
    handleCreateMessage,
    handleNewThread,
    loading,
    props.data.entity,
    showThread,
    t,
    targetConnections,
  ])
  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} enableToStandalone getLinkedConnections={getLinkedConnections} />
        {inner}
        {showThread ? (
          <>
            <div className="w-[1px] absolute ml-[50%] h-[30px] bg-gray-500" />
            <div className="absolute mt-[30px] w-full">
              <div className="ml-[10%] w-80 animate-in slide-in-from-bottom-5">
                <NewMessageCard
                  disabled={loading}
                  loading={loading}
                  onSubmit={handleCreateMessage}
                />
              </div>
            </div>
          </>
        ) : undefined}
      </div>
      <DefaultHandle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  )
})
