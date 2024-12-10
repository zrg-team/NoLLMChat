import { memo } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useToast } from 'src/lib/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Prompt, Thread } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { useCreatePrompt } from 'src/hooks/flows/mutations/use-create-prompt'

import PromptForm from './PromptForm'

const CreatePromptCard = memo(
  (
    props: Omit<NodeProps, 'data'> & {
      data?: { ready?: boolean }
      thread?: Thread
      setDialog?: (value: boolean) => void
    },
  ) => {
    const { id, thread, setDialog } = props

    const { t } = useTranslation('components')
    const { toast } = useToast()
    const node = useInternalNode(id)
    const { createPrompt, loading } = useCreatePrompt()

    const handleSubmit = async (data: Partial<Prompt>) => {
      if (node) {
        try {
          if (!data?.content) {
            throw new Error('Prompt data is missing')
          }
          await createPrompt(node, {
            ...data,
            content: data.content,
            thread,
          })
          setDialog?.(false)
        } catch (error) {
          toast({
            variant: 'destructive',
            title: `${error}`,
          })
        }
      }
    }

    return (
      <Card className="mw-full">
        <CardHeader>
          <CardTitle>{t('add_prompt_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <PromptForm
            onSubmit={handleSubmit}
            loading={loading}
            defaultPromptRole="system"
            defaultPromptType="chat"
          />
        </CardContent>
      </Card>
    )
  },
)

export default CreatePromptCard
