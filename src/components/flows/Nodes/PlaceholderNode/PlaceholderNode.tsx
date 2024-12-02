import { memo } from 'react'
import { Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Badge } from 'src/lib/shadcn/ui/badge'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { PlaceholderNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useTranslation } from 'react-i18next'

export const PlaceholderNode = memo((props: PlaceholderNodeProps) => {
  const { id, data, isConnectable } = props
  const { t } = useTranslation('flows')

  useConnectionToHandler(id)

  let placeholder = ''
  switch (data.entity?.placeholder_type) {
    case 'VECTOR_DATABASE_RETREIVER':
      placeholder = t('placeholder_node.vector_database_retriever')
      break
  }

  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <Alert className="flex justify-center max-w-80" variant="default">
        <NodeHeader id={id} />
        <LazyIcon name={'land-plot'} className="w-7 h-7" />
        <div className="ml-2 pr-4">
          <AlertTitle>{`${data.entity?.placeholder || ''}`}</AlertTitle>
          <AlertDescription>
            {placeholder ? <Badge>{placeholder}</Badge> : undefined}
          </AlertDescription>
        </div>
      </Alert>
      <DefaultHandle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  )
})
