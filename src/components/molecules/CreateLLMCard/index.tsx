import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useCreateLLM } from 'src/hooks/flows/mutations/use-create-llm'
import { NodeProps, useInternalNode } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent } from 'src/lib/shadcn/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import LLMIcon from 'src/components/atoms/LLMIcon'
import type { ModelRecord } from '@mlc-ai/web-llm'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'src/lib/shadcn/ui/command'
import { LLMModelTypeEnum, LLMProviderEnum } from 'src/services/database/types'
import { useLocalLLMState } from 'src/services/local-llm'
import { useToast } from 'src/lib/hooks/use-toast'
import { Label } from 'src/lib/shadcn/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { RECOMMENDATION_LOCAL_LLMS } from 'src/constants/local-llm'
import { LLMInfo } from 'src/components/atoms/LLMInfo'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { Alert } from 'src/lib/shadcn/ui/alert'
import { Input } from 'src/lib/shadcn/ui/input'
import { logError } from 'src/utils/logger'
import { useSessionState } from 'src/states/session'
import { encryptData } from 'src/utils/passphrase'
import { Checkbox } from 'src/lib/shadcn/ui/checkbox'
import {
  GROQ_API_KEY_LINK,
  GROQ_MODELS,
  GROQ_VISION_MODELS,
  OPEN_AI_API_KEY_LINK,
  OPEN_AI_MODELS,
  GOOGLE_GENERATIVE_AI_API_KEY_LINK,
  GOOGLE_GENERATIVE_AI_MODELS,
} from 'src/constants/llm'

import { SUPPORTED_PROVIDERS } from './constants'
import { useConfirmOrCreatePassphrase } from 'src/hooks/mutations/use-confirm-or-create-passphrase'

