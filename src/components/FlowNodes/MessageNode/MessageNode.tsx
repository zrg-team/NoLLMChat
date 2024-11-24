import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, Position, useHandleConnections } from '@xyflow/react'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { MessageRoleEnum } from 'src/services/database/types'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useToast } from 'src/lib/hooks/use-toast'

import { HumanMessageComponent } from './components/HumanMessage'
import { AIMessageComponent } from './components/AIMessage'
import { MessageNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

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
      <div className="max-w-sm">
        <div className="w-auto">
          <NodeHeader id={id} />
          {data.entity?.role === MessageRoleEnum.Human ? (
            <HumanMessageComponent data={data} />
          ) : (
            <AIMessageComponent data={data} />
          )}
          <Button onClick={handleCopy} className="absolute top-0 right-7" variant="link">
            <LazyIcon name="copy" size={16} />
          </Button>
          {isEnd && !data.loading ? (
            <div className="w-[1px] ml-[50%] h-[30px] bg-gray-500" />
          ) : null}
          {isEnd && !data.loading ? (
            <div className="absolute">
              <div className="ml-[-15%]">
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
