import { memo, useCallback, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { MessageRoleEnum, Prompt, PromptTypeEnum } from 'src/services/database/types'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { PROMPT_ROLES, PROMPT_TYPES } from './constants'

const PromptForm = memo(
  ({
    defaultPromptContent,
    defaultPromptRole,
    defaultPromptType,
    hidePromptRole,
    hidePromptType,
    loading,
    onSubmit,
  }: {
    onSubmit: (prompt: Partial<Prompt>) => Promise<unknown>
    loading?: boolean
    defaultPromptType?: `${PromptTypeEnum}`
    defaultPromptRole?: `${MessageRoleEnum}`
    defaultPromptContent?: string
    hidePromptType?: boolean
    hidePromptRole?: boolean
  }) => {
    const [input, setInput] = useState(defaultPromptContent || '')
    const [promptType, setPromptType] = useState<`${PromptTypeEnum}`>(
      defaultPromptType || PromptTypeEnum.Chat,
    )
    const [promptRole, setPromptRole] = useState<`${MessageRoleEnum}` | undefined>(
      defaultPromptRole,
    )
    const [promptPrefix, setPromptPrefix] = useState('')

    const { t } = useTranslation('components')

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

    const handleSubmit = async () => {
      const result = await onSubmit({
        content: input,
        role: promptRole,
        prefix: promptPrefix,
        type: promptType,
      })
      if (!result) {
        return
      }
      setInput('')
      setPromptRole(undefined)
      setPromptType('chat')
      setPromptPrefix('')
    }

    return (
      <div>
        <div className="grid w-full gap-1.5">
          {!hidePromptType ? (
            <>
              <Label>{t('add_prompt_card.prompt_type')}</Label>
              <Select value={promptType} onValueChange={handleOnSelectType}>
                <SelectTrigger className="w-full mb-4">
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
            </>
          ) : undefined}
          {!hidePromptRole ? (
            <>
              <Label>{t('add_prompt_card.prompt_role')}</Label>
              <Select value={promptRole} onValueChange={handleOnSelectRole}>
                <SelectTrigger className="w-full mb-4">
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
            </>
          ) : undefined}
          {promptType === PromptTypeEnum.FewShotExample && (
            <>
              <Label>{t('add_prompt_card.prompt_prefix')}</Label>
              <Textarea
                value={promptPrefix}
                onChange={handleOnchangePrefix}
                disabled={false}
                className="h-20"
                placeholder={t('add_prompt_card.placeholder')}
                id="message"
              />
              <Label>{t('add_prompt_card.prompt_content')}</Label>
              <div className="w-full border-0 text-gray-700 flex text-sm justify-end items-center">
                <LazyIcon name="info" className="mr-2" size={14} />
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
        <div>
          <LoadingButton
            loading={loading}
            disabled={!input?.length}
            onClick={handleSubmit}
            className="w-full mt-4"
          >
            {t('add_prompt_card.button')}
          </LoadingButton>
        </div>
      </div>
    )
  },
)

export default PromptForm
