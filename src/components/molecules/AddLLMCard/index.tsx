import { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { functionCallingModelIds, prebuiltAppConfig, hasModelInCache } from '@mlc-ai/web-llm'
import { useCreateDatabaseLLM } from 'src/hooks/mutations/use-create-database-llm'
import { NodeProps, useInternalNode } from '@xyflow/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent } from 'src/lib/shadcn/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'src/lib/shadcn/ui/command'
import { Badge } from 'src/lib/shadcn/ui/badge'
import { LLMModelTypeEnum } from 'src/services/database/types'
import { useLLMState } from 'src/states/llm'

function AddLLMCard(props: NodeProps & { setDialog?: (value: boolean) => void }) {
  const { id, setDialog } = props
  const { t } = useTranslation('components')
  const node = useInternalNode(id)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [hasCache, setHasCache] = useState(false)

  const cachedLLMURLs = useLLMState((state) => state.cachedLLMURLs)
  const { loading: creatingLLM, createDatabaseLLM } = useCreateDatabaseLLM()

  const modelList = useMemo(() => {
    const data = !search
      ? prebuiltAppConfig.model_list
      : prebuiltAppConfig.model_list.filter((model) =>
          model.model_id.toLowerCase().includes(search.toLowerCase()),
        )

    return data.sort((pre, next) => {
      let countPre = 0
      let countNext = 0

      if (functionCallingModelIds.includes(pre.model_id)) {
        countPre += 1
      }
      if (cachedLLMURLs.some((item) => item.includes(pre.model_id))) {
        countPre += 1
      }

      if (functionCallingModelIds.includes(next.model_id)) {
        countNext += 1
      }
      if (cachedLLMURLs.some((item) => item.includes(next.model_id))) {
        countNext += 1
      }

      if (countNext !== countPre) {
        return countNext - countPre
      }
      return pre.model_id.localeCompare(next.model_id)
    })
  }, [cachedLLMURLs, search])

  const selectedModel = useMemo(() => {
    if (!input) return
    return prebuiltAppConfig.model_list.find((model) => model.model_id === input)
  }, [input])

  useEffect(() => {
    if (!selectedModel?.model_id) return

    hasModelInCache(selectedModel.model_id).then((result) => {
      setHasCache(result)
    })
  }, [selectedModel?.model_id])

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
  const hanldeSubmit = async () => {
    if (!node) return
    try {
      await createDatabaseLLM(node, {
        name: input,
        model_type: modelTypeToLLMType(selectedModel?.model_type),
        function_calling: selectedModel?.model_id
          ? functionCallingModelIds.includes(selectedModel?.model_id)
          : false,
      })
      setDialog?.(false)
    } finally {
      setInput('')
    }
  }
  return (
    <Card className="tw-w-f">
      <CardHeader>
        <CardTitle>{t('add_llm_card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="tw-grid tw-w-full tw-gap-1.5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="tw-w-full tw-justify-between"
              >
                {input ? selectedModel?.model_id : t('add_llm_card.select_placeholder')}
                <LazyIcon
                  name="chevrons-up-down"
                  className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="tw-w-full tw-p-0">
              <Command>
                <CommandInput
                  onValueChange={handleSearchChange}
                  placeholder={t('add_llm_card.search_placeholder')}
                />
                <CommandList>
                  <CommandEmpty>{t('add_llm_card.no_model')}</CommandEmpty>
                  <CommandGroup>
                    {modelList.map((model) => (
                      <CommandItem
                        key={model.model_id}
                        value={model.model_id}
                        onSelect={handleOnchange}
                      >
                        {input === model.model_id ? (
                          <LazyIcon name="check" className={'tw-mr-2 tw-h-4 tw-w-4'} />
                        ) : (
                          <div className="tw-mr-2 tw-h-4 tw-w-4" />
                        )}
                        <span>
                          <Badge className="tw-mr-1">
                            {t(modelTypeToString(model.model_type))}
                          </Badge>
                          {model.model_id}
                          {cachedLLMURLs.some((item) => item.includes(model.model_id)) ? (
                            <Badge className="tw-ml-1 tw-mb-1" variant="outline">
                              {t('add_llm_card.cached')}
                            </Badge>
                          ) : null}
                          {functionCallingModelIds.includes(model.model_id) ? (
                            <Badge className="tw-ml-1 tw-mb-1" variant="outline">
                              {t('add_llm_card.function_calling')}
                            </Badge>
                          ) : null}
                          {model.vram_required_MB ? (
                            <Badge className="tw-ml-1" variant="outline">
                              VRAM: {model.vram_required_MB.toLocaleString('en-US')} MB
                            </Badge>
                          ) : null}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {selectedModel ? (
          <div className="tw-mt-4">
            <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground tw-center tw-flex tw-gap-1">
              {hasCache ? (
                <Badge className="tw-mb-1" variant="default">
                  {t('add_llm_card.has_model_cache')}
                </Badge>
              ) : null}
              {functionCallingModelIds.includes(selectedModel.model_id) ? (
                <Badge className="tw-mb-1" variant="default">
                  {t('add_llm_card.function_calling')}
                </Badge>
              ) : null}
              {selectedModel.low_resource_required ? (
                <Badge className="tw-mb-1" variant="default">
                  {t('add_llm_card.low_resource_required')}
                </Badge>
              ) : null}
            </div>
            <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground tw-center tw-flex">
              <span className="tw-font-bold tw-mr-2">{t('add_llm_card.model_type')}</span>
              {t(modelTypeToString(selectedModel.model_type))}
            </div>
            <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
              <span className="tw-font-bold tw-mr-2">{t('add_llm_card.model_url')}</span>
              {selectedModel.model}
            </div>
            {selectedModel.vram_required_MB ? (
              <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
                <span className="tw-font-bold tw-mr-2">{t('add_llm_card.model_vram')}</span>
                {selectedModel.vram_required_MB?.toLocaleString('en-US')} MB
              </div>
            ) : null}
            {selectedModel.overrides?.context_window_size ? (
              <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
                <span className="tw-font-bold tw-mr-2">
                  {t('add_llm_card.model_context_window_size')}
                </span>
                {selectedModel.overrides.context_window_size?.toLocaleString('en-US')}
              </div>
            ) : null}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="tw-flex tw-justify-between">
        <Button onClick={hanldeSubmit} disabled={!input || creatingLLM} className="tw-w-full">
          {creatingLLM ? (
            <LazyIcon className={'tw-animate-spin'} size={24} name={'loader-circle'} />
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

export default AddLLMCard
