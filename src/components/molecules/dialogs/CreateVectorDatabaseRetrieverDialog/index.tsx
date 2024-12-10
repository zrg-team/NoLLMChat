import { create, useModal } from '@ebay/nice-modal-react'
import { Node } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/lib/shadcn/ui/dialog'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Prompt } from 'src/services/database/types'
import PromptForm from 'src/components/molecules/CreatePromptCard/PromptForm'
import { useToast } from 'src/lib/hooks/use-toast'
import { useCreateVectorDatabaseRetriever } from 'src/hooks/flows/mutations/use-create-vector-database-retriever'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { useState } from 'react'

const DEFAULT_PROMPT = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}
`

type CreateVectorDatabaseRetrieverDialogProps = {
  className: string
  source: Node
}

const CreateVectorDatabaseRetrieverDialog = create<CreateVectorDatabaseRetrieverDialogProps>(
  (props) => {
    const { source } = props
    const currentModal = useModal()
    const { toast } = useToast()
    const { t } = useTranslation('dialogs')
    const [k, setK] = useState<number | undefined>(1)
    const [minimalScore, setMinimalScore] = useState<number | undefined>(undefined)
    const { loading, createVectorDatabaseRetriever } = useCreateVectorDatabaseRetriever()

    const handleSubmit = async (data: Partial<Prompt>) => {
      try {
        const content = data.content
        if (!content || !content.includes(`{context}`)) {
          toast({
            title: t('create_vector_database_retriever.errors.fill_context'),
            variant: 'destructive',
          })
          return
        }
        await createVectorDatabaseRetriever({
          source,
          prompt: {
            content: content,
          },
          metadata: {
            k,
            minimalScore,
          },
        })
        currentModal.hide()
        return true
      } catch {
        toast({
          title: t('create_vector_database_retriever.errors.create_failed'),
          variant: 'destructive',
        })
      }
    }

    const handleOnChangeK = (e: React.ChangeEvent<HTMLInputElement>) => {
      setK(e.target.value ? Number(e.target.value) : undefined)
    }

    const handleOnChangeMinimalScore = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinimalScore(e.target.value ? Number(e.target.value) : undefined)
    }

    return (
      <Dialog open={currentModal.visible} onOpenChange={currentModal.hide}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex">
              <LazyIcon name="file" className="mr-2 h-4 w-4" />
              <DialogTitle>{t('create_vector_database_retriever.title')}</DialogTitle>
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
            <Card>
              <CardHeader>
                <CardTitle>{t('create_vector_database_retriever.retriever_settings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>{t('create_vector_database_retriever.retriever_k')}</Label>
                <Input
                  value={k || ''}
                  type="number"
                  onChange={handleOnChangeK}
                  placeholder={t('create_vector_database_retriever.retriever_k_placeholder')}
                />
                <Label>{t('create_vector_database_retriever.retriever_minimum_score')}</Label>
                <Input
                  value={minimalScore || ''}
                  type="number"
                  onChange={handleOnChangeMinimalScore}
                  placeholder={t(
                    'create_vector_database_retriever.retriever_minimum_score_placeholder',
                  )}
                />
              </CardContent>
            </Card>
            <div className="w-full border-0 text-gray-700 flex text-sm items-center">
              <LazyIcon name="info" className="mr-2" size={14} />
              {t('create_vector_database_retriever.fill_content_note')}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  },
)

export default CreateVectorDatabaseRetrieverDialog
