import { useCallback, useContext, useMemo } from 'react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { LLMStatusEnum } from 'src/modules/database/types/llm'
import { Button } from 'src/lib/shadcn/ui/button'
import { LocalLLMContext } from 'src/modules/llm/provider'

function LLMNode({ data, isConnectable }: NodeProps & { data: { title: string, status: LLMStatusEnum } }) {
  const { loadModel } = useContext(LocalLLMContext)
  const llmIcon = useMemo(() => {
    switch (data.status) {
      case LLMStatusEnum.Downloading:
        return (
          <LazyIcon
            className={'tw-animate-spin'}
            size={24}
            name={'arrow-big-down-dash'}
          />
        )
      case LLMStatusEnum.Loading:
        return (
          <LazyIcon
            className={'tw-animate-spin'}
            size={24}
            name={'loader-circle'}
          />
        )
      case LLMStatusEnum.Loaded:
        return (
          <LazyIcon
            size={24}
            name={'brain'}
          />
        )
      default:
        return null
    }
  }, [data.status])
  const handleLoadModel = useCallback(async () => {
    if (data.model) {
      await loadModel?.(`${data.model}`)
    }
  }, [loadModel, data.model])
  const createThread = useCallback(async () => {
  }, [])
  const actions = useMemo(() => {
    if (data.status === LLMStatusEnum.Started) {
      return (
        <Button onClick={handleLoadModel} className="tw-w-full tw-mt-4">
          Load
        </Button>
      )
    } else if (data.status === LLMStatusEnum.Loaded) {
      return (
        <Button onClick={createThread} className="tw-w-full tw-mt-4">
          Create Thread
        </Button>
      )
    }
  }, [data.status, handleLoadModel, createThread])
  return (
    <div>
      <div>
        <Alert
          className="tw-flex tw-justify-center"
        >
          {llmIcon}
          <div className="tw-ml-2">
            <AlertTitle>{`${data.title || ''}`}</AlertTitle>
            <AlertDescription>{`${data.label || ''}`}</AlertDescription>
            {actions}
          </div>
        </Alert>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
}

export default LLMNode
