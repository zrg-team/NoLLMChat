import { memo, useState } from 'react'
import { Mcp } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { Input } from 'src/lib/shadcn/ui/input'

const MCPForm = memo(
  ({
    loading,
    onSubmit,
  }: {
    onSubmit: (prompt: Partial<Mcp>) => Promise<unknown>
    loading?: boolean
  }) => {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const { t } = useTranslation('components')

    const handleSubmit = async () => {
      const result = await onSubmit({
        key: name,
        url,
      } as Partial<Mcp>)
      if (!result) {
        return
      }
      setName('')
      setUrl('')
    }

    return (
      <div>
        <div className="grid w-full gap-1.5">
          <Label className="mb-2">{t('add_mcp_card.key')}</Label>
          <Input
            disabled={loading}
            value={name || ''}
            onChange={(e) => setName(e.target.value || '')}
            className="!text-foreground"
          />
          <Label className="mb-2">{t('add_mcp_card.url')}</Label>
          <Input
            disabled={loading}
            value={url || ''}
            onChange={(e) => setUrl(e.target.value || '')}
            className="!text-foreground"
          />
        </div>
        <div>
          <LoadingButton
            loading={loading}
            disabled={!name?.length || !url?.length}
            onClick={handleSubmit}
            className="w-full mt-4"
          >
            {t('add_mcp_card.button')}
          </LoadingButton>
        </div>
      </div>
    )
  },
)

export default MCPForm
