import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { MessageNodeData } from '../type'

export function HumanMessageComponent({ data }: { data: MessageNodeData }) {
  return (
    <Alert className="flex justify-center min-w-52">
      <LazyIcon size={24} name="user" />
      <div className="ml-2">
        <AlertTitle>{`Human`}</AlertTitle>
        <AlertDescription>{`${data.content || data.entity?.content || ''}`}</AlertDescription>
      </div>
    </Alert>
  )
}
