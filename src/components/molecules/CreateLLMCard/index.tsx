import { useCallback, useEffect, useMemo, useState } from 'react'
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
import CreateSessionPassphraseDialog from 'src/components/dialogs/CreateSessionPassphraseDialog'
import { useUpdateSessionPassphrase } from 'src/hooks/mutations/use-update-session-passphrase'
import { Input } from 'src/lib/shadcn/ui/input'
import { logError } from 'src/utils/logger'
import secureSession from 'src/utils/secure-session'
import { useSessionState } from 'src/states/session'
import { encryptData, passphraseConfirm } from 'src/utils/passphrase'
import { useModalRef } from 'src/hooks/use-modal-ref'
import SessionPassphraseDialog from 'src/components/dialogs/SessionPassphraseDialog'

import {
  GROQ_MODELS,
  GROQ_VISION_MODELS,
  OPEN_AI_MODELS,
  SUPPORTED_PROVIDERS,
  VERTEX_AI_MODELS,
} from './constants'
import { Checkbox } from 'src/lib/shadcn/ui/checkbox'
import { Textarea } from 'src/lib/shadcn/ui/textarea'

function CreateLLMCard(props: NodeProps & { setDialog?: (value: boolean) => void }) {
  const { id, setDialog } = props
  const { t } = useTranslation('components')
  const { toast } = useToast()
  const node = useInternalNode(id)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [encryptedInfo, setEncryptedInfo] = useState<Record<string, string>>()
  const [provider, setProvider] = useState<`${LLMProviderEnum}`>(LLMProviderEnum.WebLLM)
  const [hasCache, setHasCache] = useState(false)
  const [llmsInfo, setLLMsInfo] = useState<{
    modelList: ModelRecord[]
    functionCallingModelIds: string[]
  }>()
  const { updateSessionPassphrase } = useUpdateSessionPassphrase()
  const currentSession = useSessionState((state) => state.currentSession)
  const syncCachedLLMURLs = useLocalLLMState((state) => state.syncCachedLLMURLs)
  const cachedLLMURLs = useLocalLLMState((state) => state.cachedLLMURLs)
  const { loading: creatingLLM, createLLM } = useCreateLLM()

  const { modalRef: createSessionPassphraseDialogRef } = useModalRef(CreateSessionPassphraseDialog)
  const { modalRef: sessionPassphraseDialogRef } = useModalRef(SessionPassphraseDialog)

  useEffect(() => {
    import('@mlc-ai/web-llm').then(async ({ functionCallingModelIds, prebuiltAppConfig }) => {
      const modelList = prebuiltAppConfig.model_list
      setLLMsInfo({ modelList, functionCallingModelIds })
    })
  }, [])

  useEffect(() => {
    syncCachedLLMURLs()
  }, [syncCachedLLMURLs])

  const isRequiredSessionPasskey = useMemo(() => {
    if (!input) return false
    return provider !== LLMProviderEnum.WebLLM
  }, [input, provider])

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
    if (!input) return

    switch (provider) {
      case LLMProviderEnum.WebLLM:
        return llmsInfo?.modelList && modelList.find((model) => model.model_id === input)
      case LLMProviderEnum.Groq:
        setEncryptedInfo({})
        return {
          model: input,
          model_id: input,
          model_type: GROQ_VISION_MODELS.includes(input) ? 2 : 0,
          overrides: {},
        } as ModelRecord
      case LLMProviderEnum.OpenAI:
        setEncryptedInfo({})
        return {
          model: input,
          model_id: input,
          model_type: 2,
          overrides: {},
        } as ModelRecord
      case LLMProviderEnum.VertexAI:
        setEncryptedInfo({})
        return {
          model: input,
          model_id: input,
          model_type: 2,
          overrides: {},
        } as ModelRecord
    }
  }, [input, llmsInfo?.modelList, modelList, provider])

  useEffect(() => {
    if (!selectedModel?.model_id || !cachedLLMURLs) return

    setHasCache(cachedLLMURLs.some((item) => item.includes(selectedModel.model_id)))
  }, [cachedLLMURLs, selectedModel?.model_id])
  useEffect(() => {
    if (!currentSession?.id) return

    setProvider(LLMProviderEnum.WebLLM)
    setInput('')
    setSearch('')
    setEncryptedInfo({})
  }, [currentSession?.id])

  const handleOnchange = useCallback((currentValue: string) => {
    setInput(currentValue)
    setOpen(false)
  }, [])
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])
  const handleOnSelectProvider = useCallback((value: `${LLMProviderEnum}`) => {
    setProvider(value)
    setInput('')
    setSearch('')
    setEncryptedInfo({})
  }, [])
  const hanldeSubmit = async () => {
    if (!node || !currentSession) return
    try {
      setLoading(true)
      let passkey = ''
      let parameters: Record<string, unknown> | undefined
      if (isRequiredSessionPasskey && !currentSession.passphrase) {
        await createSessionPassphraseDialogRef.current.show({
          onConfirm: (input: string) => {
            passkey = input
            createSessionPassphraseDialogRef.current.hide()
          },
        })
        const keyInfo = await updateSessionPassphrase(passkey)
        if (!keyInfo || !Object.keys(encryptedInfo || {}).length) {
          throw new Error('Failed to update session passphrase')
        }
        await secureSession.set('passphrase', keyInfo.passphrase)
        parameters = await encryptData(encryptedInfo || {}, keyInfo.passphrase)
      } else if (isRequiredSessionPasskey && currentSession.passphrase) {
        const response = await passphraseConfirm(
          currentSession.passphrase,
          sessionPassphraseDialogRef.current,
        )
        parameters = await encryptData(encryptedInfo || {}, response)
      }
      await createLLM(node, {
        name: input,
        model_type: modelTypeToLLMType(selectedModel?.model_type),
        function_calling: selectedModel?.model_id
          ? llmsInfo?.functionCallingModelIds?.includes(selectedModel?.model_id)
          : false,
        parameters,
        provider,
      })
      setDialog?.(false)
    } catch (error) {
      logError(error)
      toast({
        variant: 'destructive',
        description: t('add_llm_card.errors.failed_to_create'),
      })
    } finally {
      setLoading(false)
      setProvider(LLMProviderEnum.WebLLM)
      setEncryptedInfo({})
      setInput('')
      setSearch('')
    }
  }

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
      case LLMProviderEnum.WebLLM:
        return modelList.map((model) => (
          <CommandItem key={model.model_id} value={model.model_id} onSelect={handleOnchange}>
            {input === model.model_id ? (
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
                />
              </div>
            </span>
          </CommandItem>
        ))
      case LLMProviderEnum.OpenAI:
        return OPEN_AI_MODELS.map((model) => {
          return (
            <CommandItem key={model} value={model} onSelect={handleOnchange}>
              {input === model ? (
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
      case LLMProviderEnum.VertexAI:
        return VERTEX_AI_MODELS.map((model) => {
          return (
            <CommandItem key={model} value={model} onSelect={handleOnchange}>
              {input === model ? (
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
              {input === model ? (
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
  }, [cachedLLMURLs, handleOnchange, input, llmsInfo?.functionCallingModelIds, modelList, provider])

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
      case LLMProviderEnum.VertexAI:
        return (
          <>
            <Alert variant="destructive" className="mt-4">
              {t('add_llm_card.alert.session_passkey')}
            </Alert>
            <div className="mt-4">
              <Label>{t('add_llm_card.encrypted_fields.credentials')}</Label>
              <Textarea
                rows={4}
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
          <Label>{t('add_llm_card.model_name')}</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {input ? selectedModel?.model_id : t('add_llm_card.select_model_placeholder')}
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
          disabled={!input?.length}
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
