import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTranslation } from 'react-i18next'

import { MessageNodeData } from '../type'

export function AIMessageComponent({ data }: { data: MessageNodeData }) {
  const { t } = useTranslation('flows')
  return (
    <Alert className="tw-flex tw-justify-center tw-min-w-52">
      <LazyIcon
        className={cn(data.loading ? 'tw-animate-spin' : undefined)}
        size={24}
        name={data.loading ? 'loader' : 'bot'}
      />
      <div className="tw-ml-2">
        <AlertTitle>
          {t(`message_node.message_roles.${data.entity?.role?.toLowerCase()}`)}
        </AlertTitle>
        <MarkdownPreview
          className="!tw-text-sm [&_p]:tw-leading-relaxed"
          style={{
            maxWidth: '100%',
            background: 'transparent',
            color: 'unset',
            fontFamily: 'unset',
          }}
          source={`${data.content || data.entity?.content || ''}`}
        />
      </div>
    </Alert>
  )
}
