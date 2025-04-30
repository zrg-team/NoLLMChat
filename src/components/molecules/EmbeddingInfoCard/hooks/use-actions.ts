import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import secureSession from 'src/utils/secure-session'
import { encryptSymmetric } from 'src/utils/aes'
import { useConfirmOrCreatePassphrase } from 'src/hooks/mutations/use-confirm-or-create-passphrase'
import { EmbeddingProviderEnum } from 'src/services/database/types'

export const useActions = () => {
  const currentSessionId = useSessionState((state) => state.currentSession?.id)

  const { confirmOrCreatePassphrase } = useConfirmOrCreatePassphrase()

  const changeLLMOptions = useCallback(
    async ({
      options,
      provider,
      encrypted,
    }: {
      provider?: `${EmbeddingProviderEnum}`
      options?: Record<string, unknown>
      encrypted?: Record<string, unknown>
    }) => {
      if (currentSessionId) {
        const embeddingEntity = await getRepository('Embedding').findOne({
          where: { session_id: currentSessionId },
        })
        const encryptedInfo: Record<string, unknown> = {}
        if (Object.keys(encrypted || {})?.length) {
          await confirmOrCreatePassphrase()
          const passphrase = await secureSession.get('passphrase')
          if (!passphrase) {
            throw new Error('Passphrase is not found')
          }
          await Promise.all(
            Object.keys(encrypted || {}).map(async (key) => {
              if (encrypted?.[key]) {
                encryptedInfo[key] = await encryptSymmetric(encrypted[key] as string, passphrase!)
              }
            }),
          )
        }
        if (!embeddingEntity) {
          await getRepository('Embedding').save({
            data: options,
            key: 'default',
            encrypted: encryptedInfo,
            provider: provider || EmbeddingProviderEnum.Local,
            session_id: currentSessionId,
          })
        } else {
          await getRepository('Embedding').update(embeddingEntity.id, {
            data: options,
            encrypted: encryptedInfo,
            provider: provider || embeddingEntity.provider,
          })
        }
      }
    },
    [confirmOrCreatePassphrase, currentSessionId],
  )
  return {
    changeLLMOptions,
  }
}
