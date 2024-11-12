import { memo, useCallback, useMemo } from 'react'
import { Handle, Position, useHandleConnections } from '@xyflow/react'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { MessageRoleEnum } from 'src/services/database/types'
import { NodeHeader } from 'src/components/molecules/NodeHeader'

import { HumanMessageComponent } from './components/HumanMessage'
import { AIMessageComponent } from './components/AIMessage'
import { MessageNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'

export const MessageNode = memo((props: MessageNodeProps) => {
  const { id, data, isConnectable } = props
  const { t } = useTranslation('common')
  const connections = useHandleConnections({
    type: 'source',
  })
  const { loading, createMessage } = useActions(id)
  const { toast } = useToast()

  useConnectionToHandler(id)

  const isEnd = useMemo(() => {
    return connections.length === 0
  }, [connections])

  const handleCopy = useCallback(() => {
    if (!data.entity?.content) {
      return
    }
    navigator.clipboard.writeText(data.entity.content)
    toast({
      description: t('copied'),
    })
  }, [toast, data, t])

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="tw-max-w-64">
        <div className="tw-w-auto">
          <NodeHeader id={id} />
          {data.entity?.role === MessageRoleEnum.Human ? (
            <HumanMessageComponent data={data} />
          ) : (
            <AIMessageComponent data={data} />
          )}
          <Button onClick={handleCopy} className="tw-absolute tw-top-0 tw-right-7" variant="link">
            <LazyIcon name="copy" size={16} />
          </Button>
          {isEnd && !data.loading ? (
            <div className="tw-w-[1px] tw-ml-[50%] tw-h-[30px] tw-bg-gray-500" />
          ) : null}
          {isEnd && !data.loading ? (
            <div className="tw-absolute">
              <div className="tw-ml-[-15%]">
                <NewMessageCard disabled={loading} loading={loading} onSubmit={createMessage} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
