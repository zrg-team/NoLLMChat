import { memo, useCallback, useState } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useToast } from 'src/lib/hooks/use-toast'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { MessageRoleEnum, Thread } from 'src/services/database/types'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { Button } from 'src/lib/shadcn/ui/button'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { useCreatePrompt } from 'src/hooks/mutations/use-create-prompt'

const PROMPT_TYPE = {
  [MessageRoleEnum.System]: {
    label: 'add_prompt_card.prompt_types.system',
    value: MessageRoleEnum.System,
  },
  [MessageRoleEnum.Human]: {
    label: 'add_prompt_card.prompt_types.human',
    value: MessageRoleEnum.Human,
  },
  [MessageRoleEnum.AI]: { label: 'add_prompt_card.prompt_types.ai', value: MessageRoleEnum.AI },
}
const AddPromptCard = memo(
  (
    props: Omit<NodeProps, 'data'> & {
      data?: { ready?: boolean }
      thread?: Thread
      setDialog?: (value: boolean) => void
    },
  ) => {
    const { id, thread, setDialog } = props
    const [input, setInput] = useState('')
    const [promptRole, setPromptRole] = useState<`${MessageRoleEnum}`>()

    const { t } = useTranslation('components')
    const { toast } = useToast()
    const node = useInternalNode(id)
    const { createPrompt, loading } = useCreatePrompt()

    const handleSubmit = async () => {
      if (node) {
        try {
          await createPrompt(node, input, {
            promptRole,
            thread,
          })
          setInput('')
          setPromptRole(undefined)
          setDialog?.(false)
        } catch (error) {
          toast({
            title: `${error}`,
          })
        }
      }
    }

    const handleOnchange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
    }, [])

    const handleOnSelect = useCallback((value: `${MessageRoleEnum}`) => {
      setPromptRole(value)
    }, [])

    return (
      <div>
        <Card className="tw-mw-full">
          <CardHeader>
            <CardTitle>{t('add_prompt_card.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tw-grid tw-w-full tw-gap-1.5">
              <Select onValueChange={handleOnSelect}>
                <SelectTrigger className="tw-w-full">
                  <SelectValue placeholder={t('add_prompt_card.select_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PROMPT_TYPE).map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {t(item.label)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <Textarea
                value={input}
                onChange={handleOnchange}
                disabled={false}
                placeholder={t('add_prompt_card.placeholder')}
                id="message"
              />
            </div>
          </CardContent>
          <CardFooter className="tw-flex tw-justify-between">
            <Button onClick={handleSubmit} disabled={!input?.length} className="tw-w-full">
              {loading ? (
                <LazyIcon name="loader-circle" className="tw-animate-spin" />
              ) : (
                t('add_prompt_card.button')
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  },
)

export default AddPromptCard
