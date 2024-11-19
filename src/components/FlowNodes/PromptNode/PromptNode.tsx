import { memo, useMemo } from 'react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Handle, Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import { Badge } from 'src/lib/shadcn/ui/badge'

import { PromptNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const PromptNode = memo((props: PromptNodeProps) => {
  const { id, data, isConnectable } = props

  useConnectionToHandler(id)

  const content = useMemo(() => {
    return `${data.entity?.prefix ? `${data.entity?.prefix}\n` : ''}${data.entity?.content || ''}`
  }, [data.entity?.prefix, data.entity?.content])

  const promptArguments = useMemo(() => {
    const regex = /{{(.*?)}}/g
    const matches = content.match(regex)
    return matches?.map((match) => match.replace('{{', '').replace('}}', '')) || []
  }, [content])

  return (
    <div className="tw-min-w-56">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="tw-flex tw-justify-center tw-max-w-64" variant="default">
          <LazyIcon size={24} name={'notepad-text'} />
          <div className="tw-ml-2">
            <AlertTitle>{`${data.entity?.role || ''}`}</AlertTitle>
            <AlertDescription>{content}</AlertDescription>
            {promptArguments?.length
              ? promptArguments.map((argument, index) => {
                  return (
                    <Badge key={index} className="tw-mt-2 tw-mr-1" variant="default">
                      {argument}
                    </Badge>
                  )
                })
              : undefined}
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
