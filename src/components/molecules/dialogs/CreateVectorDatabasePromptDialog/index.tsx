import { create, useModal } from '@ebay/nice-modal-react'
import { Node } from '@xyflow/react'
import type { Document } from '@langchain/core/documents'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/lib/shadcn/ui/dialog'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useCreatePrompt } from 'src/hooks/flows/mutations/use-create-prompt'
import { Prompt } from 'src/services/database/types'
import PromptForm from 'src/components/molecules/CreatePromptCard/PromptForm'
import { useToast } from 'src/lib/hooks/use-toast'

const DEFAULT_PROMPT = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.

{context}
`

type CreateVectorDatabasePromptProps = {
  className: string
  source: Node
  documents: Document[]
}

const CreateVectorDatabasePromptDialog = create<CreateVectorDatabasePromptProps>((props) => {
  const { source, documents } = props
  const currentModal = useModal()
  const { toast } = useToast()
  const { t } = useTranslation('dialogs')
  const { loading, createPrompt } = useCreatePrompt()

  const handleSubmit = async (data: Partial<Prompt>) => {
    try {
      if (!data.content || !data.content.includes(`{context}`)) {
        toast({
          title: t('create_vector_database_prompt.errors.fill_context'),
          variant: 'destructive',
        })
        return
      }
      // NOTE: No need to use Prompt template because it will automatically added role prefix
      const content = data.content.replace(
        '{context}',
        documents.map((doc) => `<document>${doc.pageContent}</document>`).join('\n'),
      )
      await createPrompt(source, {
        ...data,
        content,
      })
      currentModal.hide()
      return true
    } catch {
      toast({
        title: t('create_vector_database_prompt.errors.create_failed'),
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex">
            <LazyIcon name="file" className="mr-2 h-4 w-4" />
            <DialogTitle>{t('create_vector_database_prompt.title')}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex gap-4 py-4 flex-col">
          <PromptForm
            onSubmit={handleSubmit}
            loading={loading}
            hidePromptType
            defaultPromptRole="system"
            defaultPromptContent={DEFAULT_PROMPT}
          />
          <div className="w-full border-0 text-gray-700 flex text-sm items-center">
            <LazyIcon name="info" className="mr-2" size={14} />
            {t('create_vector_database_prompt.fill_content_note')}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default CreateVectorDatabasePromptDialog
