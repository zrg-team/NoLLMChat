import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'

import { MessageNodeProps } from '../type'

export function HumanMessageComponent({
  data,
  onNewThread,
  loading,
  showThread,
}: {
  data: MessageNodeProps['data']
  onNewThread?: () => void
  loading?: boolean
  showThread: boolean
}) {
  const { t } = useTranslation('flows')
  return (
    <Alert className="flex min-w-52">
      <LazyIcon size={24} name="user" />
      <div className="ml-2 max-w-full w-full">
        <AlertTitle>{`Human`}</AlertTitle>
        <AlertDescription>{`${data.content || data.entity?.content || ''}`}</AlertDescription>
        {onNewThread ? (
          <div className="w-full mt-2 flex items-center justify-end">
            <Button onClick={onNewThread} disabled={loading} variant="outline">
              <LazyIcon name={!showThread ? 'plus' : 'minus'} size={16} />
              {!showThread ? t(`message_node.new_thread`) : t(`message_node.hide_thread`)}
            </Button>
          </div>
        ) : undefined}
      </div>
    </Alert>
  )
}
