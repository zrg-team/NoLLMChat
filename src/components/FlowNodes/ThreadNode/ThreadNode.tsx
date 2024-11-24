import { memo, useMemo } from 'react'
import { Handle, Position, useHandleConnections, useReactFlow } from '@xyflow/react'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { Card, CardTitle } from 'src/lib/shadcn/ui/card'
import { ThreadNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { FlowNodeTypeEnum, Prompt, PromptTypeEnum } from 'src/services/database/types'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { useTranslation } from 'react-i18next'

export const ThreadNode = memo((props: ThreadNodeProps) => {
  const { id, data, isConnectable } = props
  const { t } = useTranslation('flows')
  const connections = useHandleConnections({
    type: 'source',
  })
  const targetConnections = useHandleConnections({
    type: 'target',
  })
  const { getNode } = useReactFlow()
  const { loading, createMessage } = useActions(id, data)

  useConnectionToHandler(id)

  const containMessage = useMemo(() => {
    return connections.length > 0
  }, [connections])

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
        }
        return undefined
      })
      .filter(Boolean)

    if (props.data.entity && !props.data.entity?.messages?.length && !containMessage) {
      return (
        <NewMessageCard disabled={loading} loading={loading} onSubmit={createMessage} tags={tags} />
      )
    }

    if (!tags?.length) {
      return <div className="w-10 h-10" />
    }

    return (
      <Card className="p-4 pt-2">
        <CardTitle className="mb-2">{t('thread_node.title')}</CardTitle>
        <div className="flex gap-1.5">{tags}</div>
      </Card>
    )
  }, [containMessage, createMessage, getNode, loading, props.data.entity, t, targetConnections])
  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        {inner}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
