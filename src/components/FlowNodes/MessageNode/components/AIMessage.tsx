import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'

import { MessageNodeData } from '../type'

export function AIMessageComponent({ data }: { data: MessageNodeData }) {
  const { t } = useTranslation('flows')
  return (
    <Alert className="tw-flex tw-justify-center">
      <LazyIcon
        className={cn(data.loading ? 'tw-animate-spin' : undefined)}
        size={24}
        name={data.loading ? 'loader' : 'bot'}
      />
      <div className="tw-ml-2">
        <AlertTitle>
          {t(`message_node.message_roles.${data.entity?.role?.toLowerCase()}`)}
        </AlertTitle>
        <AlertDescription>{`${data.content || data.entity?.content || ''}`}</AlertDescription>
      </div>
    </Alert>
  )
}
