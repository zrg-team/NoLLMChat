import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { MessageNodeData } from '../type'

export function HumanMessageComponent({ data }: { data: MessageNodeData }) {
  return (
    <Alert className="tw-flex tw-justify-center">
      <LazyIcon size={24} name="user" />
      <div className="tw-ml-2">
        <AlertTitle>{``}</AlertTitle>
        <AlertDescription>{`${data.content || data.entity?.content || ''}`}</AlertDescription>
      </div>
    </Alert>
  )
}
