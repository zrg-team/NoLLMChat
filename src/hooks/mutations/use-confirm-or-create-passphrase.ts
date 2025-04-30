import { useCallback } from 'react'
import { useSessionState } from 'src/states/session'
import secureSession from 'src/utils/secure-session'
import { useModalRef } from 'src/hooks/use-modal-ref'
import CreateSessionPassphraseDialog from 'src/components/dialogs/CreateSessionPassphraseDialog'
import { useUpdateSessionPassphrase } from 'src/hooks/mutations/use-update-session-passphrase'
import { useConfirmPassphrase } from './use-confirm-passphrase'

export const useConfirmOrCreatePassphrase = () => {
  const currentSession = useSessionState((state) => state.currentSession)
  const { modalRef: createSessionPassphraseDialogRef } = useModalRef(CreateSessionPassphraseDialog)
  const { updateSessionPassphrase } = useUpdateSessionPassphrase()
  const { confirmPassphrase } = useConfirmPassphrase()

  const confirmOrCreatePassphrase = useCallback(
    async (options?: { ignoreCreate: boolean }) => {
      if (!currentSession?.passphrase) {
        if (options?.ignoreCreate) {
          return ''
        }
        let passkey = ''
        await createSessionPassphraseDialogRef.current.show({
          onConfirm: async (input: string) => {
            passkey = input
          },
        })
        if (!passkey) {
          throw new Error('Passphrase is required')
        }
        const keyInfo = await updateSessionPassphrase(passkey)
        if (!keyInfo) {
          throw new Error('Failed to update session passphrase')
        }
        await secureSession.set('passphrase', keyInfo.passphrase)
      } else {
        await confirmPassphrase()
      }
      return secureSession.get('passphrase')
    },
    [
      confirmPassphrase,
      createSessionPassphraseDialogRef,
      currentSession?.passphrase,
      updateSessionPassphrase,
    ],
  )

  return {
    confirmOrCreatePassphrase,
  }
}
