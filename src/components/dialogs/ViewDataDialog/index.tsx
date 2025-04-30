import { create, useModal } from '@ebay/nice-modal-react'
import { DataViewer } from 'src/components/molecules/DataViewer'
import { Dialog, DialogContent } from 'src/lib/shadcn/ui/dialog'
import { VectorDatabase } from 'src/services/database/types'

type CreateSessionProps = {
  vectorDatabase: VectorDatabase
}

const ViewDataDialog = create<CreateSessionProps>(({ vectorDatabase }) => {
  const currentModal = useModal()

  return (
    <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <DialogContent className="sm:max-w-2xl">
        <DataViewer vectorDatabase={vectorDatabase} />
      </DialogContent>
    </Dialog>
  )
})

export default ViewDataDialog
