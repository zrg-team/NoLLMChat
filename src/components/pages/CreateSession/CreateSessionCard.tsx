import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateSession } from 'src/hooks/use-create-session'
import { useToast } from 'src/lib/hooks/use-toast'
import { Input } from 'src/lib/shadcn/ui/input'
import { Label } from 'src/lib/shadcn/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { getSourceBase, SOURCE_BASES } from 'src/services/web-container/source-bases'
import { fileSystemTreeToFilePaths } from 'src/services/web-container/utils/file-tree'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'
import CreateLLMCard from 'src/components/molecules/CreateLLMCard'
import {
  EmbeddingProviderEnum,
  LLM,
  LLMModelTypeEnum,
  LLMProviderEnum,
} from 'src/services/database/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'src/lib/shadcn/ui/card'
import { ShineBorder } from 'src/lib/shadcn/magicui/shine-border'
import { LLMInfoCard } from 'src/components/molecules/LLMInfoCard/LLMInfoCard'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { useNavigate } from 'react-router-dom'
import { getRouteURL } from 'src/utils/routes'
import { logError } from 'src/utils/logger'
import { EmbeddingSetting } from 'src/components/molecules/EmbeddingSetting'
import { DEFAULT_EMBEDDING_MODEL } from 'src/constants/embedding'
import { useModal } from '@ebay/nice-modal-react'
import CreateSessionPassphraseDialog from 'src/components/dialogs/CreateSessionPassphraseDialog'
import { Textarea } from 'src/lib/shadcn/ui/textarea'

import { PRESET_AGENTS } from './constants'

