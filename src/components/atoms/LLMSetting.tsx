import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { Button } from 'src/lib/shadcn/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from 'src/lib/shadcn/ui/popover'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { cn } from 'src/lib/utils'
import { useAppState } from 'src/states/app'
import { useShallow } from 'zustand/react/shallow'

import LazyIcon from './LazyIcon'

export const LLMSetting = memo(
  (props: {
    name?: string
    className?: string
    options?: Record<string, unknown>
    onChangeOptions?: (options: Record<string, unknown>) => Promise<void>
  }) => {
    const theme = useAppState(useShallow((state) => state.theme))
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
      <div className={cn('w-full', props.className)}>
        <Popover open={show} onOpenChange={setShow}>
          <PopoverTrigger asChild>
            <div className="flex justify-end gap-2">
              <Button onClick={handleOpenChange} variant="link" className="flex items-center px-0">
                <LazyIcon name="settings" />
                <Label className={cn(theme === 'dark' ? 'text-background' : 'text-primary')}>
                  {t('llm_setting.title')}
                </Label>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            {show ? (
              <Card className="!border-none">
                <CardHeader>
                  <CardTitle>{t('llm_setting.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>{t('llm_setting.temperature')}:</Label>
                    <Input
                      type="number"
                      value={options.temperature ? `${options.temperature}` : ''}
                      onChange={(e) =>
                        setOptions((pre) => ({
                          ...pre,
                          temperature: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>{t('llm_setting.top_p')}:</Label>
                    <Input
                      type="number"
                      value={options.topP ? `${options.topP}` : ''}
                      onChange={(e) =>
                        setOptions((pre) => ({
                          ...pre,
                          topP: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>{t('llm_setting.top_k')}:</Label>
                    <Input
                      type="number"
                      value={options.topK ? `${options.topK}` : ''}
                      onChange={(e) =>
                        setOptions((pre) => ({
                          ...pre,
                          topK: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>{t('llm_setting.max_tokens')}:</Label>
                    <Input
                      type="number"
                      value={options.maxTokens ? `${options.maxTokens}` : ''}
                      onChange={(e) =>
                        setOptions((pre) => ({
                          ...pre,
                          maxTokens: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>{t('llm_setting.stop_sequences')}:</Label>
                    <Input
                      placeholder={t('llm_setting.stop_sequences_placeholder')}
                      value={options.stop ? `${options.stop}` : ''}
                      onChange={(e) =>
                        setOptions((pre) => ({
                          ...pre,
                          stop: e.target.value,
                        }))
                      }
                    />
                  </div>
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
