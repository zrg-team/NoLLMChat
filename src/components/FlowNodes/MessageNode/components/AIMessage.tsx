import { useMemo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTranslation } from 'react-i18next'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import { Button } from 'src/lib/shadcn/ui/button'

import { MessageNodeData } from '../type'

export function AIMessageComponent({
  data,
  onNewThread,
  loading,
  showThread,
}: {
  data: MessageNodeData
  onNewThread?: () => void
  loading?: boolean
  showThread: boolean
}) {
  const { t } = useTranslation('flows')
  const messageMetadata = useMemo<{ message: Record<string, unknown> }>(() => {
    try {
      return JSON.parse(data?.entity?.metadata || '{}')
    } catch {
      return {}
    }
  }, [data?.entity?.metadata])
  return (
    <Alert className="flex min-w-52">
      <LazyIcon
        className={cn(data.loading ? 'animate-spin' : undefined)}
        size={24}
        name={data.loading ? 'loader' : 'bot'}
      />
      <div className="ml-2 max-w-full">
        <AlertTitle>
          {t(`message_node.message_roles.${data.entity?.role?.toLowerCase()}`)}
        </AlertTitle>
        <MarkdownPreview
          className="!text-sm [&_p]:leading-relaxed"
          style={{
            maxWidth: '100%',
            background: 'transparent',
            color: 'unset',
            fontFamily: 'unset',
          }}
          source={`${data.content || data.entity?.content || ''}`}
        />
        {Array.isArray(messageMetadata?.message?.tool_calls) &&
        messageMetadata?.message?.tool_calls?.length
          ? messageMetadata?.message?.tool_calls.map((item, index) => {
              return (
                <Badge key={`${item.name}_${index}`}>
                  {t('message_node.tool_call', {
                    name: item.name,
                    args: Object.entries(item.args)
                      .map(([key, value]) => `"${key}": "${value}"`)
                      .join(', '),
                  })}
                </Badge>
              )
            })
          : null}
        {onNewThread ? (
          <div className="w-full mt-2 flex items-center justify-end">
            <Button onClick={onNewThread} disabled={loading} variant="outline">
              <LazyIcon name={!showThread ? 'plus' : 'minus'} size={16} />
              {!showThread ? t(`message_node.new_thread`) : t(`message_node.hide_thread`)}
            </Button>
          </div>
        ) : undefined}
      </div>
      {data.loading ? <BorderBeam size={350} duration={10} /> : undefined}
    </Alert>
  )
}
