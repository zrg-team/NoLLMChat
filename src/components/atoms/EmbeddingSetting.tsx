import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import LazyIcon from './LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from 'src/lib/shadcn/ui/popover'
import { cn } from 'src/lib/utils'

export const EmbeddingSetting = memo(
  (props: {
    name?: string
    className?: string
    options?: Record<string, unknown>
    supportedProviders?: string[]
    onChangeOptions?: (options: Record<string, unknown>) => Promise<void>
  }) => {
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState<Record<string, unknown>>(props.options || {})
    const { t } = useTranslation('atoms')

    const handleOpenChange = () => {
      if (!show) {
        setOptions(props.options || {})
      }
      setShow(!show)
    }

    const hanleSubmit = () => {
      props.onChangeOptions?.(options || {})
      setShow(false)
    }

    return (
      <div className={cn('min-w-20', props.className)}>
        <Popover open={show} onOpenChange={setShow}>
          <PopoverTrigger asChild>
            <div className="flex justify-end gap-2">
              <Button onClick={handleOpenChange} variant="link" className="flex items-center px-0">
                <LazyIcon name="settings" />
                <Label>{t('embedding_setting.title')}</Label>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            {show ? (
              <Card className="!border-none max-w-96 min-w-56">
                <CardHeader>
                  <CardTitle>{t('embedding_setting.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label>{t('embedding_setting.provider')}:</Label>
                  <Select
                    value={options?.provider ? `${options?.provider}` : 'local_transformers'}
                    onValueChange={(value) => setOptions({ provider: value })}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder={t('embedding_setting.provider_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="local_transformers" value="local_transformers">
                        {t('embedding_setting.providers.local_transformers')}
                      </SelectItem>
                      {props.supportedProviders?.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!props.supportedProviders?.length ? (
                    <Label className="text-red-500 !pt-2">
                      {t('embedding_setting.alerts.no_provider')}
                    </Label>
                  ) : undefined}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="secondary" onClick={hanleSubmit}>
                    {t('llm_setting.save')}
                  </Button>
                </CardFooter>
              </Card>
            ) : undefined}
          </PopoverContent>
        </Popover>
      </div>
    )
  },
)
