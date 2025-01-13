import { NiceModalHandler, NiceModalHocProps } from '@ebay/nice-modal-react'
import { SessionPassphraseDialogProps } from 'src/components/molecules/dialogs/SessionPassphraseDialog'
import secureSession from 'src/utils/secure-session'
import { decryptSymmetric, encryptSymmetric } from 'src/utils/aes'

export const encryptData = async (encryptedInfo: Record<string, string>, passphrase: string) => {
  const parameters: Record<string, string> = {}
  await Promise.all(
    Object.entries(encryptedInfo || {}).map(async ([key, value]) => {
      const encrypted = await encryptSymmetric(value, passphrase)
      parameters[key] = encrypted
    }),
  )
  return parameters
}

export const decryptData = async (encryptedInfo: Record<string, string>, passphrase: string) => {
  const parameters: Record<string, string> = {}
  await Promise.all(
    Object.entries(encryptedInfo || {}).map(async ([key, value]) => {
      const decrypted = await decryptSymmetric(value, passphrase)
      parameters[key] = decrypted
    }),
  )
  return parameters
}

export const passphraseConfirm = async (
  rawPassphrase: string,
  sessionPassphraseDialog: Omit<NiceModalHandler<Record<string, unknown>>, 'show'> & {
    show: (
      args?: Partial<SessionPassphraseDialogProps & NiceModalHocProps> | undefined,
    ) => Promise<unknown>
  },
) => {
  let passphrase: string | undefined
  await new Promise((resolve, reject) => {
    sessionPassphraseDialog.show({
      onConfirm: async (passkey) => {
        try {
          passphrase = await decryptSymmetric(rawPassphrase, passkey)
          await secureSession.set('passphrase', passphrase)
          resolve(true)
        } catch (error) {
          reject(error)
        } finally {
          sessionPassphraseDialog.hide()
        }
      },
      onCancel: () => {
        reject()
      },
    })
  })
  if (!passphrase) {
    throw new Error('Passphrase is required')
  }
  return passphrase
}
