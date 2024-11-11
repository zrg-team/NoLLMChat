import { memo, useMemo } from 'react'
import { Handle, Position, useHandleConnections } from '@xyflow/react'
import { Avatar, AvatarFallback } from 'src/lib/shadcn/ui/avatar'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { ThreadNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const ThreadNode = memo((props: ThreadNodeProps) => {
  const { id, data, isConnectable } = props
  const connections = useHandleConnections({
    type: 'source',
  })
  const { loading, createMessage } = useActions(id, data)
  useConnectionToHandler(id)

  const containMessage = useMemo(() => {
    return connections.length > 0
  }, [connections])

  const inner = useMemo(() => {
    if (props.data.entity && !props.data.entity?.messages?.length && !containMessage) {
      return <NewMessageCard disabled={loading} loading={loading} onSubmit={createMessage} />
    }

    return (
      <Avatar>
        <AvatarFallback />
      </Avatar>
    )
  }, [containMessage, createMessage, loading, props.data.entity])
  return (
    <div>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader className="tw-left-1" id={id} />
        {inner}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
