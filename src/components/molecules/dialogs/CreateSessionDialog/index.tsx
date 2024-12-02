import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateSession } from 'src/hooks/mutations/use-create-session'
import { useToast } from 'src/lib/hooks/use-toast'
import { Button } from 'src/lib/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/lib/shadcn/ui/dialog'
import { Input } from 'src/lib/shadcn/ui/input'
import { Label } from 'src/lib/shadcn/ui/label'

type CreateSessionProps = {
  className: string
}

const CreateSessionDialog = create<CreateSessionProps>(() => {
  const currentModal = useModal()
  const { t } = useTranslation('dialogs')
  const [name, setName] = useState('')

  const { toast } = useToast()
  const { loading, createSession } = useCreateSession()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      await createSession({
        name,
      })
      currentModal.hide()
    } catch {
      toast({
        variant: 'destructive',
        description: t('create_session.errors.create_failed'),
      })
    }
  }

  return (
    <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('create_session.title')}</DialogTitle>
          <DialogDescription>{t('create_session.description')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-1.5">
            <Label className="mb-2" htmlFor="name">
              {t('create_session.name')}
            </Label>
            <Input
              onChange={handleChangeName}
              id="name"
              value={name}
              placeholder={t('create_session.name_placeholder')}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || !name} type="submit">
            {t('create_session.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default CreateSessionDialog
