import { memo, useMemo } from 'react'
import { Handle, Position, useHandleConnections } from '@xyflow/react'
import NewMessageCard from 'src/components/molecules/NewMessageCard'

import { HumanMessageComponent } from './components/HumanMessage'
import { AIMessageComponent } from './components/AIMessage'
import { MessageNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { MessageRoleEnum } from 'src/services/database/types'

export const MessageNode = memo((props: MessageNodeProps) => {
  const { id, data, isConnectable } = props
  const connections = useHandleConnections({
    type: 'source',
  })
  const { loading, createMessage } = useActions(id)

  useConnectionToHandler(id)

  const isEnd = useMemo(() => {
    return connections.length === 0
  }, [connections])

  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="tw-max-w-64">
        <div className="tw-w-auto">
          {data.entity?.role === MessageRoleEnum.Human ? (
            <HumanMessageComponent data={data} />
          ) : (
            <AIMessageComponent data={data} />
          )}
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
