import { memo, useState } from 'react'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Input } from 'src/lib/shadcn/ui/input'

const IndexNewText = memo(
  ({
    loading,
    onCreateData,
  }: {
    loading: boolean
    onCreateData: (data: { id?: string; content: string }) => Promise<void>
  }) => {
    const { t } = useTranslation('flows')
    const [id, setId] = useState('')
    const [text, setText] = useState('')

    return (
      <div className="tw-min-w-80">
        <div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mt-3">
          <Label htmlFor="name">{t('vector_database_node.add_text.id')}</Label>
          <Input
            value={id}
            disabled={loading}
            onChange={(e) => setId(e.target.value || '')}
            placeholder={t('vector_database_node.add_text.id_placeholder')}
            className="tw-mb-4"
          />
          <Label htmlFor="name">
            {t('vector_database_node.add_text.content')} <span className="tw-text-red-600">*</span>
          </Label>
          <Textarea
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value || '')}
            placeholder={t('vector_database_node.add_text.content_placeholder')}
          />
        </div>
        <div className="tw-flex tw-justify-between tw-mt-6">
          <Button
            onClick={() => onCreateData({ id: id, content: text })}
            disabled={loading || !text?.length}
            className="tw-w-full"
          >
            {loading ? (
              <LazyIcon name="loader-circle" className="tw-animate-spin" />
            ) : (
              t('vector_database_node.add_text.add')
            )}
          </Button>
        </div>
      </div>
    )
  },
)

export default IndexNewText