const CreateSessionCard = () => {
  const { t } = useTranslation('pages')
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [agent, setAgent] = useState<string>()
  const [prompts, setPrompts] = useState<Record<string, string>>({})
  const [llm, setLLM] = useState<{
    name: string
    model_type: LLMModelTypeEnum
    function_calling: boolean
    encryptedInfo: Record<string, unknown>
    provider: `${LLMProviderEnum}`
  }>()
  const [embedding, setEmbedding] = useState<{
    provider?: `${EmbeddingProviderEnum}`
    options?: Record<string, unknown>
    encrypted?: Record<string, unknown>
  }>()
  const [sourcebase, setSourcebase] = useState<string>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const passkeyDialog = useModal(CreateSessionPassphraseDialog)

  const { toast } = useToast()
  const { loading, createSession } = useCreateSession()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setErrors((pre) => {
      delete pre['name']
      return { ...pre }
    })
  }

  const handleSubmit = async () => {
    try {
      const inputErrors: Record<string, string> = {}
      if (!agent?.trim()) {
        inputErrors['agent'] = t('create_session.errors.agent_not_found')
      }
      if (!name?.trim()) {
        inputErrors['name'] = t('create_session.errors.name_not_found')
      }
      if (!llm) {
        inputErrors['llm'] = t('create_session.errors.llm_not_found')
      }
      if (Object.keys(inputErrors).length) {
        setErrors(inputErrors)
        return
      }
      const passkey = (await passkeyDialog.show()) as string | undefined
      if (!passkey) {
        return
      }
      const fileTree = await getSourceBase(sourcebase || 'empty-source')
      const files = fileSystemTreeToFilePaths(fileTree)
      const session = await createSession(
        {
          name,
        },
        {
          files,
          passkey,
          llm,
          embedding,
          prompts,
          graph: {
            name: agent,
          },
        },
      )
      hanldeHide()
      navigate(getRouteURL('session', { id: session.id }))
    } catch (e) {
      logError('[CreateSessionCard] submit', e)
      toast({
        variant: 'destructive',
        description: t('create_session.errors.create_failed'),
      })
    }
  }

  const hanldeHide = () => {
    setName('')
    setEmbedding(undefined)
    setLLM(undefined)
    setSourcebase(undefined)
    setAgent(undefined)
    setPrompts({})
  }

  const handleSetEmbeddingOptions = async (data: {
    provider?: `${EmbeddingProviderEnum}`
    options?: Record<string, unknown>
    encrypted?: Record<string, unknown>
  }) => {
    setErrors((pre) => {
      delete pre['embedding']
      return { ...pre }
    })
    setEmbedding(data)
  }

  const handleSetLLm = (input: {
    name: string
    model_type: LLMModelTypeEnum
    function_calling: boolean
    encryptedInfo: Record<string, unknown>
    provider: `${LLMProviderEnum}`
  }) => {
    setErrors((pre) => {
      delete pre['llm']
      return { ...pre }
    })
    setLLM(input)
  }

  let modelName = DEFAULT_EMBEDDING_MODEL
  switch (`${embedding?.provider}`) {
    case LLMProviderEnum.OpenAI:
      modelName = 'text-embedding-3-small'
      break
    case LLMProviderEnum.GoogleGenerativeAI:
      modelName = 'text-embedding-004'
      break
  }

  return (
    <Card className="relative">
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      <CardHeader>
        <CardTitle>{t('create_session.title')}</CardTitle>
        <CardDescription>{t('create_session.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 pt-4">
          <div className="flex flex-col space-y-1.5">
            <Label className="mb-2" htmlFor="name">
              {t('create_session.name')}
            </Label>
            <Input
              disabled={loading}
              onChange={handleChangeName}
              id="name"
              value={name}
              placeholder={t('create_session.name_placeholder')}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="mb-2" htmlFor="name">
              {t('create_session.source_base.title')}
            </Label>
            <Select disabled={loading} onValueChange={(value) => setSourcebase(value)}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue
                  placeholder={t('create_session.source_base.source_base_select_placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_BASES.map((key) => {
                  return (
                    <SelectItem key={`${key}`} value={`${key}`}>
                      {t(`create_session.source_base.sourcebases.${key.toLowerCase()}`)}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col space-y-0">
          <Accordion disabled={loading} defaultValue="llm" type="single" collapsible>
            <AccordionItem value="llm">
              <AccordionTrigger>{t('create_session.config.llm.title')}</AccordionTrigger>
              <AccordionContent>
                {llm ? (
                  <LLMInfoCard
                    llm={{
                      ...(llm as unknown as LLM),
                    }}
                    readonly
                    className="w-full h-auto rounded-none border-none !bg-inherit !text-current"
                  />
                ) : (
                  <CreateLLMCard
                    noHeader
                    cardBodyClassName="p-0 pb-4"
                    className="w-full h-auto rounded-none border-none !bg-inherit !text-current"
                    cardFooterClassName="p-0 pt-4"
                    onCreate={handleSetLLm}
                    buttonTitle={t('create_session.config.llm.save')}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="embedding">
              <AccordionTrigger>{t('create_session.config.embedding.title')}</AccordionTrigger>
              <AccordionContent>
                {embedding ? (
                  <p>
                    {modelName} ({embedding.provider})
                  </p>
                ) : (
                  <EmbeddingSetting
                    supportedProviders={[
                      LLMProviderEnum.OpenAI,
                      LLMProviderEnum.GoogleGenerativeAI,
                    ]}
                    onChangeOptions={handleSetEmbeddingOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="agent">
              <AccordionTrigger>{t('create_session.agent.title')}</AccordionTrigger>
              <AccordionContent>
                <Select
                  disabled={loading}
                  value={agent}
                  onValueChange={(value) => {
                    setAgent(value)
                    setPrompts(PRESET_AGENTS[value as keyof typeof PRESET_AGENTS].prompst)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('create_session.agent.agent_select_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {t('create_session.agent.agent_select_placeholder')}
                      </SelectLabel>
                      {Object.keys(PRESET_AGENTS).map((key) => {
                        return (
                          <SelectItem key={key} value={key}>
                            {t(`create_session.agent.agents.${key}`)}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {PRESET_AGENTS[agent as keyof typeof PRESET_AGENTS]
                  ? Object.keys(PRESET_AGENTS[agent as keyof typeof PRESET_AGENTS].prompst).map(
                      (key) => {
                        return (
                          <div key={key} className="flex flex-col space-y-1.5 mt-4">
                            <Label className="mb-2" htmlFor={key}>
                              {t(`create_session.agent.prompts.${key}`)}
                            </Label>
                            <Textarea
                              disabled={loading}
                              value={
                                prompts[key] ||
                                PRESET_AGENTS[agent as keyof typeof PRESET_AGENTS].prompst[key]
                              }
                              onChange={(e) =>
                                setPrompts((pre) => {
                                  return {
                                    ...pre,
                                    [key]: e.target.value,
                                  }
                                })
                              }
                              className="h-28"
                            />
                          </div>
                        )
                      },
                    )
                  : undefined}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start gap-1">
        {Object.values(errors)?.length
          ? Object.values(errors).map((error) => (
              <div key={error} className="text-red-500">
                * {error}
              </div>
            ))
          : null}
        <LoadingButton onClick={handleSubmit} disabled={loading} loading={loading}>
          {t('create_session.create')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}

export default CreateSessionCard
