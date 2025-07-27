import { memo, useCallback, useState } from 'react'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { Input } from 'src/lib/shadcn/ui/input'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import LoadingButton from 'src/components/atoms/LoadingButton'

interface BasicAgentFormData {
  name: string
  description: string
  system_prompt: string
  max_iterations: number
}

const DEFAULT_SYSTEM_PROMPT = `You are helpful agents.
Use tools to solve user requirement.`

const BasicAgentForm = memo(
  ({
    loading,
    onSubmit,
  }: {
    onSubmit: (data: BasicAgentFormData) => Promise<unknown>
    loading?: boolean
  }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)
    const [maxIterations, setMaxIterations] = useState(10)

    const { t } = useTranslation('components')

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }, [])

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value)
    }, [])

    const handleSystemPromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSystemPrompt(e.target.value)
    }, [])

    const handleMaxIterationsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10)
      if (!isNaN(value) && value > 0) {
        setMaxIterations(value)
      }
    }, [])

    const handleSubmit = async () => {
      if (!name.trim()) {
        return
      }

      const result = await onSubmit({
        name,
        description,
        system_prompt: systemPrompt,
        max_iterations: maxIterations,
      })

      if (result) {
        setName('')
        setDescription('')
        setSystemPrompt(DEFAULT_SYSTEM_PROMPT)
        setMaxIterations(10)
      }
    }

    return (
      <div>
        <div className="grid w-full gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">{t('add_basic_agent_card.name')} *</Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder={t('add_basic_agent_card.name_placeholder')}
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description">{t('add_basic_agent_card.description')}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder={t('add_basic_agent_card.description_placeholder')}
              className="h-20"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="system_prompt">{t('add_basic_agent_card.system_prompt')}</Label>
            <Textarea
              id="system_prompt"
              value={systemPrompt}
              onChange={handleSystemPromptChange}
              placeholder={t('add_basic_agent_card.system_prompt_placeholder')}
              className="h-32"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="max_iterations">{t('add_basic_agent_card.max_iterations')}</Label>
            <Input
              id="max_iterations"
              type="number"
              min="1"
              value={maxIterations}
              onChange={handleMaxIterationsChange}
              placeholder="10"
            />
          </div>
        </div>

        <div>
          <LoadingButton
            loading={loading}
            disabled={!name.trim()}
            onClick={handleSubmit}
            className="w-full mt-4"
          >
            {t('add_basic_agent_card.button')}
          </LoadingButton>
        </div>
      </div>
    )
  },
)

export default BasicAgentForm
