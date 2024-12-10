import { create, useModal } from '@ebay/nice-modal-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  cloneStandaloneSession: (name?: string) => Promise<void>
}

const CreateStandaloneApplicationDialog = create<CreateSessionProps>(
  ({ cloneStandaloneSession }) => {
    const currentModal = useModal()
    const { t } = useTranslation('dialogs')
    const [name, setName] = useState('')

    const { toast } = useToast()

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }

    const handleSubmit = async () => {
      try {
        currentModal.hide()
        await cloneStandaloneSession(name)
      } catch {
        toast({
          variant: 'destructive',
          description: t('create_standalone_application.errors.create_failed'),
        })
      }
    }

    return (
      <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('create_session.title')}</DialogTitle>
            <DialogDescription>{t('create_standalone_application.description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="mb-2" htmlFor="name">
                {t('create_standalone_application.name')}
              </Label>
              <Input
                onChange={handleChangeName}
                id="name"
                value={name}
                placeholder={t('create_standalone_application.name_placeholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} disabled={!name} type="submit">
              {t('create_standalone_application.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

export default CreateStandaloneApplicationDialog
