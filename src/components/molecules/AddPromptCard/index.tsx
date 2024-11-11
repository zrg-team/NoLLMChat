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
import { MessageRoleEnum, PromptTypeEnum, Thread } from 'src/services/database/types'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { Button } from 'src/lib/shadcn/ui/button'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { useCreatePrompt } from 'src/hooks/mutations/use-create-prompt'
import { Label } from 'src/lib/shadcn/ui/label'

const PROMPT_TYPES = {
  [PromptTypeEnum.Chat]: {
    label: 'add_prompt_card.prompt_types.chat',
    value: PromptTypeEnum.Chat,
  },
  [PromptTypeEnum.FewShotExample]: {
    label: 'add_prompt_card.prompt_types.few_shot_example',
    value: PromptTypeEnum.FewShotExample,
  },
}
const PROMPT_ROLES = {
  [MessageRoleEnum.System]: {
    label: 'add_prompt_card.prompt_roles.system',
    value: MessageRoleEnum.System,
  },
  [MessageRoleEnum.Human]: {
    label: 'add_prompt_card.prompt_roles.human',
    value: MessageRoleEnum.Human,
  },
  [MessageRoleEnum.AI]: { label: 'add_prompt_card.prompt_roles.ai', value: MessageRoleEnum.AI },
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
    const [promptType, setPromptType] = useState<`${PromptTypeEnum}`>()
    const [promptRole, setPromptRole] = useState<`${MessageRoleEnum}`>()
    const [promptPrefix, setPromptPrefix] = useState('')

    const { t } = useTranslation('components')
    const { toast } = useToast()
    const node = useInternalNode(id)
    const { createPrompt, loading } = useCreatePrompt()

    const handleSubmit = async () => {
      if (node) {
        try {
          await createPrompt(node, {
            prefix: promptPrefix,
            content: input,
            type: promptType,
            role: promptRole,
            thread,
          })
          setInput('')
          setPromptPrefix('')
          setPromptRole(undefined)
          setPromptType(undefined)
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

    const handleOnchangePrefix = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPromptPrefix(e.target.value)
    }, [])

    const handleOnSelectType = useCallback((value: `${PromptTypeEnum}`) => {
      if (value === PromptTypeEnum.FewShotExample) {
        setInput('Question: {input}\nAnswer: {output}')
      }
      setPromptType(value)
    }, [])

    const handleOnSelectRole = useCallback((value: `${MessageRoleEnum}`) => {
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
              <Label>{t('add_prompt_card.prompt_type')}</Label>
              <Select value={promptType} onValueChange={handleOnSelectType}>
                <SelectTrigger className="tw-w-full tw-mb-4">
                  <SelectValue placeholder={t('add_prompt_card.type_select_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PROMPT_TYPES).map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {t(item.label)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <Label>{t('add_prompt_card.prompt_role')}</Label>
              <Select value={promptRole} onValueChange={handleOnSelectRole}>
                <SelectTrigger className="tw-w-full tw-mb-4">
                  <SelectValue placeholder={t('add_prompt_card.role_select_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PROMPT_ROLES).map((item) => {
                    return (
                      <SelectItem key={item.value} value={item.value}>
                        {t(item.label)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {promptType === PromptTypeEnum.FewShotExample && (
                <>
                  <Label>{t('add_prompt_card.prompt_prefix')}</Label>
                  <Textarea
                    value={promptPrefix}
                    onChange={handleOnchangePrefix}
                    disabled={false}
                    placeholder={t('add_prompt_card.placeholder')}
                    id="message"
                  />
                  <Label>{t('add_prompt_card.prompt_content')}</Label>
                  <div className="tw-w-full tw-border-0 tw-text-gray-700 tw-flex tw-text-sm tw-justify-end tw-items-center">
                    <LazyIcon name="info" className="tw-mr-2" size={14} />
                    {t('add_prompt_card.few_shot_example_note')}
                  </div>
                </>
              )}
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
