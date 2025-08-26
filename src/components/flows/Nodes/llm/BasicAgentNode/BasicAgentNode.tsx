import { memo } from 'react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Position } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { BasicAgentNodeProps } from './type'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'
import { useActions } from './hooks/use-actions'

export const BasicAgentNode = memo((props: BasicAgentNodeProps) => {
  const { id, isConnectable, data } = props
  const agent = data?.entity
  const { t } = useTranslation('flows')

  const { createThread, creatingThread } = useActions(id, data)
  useConnectionToHandler(id)

  // Truncate system prompt for display
  const truncatedSystemPrompt = agent?.system_prompt
    ? agent.system_prompt.length > 100
      ? `${agent.system_prompt.substring(0, 100)}...`
      : agent.system_prompt
    : 'No system prompt'

  return (
    <div className="min-w-56">
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Alert className="max-w-72" variant="default">
          <LazyIcon size={24} name={'bot'} />
          <div className="ml-2 max-w-full">
            <AlertTitle className="break-words">{agent?.name || 'Unnamed Agent'}</AlertTitle>
            <AlertDescription className="space-y-2">
              {agent?.description && (
                <div className="text-sm text-muted-foreground break-words">{agent.description}</div>
              )}
              <div className="text-xs text-muted-foreground break-words">
                <strong>System:</strong> {truncatedSystemPrompt}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Max: {agent?.max_iterations || 10} iterations
                </Badge>
              </div>
            </AlertDescription>
            <div className="mt-4">
              <LoadingButton
                loading={creatingThread}
                onClick={createThread}
                className="w-full"
                size="sm"
              >
                <LazyIcon size={16} name="message-square-plus" className="mr-2" />
                {t('basic_agent_node.create_thread_button')}
              </LoadingButton>
            </div>
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
