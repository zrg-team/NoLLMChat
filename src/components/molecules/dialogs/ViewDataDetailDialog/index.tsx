import { create, useModal } from '@ebay/nice-modal-react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/lib/shadcn/ui/dialog'

type CreateSessionProps = {
  className: string
  title: string
  content: string
}

const ViewDataDetailDialog = create<CreateSessionProps>(({ title, content }) => {
  const currentModal = useModal()

  return (
    <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex">
            <LazyIcon name="file" className="mr-2 h-4 w-4" />
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="mx-auto w-full max-w-5xl min-h-96 max-h-96">
          <div className="relative w-full h-full overflow-hidden rounded-xl p-1 border border-border">
            <p className="break-all h-full overflow-y-auto bg-background font-mono text-xs w-full">
              {content}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default ViewDataDetailDialog
