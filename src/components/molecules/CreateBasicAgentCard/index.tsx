import { memo } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useToast } from 'src/lib/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Thread } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { useCreateBasicAgent } from 'src/hooks/flows/mutations/use-create-basic-agent'

import BasicAgentForm from './BasicAgentForm'

const CreateBasicAgentCard = memo(
  (
    props: Omit<NodeProps, 'data'> & {
      data?: { ready?: boolean }
      thread?: Thread
      setDialog?: (value: boolean) => void
    },
  ) => {
    const { id, setDialog } = props

    const { t } = useTranslation('components')
    const { toast } = useToast()
    const node = useInternalNode(id)
    const { createBasicAgent, loading } = useCreateBasicAgent()

    const handleSubmit = async (data: {
      name: string
      description: string
      system_prompt: string
      max_iterations: number
    }) => {
      if (node) {
        try {
          if (!data?.name?.trim()) {
            throw new Error('Agent name is required')
          }
          await createBasicAgent(node, {
            name: data.name,
            description: data.description,
            system_prompt: data.system_prompt,
            max_iterations: data.max_iterations,
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
          <CardTitle>{t('add_basic_agent_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BasicAgentForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>
    )
  },
)

export default CreateBasicAgentCard
