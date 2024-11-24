import { useMemo } from 'react'
import { Alert, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { cn } from 'src/lib/utils'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTranslation } from 'react-i18next'

import { MessageNodeData } from '../type'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'

export function AIMessageComponent({ data }: { data: MessageNodeData }) {
  const { t } = useTranslation('flows')
  const messageMetadata = useMemo<{ message: Record<string, unknown> }>(() => {
    try {
      return JSON.parse(data?.entity?.metadata || '{}')
    } catch {
      return {}
    }
  }, [data?.entity?.metadata])
  return (
    <Alert className="flex justify-center min-w-52">
      <LazyIcon
        className={cn(data.loading ? 'animate-spin' : undefined)}
        size={24}
        name={data.loading ? 'loader' : 'bot'}
      />
      <div className="ml-2">
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
      </div>
      {data.loading ? <BorderBeam size={350} duration={10} /> : undefined}
    </Alert>
  )
}
