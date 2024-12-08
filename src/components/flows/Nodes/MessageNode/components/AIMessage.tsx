import { lazy, Suspense, useMemo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'
import { useTranslation } from 'react-i18next'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import { Button } from 'src/lib/shadcn/ui/button'

import { MessageNodeProps } from '../type'

const MarkdownPreview = lazy(() => import('@uiw/react-markdown-preview'))

export function AIMessageComponent({
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
        name={data.loading ? 'loader-circle' : 'bot'}
      />
      <LazyIcon name={!showThread ? 'plus' : 'minus'} size={24} />
      <div className="ml-2 w-full max-w-full">
        <AlertTitle>
          {t(`message_node.message_roles.${data.entity?.role?.toLowerCase()}`)}
        </AlertTitle>
        <Suspense
          fallback={
            <div className="h-full w-ful rounded-lg flex justify-center items-center">
              <LazyIcon name="loader-circle" className="animate-spin" />
            </div>
          }
        >
          <MarkdownPreview
            className="!text-sm [&_p]:leading-relaxed !max-w-full !bg-transparent !text-inherit !font-sans"
            source={`${data.content || data.entity?.content || ''}`}
          />
        </Suspense>
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
