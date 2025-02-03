import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import LazyIcon from './LazyIcon'
import { Input } from 'src/lib/shadcn/ui/input'
import { Button } from 'src/lib/shadcn/ui/button'

export const LLMSetting = memo(
  (props: {
    name?: string
    className?: string
    llmOptions?: Record<string, unknown>
    onChangeOptions?: (options: Record<string, unknown>) => Promise<void>
  }) => {
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState<Record<string, unknown>>(props.llmOptions || {})
    const { t } = useTranslation('atoms')

    const handleOpenChange = () => {
      if (!show) {
        setOptions(props.llmOptions || {})
      }
      setShow(!show)
    }

    const hanleSubmit = () => {
      props.onChangeOptions?.(options || {})
      setShow(false)
    }

    return (
      <div className={props.className}>
        <div className="flex justify-end gap-2">
          {show ? (
            <Button variant="secondary" onClick={hanleSubmit}>
              {t('llm_setting.save')}
            </Button>
          ) : undefined}
          <Button onClick={handleOpenChange} variant="link" className="flex items-center px-0">
            <LazyIcon name="settings" />
            <Label>{!show ? t('llm_setting.title') : t('llm_setting.hide')}</Label>
          </Button>
        </div>
        {show ? (
          <div>
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
                value={options.max_tokens ? `${options.max_tokens}` : ''}
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
            <div className="flex justify-end mt-4"></div>
          </div>
        ) : undefined}
      </div>
    )
  },
)
