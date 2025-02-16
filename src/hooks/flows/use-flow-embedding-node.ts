import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import { FlowNodePlaceholder, FlowNodeTypeEnum } from 'src/services/database/types'

export const useFlowEmbeddingNode = () => {
  const { getNodes } = useReactFlow()

  const getFlowEmbeddingNode = useCallback(() => {
    const embeddingNode = getNodes().find(
      (node) => node.type === FlowNodeTypeEnum.DefaultEmbeddingModel,
    )
    return embeddingNode
  }, [getNodes])

  const getFlowEmbeddingEntity = useCallback(() => {
    const embeddingNode = getFlowEmbeddingNode()
    const embbedingEntity = embeddingNode?.data?.entity as FlowNodePlaceholder

    return embbedingEntity
  }, [getFlowEmbeddingNode])

  return {
    getFlowEmbeddingNode,
    getFlowEmbeddingEntity,
  }
}
