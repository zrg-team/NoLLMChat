import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useCreateDatabaseLLM } from 'src/hooks/mutations/use-create-database-llm'
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
import { Badge } from 'src/lib/shadcn/ui/badge'
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

import { SUPPORTED_PROVIDERS } from './constants'

function CreateLLMCard(props: NodeProps & { setDialog?: (value: boolean) => void }) {
  const { id, setDialog } = props
  const { t } = useTranslation('components')
  const { toast } = useToast()
  const node = useInternalNode(id)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [provider, setProvider] = useState<`${LLMProviderEnum}`>(LLMProviderEnum.WebLLM)
  const [hasCache, setHasCache] = useState(false)
  const [llmsInfo, setLLMsInfo] = useState<{
    modelList: ModelRecord[]
    functionCallingModelIds: string[]
  }>()

  const syncCachedLLMURLs = useLocalLLMState((state) => state.syncCachedLLMURLs)
  const cachedLLMURLs = useLocalLLMState((state) => state.cachedLLMURLs)
  const { loading: creatingLLM, createDatabaseLLM } = useCreateDatabaseLLM()

  useEffect(() => {
    import('@mlc-ai/web-llm').then(async ({ functionCallingModelIds, prebuiltAppConfig }) => {
      const modelList = prebuiltAppConfig.model_list
      setLLMsInfo({ modelList, functionCallingModelIds })
    })
  }, [])

  useEffect(() => {
    syncCachedLLMURLs()
  }, [syncCachedLLMURLs])

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

  const selectedModel = useMemo(() => {
    if (!input || !llmsInfo?.modelList) return
    return llmsInfo?.modelList.find((model) => model.model_id === input)
  }, [input, llmsInfo?.modelList])

  useEffect(() => {
    if (!selectedModel?.model_id || !cachedLLMURLs) return

    setHasCache(cachedLLMURLs.some((item) => item.includes(selectedModel.model_id)))
  }, [cachedLLMURLs, selectedModel?.model_id])

  const modelTypeToString = useCallback((modelType?: unknown) => {
    if (modelType === 1) {
      return 'add_llm_card.model_types.embedding'
    }
    if (modelType === 2) {
      return 'add_llm_card.model_types.vlm'
    }
    return 'add_llm_card.model_types.llm'
  }, [])

  const modelTypeToLLMType = useCallback((modelType?: unknown) => {
    if (modelType === 1) {
      return LLMModelTypeEnum.embedding
    }
    if (modelType === 2) {
      return LLMModelTypeEnum.VLM
    }
    return LLMModelTypeEnum.LLM
  }, [])

  const handleOnchange = useCallback((currentValue: string) => {
    setInput(currentValue)
    setOpen(false)
  }, [])
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])
  const handleOnSelectProvider = useCallback((value: `${LLMProviderEnum}`) => {
    setProvider(value)
  }, [])
  const hanldeSubmit = async () => {
    if (!node) return
    try {
      await createDatabaseLLM(node, {
        name: input,
        model_type: modelTypeToLLMType(selectedModel?.model_type),
        function_calling: selectedModel?.model_id
          ? llmsInfo?.functionCallingModelIds?.includes(selectedModel?.model_id)
          : false,
      })
      setDialog?.(false)
    } catch {
      toast({
        description: t('add_llm_card.errors.failed_to_create'),
      })
    } finally {
      setInput('')
    }
  }

  const modelItems = useMemo(() => {
    return modelList.map((model) => (
      <CommandItem
        key={model.model_id}
        value={model.model_id}
        onSelect={handleOnchange}
      >
        {input === model.model_id ? (
          <LazyIcon name="check" className={'mr-2 h-4 w-4'} />
        ) : (
          <div className="mr-2 h-4 w-4" />
        )}
        <span className='max-w-md'>
          <div className="flex gap-2 mb-2">
            <LLMIcon name={model.model_id} />
            {model.model_id}
          </div>
          <Badge className="ml-1 mb-1">{t(modelTypeToString(model.model_type))}</Badge>
          {cachedLLMURLs.some((item) => item.includes(model.model_id)) ? (
            <Badge className="ml-1 mb-1" variant="outline">
              {t('add_llm_card.cached')}
            </Badge>
          ) : null}
          {RECOMMENDATION_LOCAL_LLMS.some((item) =>
            item.includes(model.model_id),
          ) ? (
            <Badge className="ml-1 mb-1" variant="outline">
              {t('add_llm_card.recommended')}
            </Badge>
          ) : null}
          {llmsInfo?.functionCallingModelIds?.includes(model.model_id) ? (
            <Badge className="ml-1 mb-1" variant="outline">
              {t('add_llm_card.function_calling')}
            </Badge>
          ) : null}
          {model.low_resource_required ? (
            <Badge className="ml-1" variant="outline">
              {t('add_llm_card.low_resource_required')}
            </Badge>
          ) : null}
          {model.vram_required_MB ? (
            <Badge className="ml-1" variant="outline">
              VRAM: {model.vram_required_MB.toLocaleString('en-US')} MB
            </Badge>
          ) : null}
        </span>
      </CommandItem>
    ))
  }, [cachedLLMURLs, handleOnchange, input, llmsInfo?.functionCallingModelIds, modelList, modelTypeToString, t])

  return (
    <Card className="w-f">
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
                  <CommandGroup>
                    {modelItems}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {selectedModel ? (
          <div className="mt-4">
            <div className="mt-4 text-sm text-muted-foreground center flex gap-1">
              <LLMIcon name={selectedModel.model_id} className='mr-2' />
              {hasCache ? (
                <Badge className="mb-1" variant="default">
                  {t('add_llm_card.has_model_cache')}
                </Badge>
              ) : null}
              {llmsInfo?.functionCallingModelIds?.includes(selectedModel.model_id) ? (
                <Badge className="mb-1" variant="default">
                  {t('add_llm_card.function_calling')}
                </Badge>
              ) : null}
              {selectedModel.low_resource_required ? (
                <Badge className="mb-1" variant="default">
                  {t('add_llm_card.low_resource_required')}
                </Badge>
              ) : null}
            </div>
            <div className="mt-2 text-sm text-muted-foreground center flex">
              <span className="font-bold mr-2">{t('add_llm_card.model_type')}</span>
              {t(modelTypeToString(selectedModel.model_type))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="font-bold mr-2">{t('add_llm_card.model_url')}</span>
              {selectedModel.model}
            </div>
            {selectedModel.vram_required_MB ? (
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-bold mr-2">{t('add_llm_card.model_vram')}</span>
                {selectedModel.vram_required_MB?.toLocaleString('en-US')} MB
              </div>
            ) : null}
            {selectedModel.overrides?.context_window_size ? (
              <div className="mt-2 text-sm text-muted-foreground">
                <span className="font-bold mr-2">
                  {t('add_llm_card.model_context_window_size')}
                </span>
                {selectedModel.overrides.context_window_size?.toLocaleString('en-US')}
              </div>
            ) : null}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={hanldeSubmit} disabled={!input || creatingLLM} className="w-full">
          {creatingLLM ? (
            <LazyIcon className={'animate-spin'} size={24} name={'loader-circle'} />
          ) : hasCache ? (
            t('add_llm_card.button_add')
          ) : (
            t('add_llm_card.button_download_and_add')
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CreateLLMCard
