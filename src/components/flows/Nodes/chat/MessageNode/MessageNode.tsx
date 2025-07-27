import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Position, useHandleConnections } from '@xyflow/react'
import NewMessageCard from 'src/components/molecules/NewMessageCard'
import { MessageRoleEnum } from 'src/services/database/types'
import { NodeHeader } from 'src/components/flows/NodeHeader'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useToast } from 'src/lib/hooks/use-toast'
import textToSpeech from 'src/utils/text-to-speech'
import { DefaultHandle } from 'src/components/flows/DefaultHandle'

import { HumanMessageComponent } from './components/HumanMessage'
import { AIMessageComponent } from './components/AIMessage'
import { MessageNodeProps } from './type'
import { useActions } from './hooks/use-actions'
import { useConnectionToHandler } from './hooks/use-connection-to-handler'

export const MessageNode = memo((props: MessageNodeProps) => {
  const { id, data, isConnectable } = props
  const [showThread, setShowThread] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const { t } = useTranslation('common')
  const connections = useHandleConnections({
    type: 'source',
  })
  const { loading, createMessage } = useActions(id)
  const { toast } = useToast()

  useConnectionToHandler(id)

  const handleCreateMessage = useCallback(
    async (...args: Parameters<typeof createMessage>) => {
      const result = await createMessage(...args)
      setShowThread(false)
      return result
    },
    [createMessage],
  )

  const isEnd = useMemo(() => {
    return connections.length === 0
  }, [connections])

  const handleCopy = useCallback(() => {
    if (!data.entity?.content) {
      return
    }
    navigator.clipboard.writeText(data.entity.content)
    toast({
      description: t('copied'),
    })
  }, [toast, data, t])

  const handleSpeech = useCallback(async () => {
    try {
      if (speaking) {
        await textToSpeech.stop()
        return setSpeaking(false)
      }
      setSpeaking(true)
      await textToSpeech.speak(data.entity?.content || '')
    } catch {
      toast({
        variant: 'destructive',
        description: t('errors.speech_is_not_supported'),
      })
    } finally {
      setSpeaking(false)
    }
  }, [data.entity?.content, speaking, t, toast])

  const handleNewThread = useCallback(() => {
    setShowThread((pre) => !pre)
  }, [])

  const newMessageCard = useMemo(() => {
    if (
      (!isEnd && !showThread) ||
      data.loading ||
      loading ||
      data?.entity?.status === 'inprogress'
    ) {
      return undefined
    }
    return (
      <>
        <div className="w-[1px] absolute ml-[50%] h-[30px] bg-gray-500" />
        <div className="absolute mt-[30px] w-full">
          <div className="ml-[10%] w-80 animate-in slide-in-from-bottom-5">
            <NewMessageCard disabled={loading} loading={loading} onSubmit={handleCreateMessage} />
          </div>
        </div>
      </>
    )
  }, [data?.entity?.status, data.loading, handleCreateMessage, isEnd, loading, showThread])

  return (
    <div>
      <DefaultHandle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="max-w-sm min-w-64">
        <div className="w-auto">
          <NodeHeader id={id} />
          <div>
            {data.entity?.role === MessageRoleEnum.Human ? (
              <HumanMessageComponent
                data={data}
                showThread={showThread}
                onNewThread={!isEnd ? handleNewThread : undefined}
              />
            ) : (
              <AIMessageComponent
                data={data}
                showThread={showThread}
                loading={loading}
                onNewThread={!isEnd ? handleNewThread : undefined}
              />
            )}
          </div>
          <Button
            onClick={handleSpeech}
            className="absolute top-0 right-[68px] !px-2 !rounded-none"
            variant="ghost"
          >
            <LazyIcon name={speaking ? 'circle-stop' : 'speech'} size={16} />
          </Button>
          <Button
            onClick={handleCopy}
            className="absolute top-0 right-[36px] !px-2 !rounded-none"
            variant="ghost"
          >
            <LazyIcon name="copy" size={16} />
          </Button>
        </div>
        {newMessageCard}
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