function CreateLLMCard(props: NodeProps & { setDialog?: (value: boolean) => void }) {
  const { id, setDialog } = props
  const { t } = useTranslation('components')
  const { toast } = useToast()
  const node = useInternalNode(id)
  const [loading, setLoading] = useState(false)
  const [modelId, setModelId] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [encryptedInfo, setEncryptedInfo] = useState<Record<string, string>>()
  const [provider, setProvider] = useState<`${LLMProviderEnum}`>(LLMProviderEnum.WebLLM)
  const [hasCache, setHasCache] = useState(false)
  const [llmsInfo, setLLMsInfo] = useState<{
    input?: string
    modelList: ModelRecord[]
    functionCallingModelIds: string[]
  }>()
  const llmInfoRef = useRef<{
    input?: string
    modelList: ModelRecord[]
    functionCallingModelIds: string[]
  }>()
  const currentSession = useSessionState((state) => state.currentSession)
  const syncCachedLLMURLs = useLocalLLMState((state) => state.syncCachedLLMURLs)
  const cachedLLMURLs = useLocalLLMState((state) => state.cachedLLMURLs)
  const { loading: creatingLLM, createLLM } = useCreateLLM()

  llmInfoRef.current = llmsInfo

  const { confirmOrCreatePassphrase } = useConfirmOrCreatePassphrase()

  useEffect(() => {
    syncCachedLLMURLs()
  }, [syncCachedLLMURLs])

  const isRequiredSessionPasskey = useMemo(() => {
    if (!modelId) return false
    return ![LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(provider as LLMProviderEnum)
  }, [modelId, provider])

  const modelList = useMemo(() => {
    if (!llmsInfo?.functionCallingModelIds || !llmsInfo?.modelList) return []

    const data = !search
      ? llmsInfo?.modelList
      : llmsInfo?.modelList.filter((model) =>
          model.model_id.toLowerCase().includes(search.toLowerCase()),
        )

    return (data || []).sort((pre, next) => {
      // Check if models are in cachedLLMURLs
      const preInCache = cachedLLMURLs.some((item) => item.includes(pre.model_id))
      const nextInCache = cachedLLMURLs.some((item) => item.includes(next.model_id))

      // Prioritize models in cachedLLMURLs
      if (preInCache && !nextInCache) {
        return -1
      }
      if (!preInCache && nextInCache) {
        return 1
      }

      const preInRecommended = RECOMMENDATION_LOCAL_LLMS.includes(pre.model_id)
      const nextInRecommended = RECOMMENDATION_LOCAL_LLMS.includes(next.model_id)

      // Prioritize models in RECOMMENDATION_LOCAL_LLMS
      if (preInRecommended && !nextInRecommended) {
        return -1
      }
      if (!preInRecommended && nextInRecommended) {
        return 1
      }

      // Check if models are in functionCallingModelIds
      const preInFunctionCalling = llmsInfo?.functionCallingModelIds.includes(pre.model_id)
      const nextInFunctionCalling = llmsInfo?.functionCallingModelIds.includes(next.model_id)

      // Prioritize models in functionCallingModelIds
      if (preInFunctionCalling && !nextInFunctionCalling) {
        return -1
      }
      if (!preInFunctionCalling && nextInFunctionCalling) {
        return 1
      }

      // Compare buffer_size_required_bytes
      if (
        pre.vram_required_MB &&
        next.vram_required_MB &&
        pre.vram_required_MB !== next.vram_required_MB
      ) {
        return pre.vram_required_MB - next.vram_required_MB
      }

      return pre.model_id.localeCompare(next.model_id)
    })
  }, [llmsInfo?.modelList, llmsInfo?.functionCallingModelIds, search, cachedLLMURLs])

  const selectedModel = useMemo<ModelRecord | undefined>(() => {
    if (!modelId) return

    switch (provider) {
      case LLMProviderEnum.Wllama:
        return llmsInfo?.modelList.find((model) => model.model_id === modelId)
      case LLMProviderEnum.WebLLM:
        return llmsInfo?.modelList && modelList.find((model) => model.model_id === modelId)
      case LLMProviderEnum.Groq:
        setEncryptedInfo({})
        return {
          model: modelId,
          model_id: modelId,
          model_type: GROQ_VISION_MODELS.includes(modelId) ? 2 : 0,
          overrides: {},
        } as ModelRecord
      case LLMProviderEnum.OpenAI:
        setEncryptedInfo({})
        return {
          model: modelId,
          model_id: modelId,
          model_type: 2,
          overrides: {},
        } as ModelRecord
      case LLMProviderEnum.GoogleGenerativeAI:
        setEncryptedInfo({})
        return {
          model: modelId,
          model_id: modelId,
          model_type: 2,
          overrides: {},
        } as ModelRecord
    }
  }, [modelId, llmsInfo?.modelList, modelList, provider])

  useEffect(() => {
    if (!selectedModel?.model_id || !cachedLLMURLs) return

    setHasCache(cachedLLMURLs.some((item) => item.includes(selectedModel.model_id)))
  }, [cachedLLMURLs, selectedModel?.model_id])
  useEffect(() => {
    if (!currentSession?.id) return

    setProvider(LLMProviderEnum.WebLLM)
    setModelId('')
    setSearch('')
    setEncryptedInfo({})
  }, [currentSession?.id])

  const handleOnchange = useCallback((currentValue: string) => {
    setModelId(currentValue)
    setOpen(false)
  }, [])
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])
  const handleOnSelectProvider = useCallback((value: `${LLMProviderEnum}`) => {
    setProvider(value)
    setModelId('')
    setSearch('')
    setEncryptedInfo({})
  }, [])
  const hanldeSubmit = async () => {
    if (!node || !currentSession) return
    try {
      setLoading(true)
      let encrypted: Record<string, unknown> | undefined

      if (isRequiredSessionPasskey) {
        const passphrase = await confirmOrCreatePassphrase()
        if (!passphrase) {
          throw new Error('Passphrase is not found')
        }
        encrypted = await encryptData(encryptedInfo || {}, passphrase)
      }
      await createLLM(node, {
        name: modelId,
        model_type: modelTypeToLLMType(selectedModel?.model_type),
        function_calling: selectedModel?.model_id
          ? llmsInfo?.functionCallingModelIds?.includes(selectedModel?.model_id)
          : false,
        encrypted,
        provider,
      })
      setDialog?.(false)
    } catch (error) {
      logError('Create LLM', error)
      toast({
        variant: 'destructive',
        description: t('add_llm_card.errors.failed_to_create'),
      })
    } finally {
      setLoading(false)
      setProvider(LLMProviderEnum.WebLLM)
      setEncryptedInfo({})
      setModelId('')
      setSearch('')
    }
  }

  useLayoutEffect(() => {
    const getModelInfo = async () => {
      try {
        if (provider === LLMProviderEnum.Wllama) {
          const [username, repo] = modelId?.split('/') || []
          const repoInfo = `${username}/${repo}`
          if (!modelId || !username || !repo) {
            setLLMsInfo({
              modelList: [],
              functionCallingModelIds: [],
            })
            return
          } else if (llmInfoRef.current?.input === repoInfo) {
            return
          }
          const res = await fetch(`https://huggingface.co/api/models/${repoInfo}`)
          const data: { siblings?: { rfilename: string }[] } = await res.json()
          if (data.siblings) {
            setLLMsInfo({
              input: repoInfo,
              modelList: data.siblings
                .map((s) => s.rfilename)
                .filter((f) => f.endsWith('.gguf'))
                .map((item) => {
                  return {
                    model_id: `${repoInfo}/${item}`,
                    model: `${repoInfo}/${item}`,
                    model_lib: `${repoInfo}/${item}`,
                    model_type: 0,
                    overrides: {},
                  }
                }),
              functionCallingModelIds: [],
            })
          } else {
            setLLMsInfo({
              modelList: [],
              functionCallingModelIds: [],
            })
          }
        } else if (provider === LLMProviderEnum.WebLLM) {
          import('@mlc-ai/web-llm').then(async ({ functionCallingModelIds, prebuiltAppConfig }) => {
            const modelList = prebuiltAppConfig.model_list
            setLLMsInfo({ modelList, functionCallingModelIds })
          })
        }
      } catch {
        // TODO: handle error
      }
    }
    getModelInfo()
  }, [provider, modelId])

  const modelTypeToLLMType = useCallback((modelType?: unknown) => {
    if (modelType === 1) {
      return LLMModelTypeEnum.embedding
    }
    if (modelType === 2) {
      return LLMModelTypeEnum.VLM
    }
    return LLMModelTypeEnum.LLM
  }, [])

  const modelItems = useMemo(() => {
    switch (provider) {
      case LLMProviderEnum.Wllama:
      case LLMProviderEnum.WebLLM:
        return modelList.map((model) => (
          <CommandItem key={model.model_id} value={model.model_id} onSelect={handleOnchange}>
            {modelId === model.model_id ? (
              <LazyIcon name="check" className={'mr-2 h-4 w-4'} />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
            <span className="max-w-md">
              <div className="flex gap-2 mb-2">
                <LLMIcon name={model.model_id} />
                {model.model_id}
              </div>
              <div className="flex max-w-full flex-wrap gap-1">
                <LLMInfo
                  model={model}
                  isFunctionCalling={
                    llmsInfo?.functionCallingModelIds?.includes(model.model_id) || false
                  }
                  name={model.model_id}
                  isCached={cachedLLMURLs.some((item) => item.includes(model.model_id)) || false}
                  cloud={provider !== LLMProviderEnum.WebLLM}
                />
              </div>
            </span>
          </CommandItem>
        ))
      case LLMProviderEnum.OpenAI:
        return OPEN_AI_MODELS.map((model) => {
          return (
            <CommandItem key={model} value={model} onSelect={handleOnchange}>
              {modelId === model ? (
                <LazyIcon name="check" className={'h-4 w-4'} />
              ) : (
                <div className="w-4" />
              )}
              <span className="max-w-md">
                <div className="flex gap-3">
                  <LLMIcon name={model} />
                  {model}
                </div>
              </span>
            </CommandItem>
          )
        })
      case LLMProviderEnum.GoogleGenerativeAI:
        return GOOGLE_GENERATIVE_AI_MODELS.map((model) => {
          return (
            <CommandItem key={model} value={model} onSelect={handleOnchange}>
              {modelId === model ? (
                <LazyIcon name="check" className={'h-4 w-4'} />
              ) : (
                <div className="w-4" />
              )}
              <span className="max-w-md">
                <div className="flex gap-3">
                  <LLMIcon name={model} />
                  {model}
                </div>
              </span>
            </CommandItem>
          )
        })
      case LLMProviderEnum.Groq:
        return GROQ_MODELS.map((model) => {
          return (
            <CommandItem key={model} value={model} onSelect={handleOnchange}>
              {modelId === model ? (
                <LazyIcon name="check" className={'h-4 w-4'} />
              ) : (
                <div className="w-4" />
              )}
              <span className="max-w-md">
                <div className="flex gap-3">
                  <LLMIcon name={model} />
                  {model}
                </div>
              </span>
            </CommandItem>
          )
        })
    }
    return
  }, [
    cachedLLMURLs,
    handleOnchange,
    modelId,
    llmsInfo?.functionCallingModelIds,
    modelList,
    provider,
  ])

  const modelSelection = useMemo(() => {
    if (provider === LLMProviderEnum.Wllama) {
      const [username, repo] = modelId?.split('/') || []
      return (
        <>
          <Alert variant="default" className="mb-4">
            {t('add_llm_card.wllama_description')}
          </Alert>
          <Label>{t('add_llm_card.hugging_face_repo')}</Label>
          {username && repo ? (
            <div className="relative">
              <Input
                value={`${username}/${repo}`}
                disabled
                placeholder={t('add_llm_card.hugging_face_repo_placeholder')}
              />
              <LazyIcon
                onClick={() => setModelId('')}
                name="x"
                className="h-4 w-4 absolute right-3 top-3 cursor-pointer"
              />
            </div>
          ) : (
            <Input
              value={username ? `${username}/${repo}` : ''}
              onChange={(e) => setModelId(e.target.value)}
              placeholder={t('add_llm_card.hugging_face_repo_placeholder')}
            />
          )}
          <Label>{t('add_llm_card.model_name')}</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={!username || !repo}
                className="w-full justify-between max-w-full overflow-hidden"
              >
                {modelId && selectedModel
                  ? selectedModel?.model_id
                  : t('add_llm_card.select_model_placeholder')}
                <LazyIcon name="chevrons-up-down" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  onValueChange={handleSearchChange}
                  placeholder={t('add_llm_card.search_placeholder')}
                />
                <CommandList>
                  <CommandEmpty>{t('add_llm_card.no_model')}</CommandEmpty>
                  <CommandGroup>{modelItems}</CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      )
    }
    return (
      <>
        <Label>{t('add_llm_card.model_name')}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {modelId ? selectedModel?.model_id : t('add_llm_card.select_model_placeholder')}
              <LazyIcon name="chevrons-up-down" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                onValueChange={handleSearchChange}
                placeholder={t('add_llm_card.search_placeholder')}
              />
              <CommandList>
                <CommandEmpty>{t('add_llm_card.no_model')}</CommandEmpty>
                <CommandGroup>{modelItems}</CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </>
    )
  }, [modelId, provider, modelItems, open, setOpen, handleSearchChange])

  const encryptedFields = useMemo(() => {
    if (!isRequiredSessionPasskey) return undefined

    switch (provider) {
      case LLMProviderEnum.Groq:
      case LLMProviderEnum.OpenAI:
        return (
          <>
            <Alert variant="destructive" className="mt-4">
              {t('add_llm_card.alert.session_passkey')}
            </Alert>
            <div className="mt-4">
              <Label>{t('add_llm_card.encrypted_fields.api_key')}</Label>
              <Button variant="link" className="px-1">
                <a
                  href={
                    provider === LLMProviderEnum.OpenAI ? OPEN_AI_API_KEY_LINK : GROQ_API_KEY_LINK
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  ({provider === LLMProviderEnum.OpenAI ? OPEN_AI_API_KEY_LINK : GROQ_API_KEY_LINK})
                </a>
              </Button>
              <Input
                type="password"
                value={encryptedInfo?.key || ''}
                onChange={(e) =>
                  setEncryptedInfo((pre) => ({
                    ...pre,
                    key: e.target.value,
                  }))
                }
              />
            </div>
          </>
        )
      case LLMProviderEnum.GoogleGenerativeAI:
        return (
          <>
            <Alert variant="destructive" className="mt-4">
              {t('add_llm_card.alert.session_passkey')}
            </Alert>
            <div className="mt-4">
              <Label>{t('add_llm_card.encrypted_fields.api_key')}</Label>
              <Button variant="link" className="px-1">
                <a href={GOOGLE_GENERATIVE_AI_API_KEY_LINK} target="_blank" rel="noreferrer">
                  ({GOOGLE_GENERATIVE_AI_API_KEY_LINK})
                </a>
              </Button>
              <Input
                type="password"
                value={encryptedInfo?.key || ''}
                onChange={(e) =>
                  setEncryptedInfo((pre) => ({
                    ...pre,
                    key: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mt-4 flex items-center">
              <Label>{t('add_llm_card.encrypted_fields.enabled_google_search_retreival')}</Label>
              <Checkbox
                checked={!!encryptedInfo?.enabled_google_search_retreival}
                className="ml-2"
                onCheckedChange={(e) => {
                  setEncryptedInfo((pre) => ({
                    ...pre,
                    enabled_google_search_retreival: !e ? '' : `true`,
                  }))
                }}
              />
            </div>
          </>
        )
    }
  }, [isRequiredSessionPasskey, provider, t, encryptedInfo])

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{t('add_llm_card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label>{t('add_llm_card.provider')}</Label>
          <Select value={provider} onValueChange={handleOnSelectProvider}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder={t('add_llm_card.provider_select_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(SUPPORTED_PROVIDERS).map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {t(`add_llm_card.providers.${item.toLowerCase()}`)}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {modelSelection}
        </div>
        {selectedModel ? (
          <div className="mt-4">
            <div className="mt-4 text-sm text-muted-foreground center flex max-w-full flex-wrap gap-1">
              <LLMIcon name={selectedModel.model_id} className="mr-2" />
              <LLMInfo
                model={selectedModel}
                isFunctionCalling={
                  llmsInfo?.functionCallingModelIds?.includes(selectedModel.model_id) || false
                }
                name={selectedModel.model_id}
                isCached={
                  cachedLLMURLs.some((item) => item.includes(selectedModel.model_id)) || false
                }
                cloud={
                  ![LLMProviderEnum.WebLLM, LLMProviderEnum.Wllama].includes(
                    provider as LLMProviderEnum,
                  )
                }
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="font-bold mr-2">{t('add_llm_card.model_url')}</span>
              {selectedModel.model}
            </div>
            {selectedModel.model_lib ? (
              <div className="mt-2 text-sm text-muted-foreground center flex">
                <span className="font-bold mr-2">{t('add_llm_card.model_lib_url')}</span>
                {selectedModel.model_lib}
              </div>
            ) : undefined}
            {selectedModel.overrides && Object.keys(selectedModel.overrides)?.length ? (
              <div className="mt-2 text-sm text-muted-foreground center flex">
                <span className="font-bold mr-2">{t('add_llm_card.metadata')}</span>
                {JSON.stringify(selectedModel.overrides)}
              </div>
            ) : undefined}
          </div>
        ) : null}
        {encryptedFields}
      </CardContent>
      <CardFooter className="flex justify-between">
        <LoadingButton
          loading={creatingLLM || loading}
          disabled={!modelId?.length}
          onClick={hanldeSubmit}
          className="w-full"
        >
          {hasCache ? t('add_llm_card.button_add') : t('add_llm_card.button_download_and_add')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
}

export default CreateLLMCard
