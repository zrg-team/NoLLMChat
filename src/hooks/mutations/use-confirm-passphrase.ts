import { useCallback } from 'react'
import { useSessionState } from 'src/states/session'
import secureSession from 'src/utils/secure-session'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'
import { useModalRef } from 'src/hooks/use-modal-ref'
import { decryptSymmetric } from 'src/utils/aes'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'

export const useConfirmPassphrase = () => {
  const { toast } = useToast()
  const { t } = useTranslation('errors')
  const currentSession = useSessionState((state) => state.currentSession)
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  const confirmPassphrase = useCallback(async () => {
    if (!currentSession?.passphrase) {
      throw new Error('Session is not found')
    }
    const passphraseExisted = await secureSession.exists('passphrase')
    if (!passphraseExisted) {
      await new Promise<void>((resolve, reject) => {
        sessionPassphraseDialogRef.current.show({
          onConfirm: async (passkey) => {
            try {
              const result = await decryptSymmetric(currentSession.passphrase!, passkey)
              await secureSession.set('passphrase', result)
              resolve()
            } catch (error) {
              toast({
                content: t('invalid_passphrase'),
                variant: 'destructive',
              })
              reject(error)
            } finally {
              sessionPassphraseDialogRef.current.hide()
            }
          },
          onCancel: () => {
            reject()
          },
        })
      })
    }
  }, [currentSession?.passphrase, sessionPassphraseDialogRef, t, toast])

  return {
    confirmPassphrase,
  }
}
