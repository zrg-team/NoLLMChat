import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'src/lib/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'src/lib/shadcn/ui/alert-dialog'

type DeleteSessionDialogProps = {
  onDelete: () => Promise<void>
}
const DeleteChatDataNodeDialog = create<DeleteSessionDialogProps>(({ onDelete }) => {
  const { t } = useTranslation('dialogs')
  const [loading, setLoading] = useState(false)
  const currentModal = useModal()
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await onDelete()
      currentModal.hide()
    } catch {
      toast({
        variant: 'destructive',
        description: t('delete_chat_data_node.errors.delete_failed'),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete_chat_data_node.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('delete_chat_data_node.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={currentModal.hide}>
            {t('delete_chat_data_node.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleSubmit}>
            {t('delete_chat_data_node.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})

export default DeleteChatDataNodeDialog
