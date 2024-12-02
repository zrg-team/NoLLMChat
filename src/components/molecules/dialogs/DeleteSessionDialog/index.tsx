import { create, useModal } from '@ebay/nice-modal-react'
import { useTranslation } from 'react-i18next'
import { useDeleteSession } from 'src/hooks/mutations/use-delete-session'
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
  id: string
}
const DeleteSessionDialog = create<DeleteSessionDialogProps>(({ id }) => {
  const { t } = useTranslation('dialogs')
  const currentModal = useModal()
  const { toast } = useToast()
  const { deleteSession } = useDeleteSession()

  const handleSubmit = async () => {
    try {
      await deleteSession(id)
      currentModal.hide()
    } catch {
      toast({
        variant: 'destructive',
        description: t('delete_session.errors.delete_failed'),
      })
    }
  }

  return (
    <AlertDialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete_session.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('delete_session.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={currentModal.hide}>
            {t('delete_session.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>{t('delete_session.delete')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
})

export default DeleteSessionDialog
