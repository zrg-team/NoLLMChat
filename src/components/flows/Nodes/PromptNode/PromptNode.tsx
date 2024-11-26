import { memo, useMemo } from 'react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { useModal } from '@ebay/nice-modal-react'
import ViewDataDetailDialog from 'src/components/molecules/dialogs/ViewDataDetailDialog'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { PromptNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const PromptNode = memo((props: PromptNodeProps) => {
  const { id, data, isConnectable } = props

  useConnectionToHandler(id)

  const viewDetailDialog = useModal(ViewDataDetailDialog)

  const content = useMemo(() => {
    return `${data.entity?.prefix ? `${data.entity?.prefix}\n` : ''}${data.entity?.content || ''}`
  }, [data.entity?.prefix, data.entity?.content])

  const promptArguments = useMemo(() => {
    const regex = /{(.*?)}/g
    const matches = content.match(regex)
    return matches?.map((match) => match.replace('{', '').replace('}', '')) || []
  }, [content])

  const isOverLimit = content.length > 990

  const handleOpenDetail = () => {
    viewDetailDialog.show({ title: 'Prompt', content })
  }

  return (
    <div className="min-w-56">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="flex justify-center max-w-72" variant="default">
          <LazyIcon size={24} name={'notepad-text'} />
          <div className="ml-2 max-w-full break-words break-all">
            <AlertTitle>{`${data.entity?.role || ''}`}</AlertTitle>
            <AlertDescription onClick={isOverLimit ? handleOpenDetail : undefined}>
              {isOverLimit ? `${content.slice(0, 990)}...` : content}
              {isOverLimit ? (
                <span className="float-right">
                  <LazyIcon name="chevron-right" />
                </span>
              ) : undefined}
            </AlertDescription>
            {promptArguments?.length
              ? promptArguments.map((argument, index) => {
                  return (
                    <Badge key={index} className="mt-2 mr-1" variant="default">
                      {argument}
                    </Badge>
                  )
                })
              : undefined}
          </div>
        </Alert>
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
