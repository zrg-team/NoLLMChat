import { useCallback, useEffect } from 'react'
import { NodeChange, useInternalNode, useNodes, Node } from '@xyflow/react'
import {
  FlowNodePlaceholder,
  FlowNodePlaceholderTypeEnum,
  FlowNodeTypeEnum,
} from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { getRepository } from 'src/services/database/database'
import { useSessionState } from 'src/states/session'
import { SYSTEM_NODE_IDS } from 'src/constants/nodes'
import secureSession from 'src/utils/secure-session'
import { encryptSymmetric } from 'src/utils/aes'
import { useConfirmOrCreatePassphrase } from 'src/hooks/mutations/use-confirm-or-create-passphrase'

export const useActions = (id: string) => {
  const currentSessionId = useSessionState((state) => state.currentSession?.id)
  const node = useInternalNode(id)
  const nodes = useNodes()

  const updateNodes = useFlowState((state) => state.updateNodes)
  const { confirmOrCreatePassphrase } = useConfirmOrCreatePassphrase()

  const changeLLMOptions = useCallback(
    async (input: Record<string, unknown>, inputEncrypted?: Record<string, unknown>) => {
      if (node && currentSessionId) {
        let flowNode =
          id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL
            ? await getRepository('FlowNode').findOne({
                where: { id },
              })
            : undefined

        const encrypted: Record<string, unknown> = {}
        if (Object.keys(inputEncrypted || {})?.length) {
          await confirmOrCreatePassphrase()
          const passphrase = await secureSession.get('passphrase')
          if (!passphrase) {
            throw new Error('Passphrase is not found')
          }
          await Promise.all(
            Object.keys(inputEncrypted || {}).map(async (key) => {
              if (inputEncrypted?.[key]) {
                encrypted[key] = await encryptSymmetric(inputEncrypted[key] as string, passphrase!)
              }
            }),
          )
        }
        let flowNodePlaceholder: FlowNodePlaceholder | undefined
        const changes: NodeChange<Node>[] = []
        if (!flowNode) {
          changes.push({ id, type: 'remove' })
          flowNodePlaceholder = await getRepository('FlowNodePlaceholder').save({
            placeholder_type: FlowNodePlaceholderTypeEnum.DEFAULT_EMBEDDING_MODEL,
            encrypted,
            data: input,
            session_id: currentSessionId,
          })
          flowNode = await getRepository('FlowNode').save({
            node_type: FlowNodeTypeEnum.DefaultEmbeddingModel,
            session_id: currentSessionId,
            source_type: 'FlowNodePlaceholder',
            source_id: flowNodePlaceholder.id,
            x: node.position.x,
            y: node.position.y,
          })
          changes.push({ type: 'add', item: node })
        } else {
          await getRepository('FlowNodePlaceholder').update(flowNode.source_id, {
            encrypted,
            data: input,
          })
          flowNodePlaceholder = await getRepository('FlowNodePlaceholder').findOne({
            where: { id: flowNode.source_id },
          })
          changes.push({ id: flowNode.id, type: 'replace', item: node })
        }
        node.data.entity = flowNodePlaceholder
        node.data.flowNode = flowNode
        updateNodes(changes)
      }
    },
    [confirmOrCreatePassphrase, currentSessionId, id, node, updateNodes],
  )

  useEffect(() => {
    if (id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL) return

    const embeddingNode = nodes.find(
      (n) =>
        n.type === FlowNodeTypeEnum.DefaultEmbeddingModel &&
        n.id !== SYSTEM_NODE_IDS.DEFAULT_EMBEDDING_MODEL,
    )
    if (embeddingNode) {
      updateNodes([{ id, type: 'remove' as const }])
    }
  }, [id, nodes, updateNodes])

  return {
    changeLLMOptions,
  }
}
