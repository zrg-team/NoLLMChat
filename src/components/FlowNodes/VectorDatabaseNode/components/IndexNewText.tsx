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

    const handleIndexText = async () => {
      if (!text) {
        return
      }

      await onCreateData({ id: id, content: text })
      setId('')
      setText('')
    }

    return (
      <div className="min-w-80">
        <div className="flex flex-col space-y-1.5 mt-3">
          <Label htmlFor="name">{t('vector_database_node.add_text.id')}</Label>
          <Input
            value={id}
            disabled={loading}
            onChange={(e) => setId(e.target.value || '')}
            placeholder={t('vector_database_node.add_text.id_placeholder')}
            className="mb-4"
          />
          <Label htmlFor="name">
            {t('vector_database_node.add_text.content')} <span className="text-red-600">*</span>
          </Label>
          <Textarea
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value || '')}
            placeholder={t('vector_database_node.add_text.content_placeholder')}
          />
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={handleIndexText} disabled={loading || !text?.length} className="w-full">
            {loading ? (
              <LazyIcon name="loader-circle" className="animate-spin" />
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
