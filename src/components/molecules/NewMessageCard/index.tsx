import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { useTranslation } from 'react-i18next'
import AIInput from 'src/lib/kokonutui/ai-input'

const NewMessageCard = memo(
  ({
    tags,
    disabled,
    loading,
    onSubmit,
  }: {
    tags?: React.ReactNode
    disabled?: boolean
    loading?: boolean
    onSubmit: (input: string) => void
  }) => {
    const { t } = useTranslation('components')

    const hanldeSubmit = async (input: string) => {
      try {
        await onSubmit(input)
        return true
      } catch {
        return false
      }
    }

    return (
      <Card className="min-w-80">
        <CardHeader>
          <CardTitle>{t('add_message_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <AIInput
              onSubmit={hanldeSubmit}
              disabled={disabled || loading}
              placeholder={t('add_message_card.placeholder')}
            />
          </div>
          {tags ? <div className="mt-2 gap-1 flex flex-wrap">{tags}</div> : null}
        </CardContent>
      </Card>
    )
  },
)

export default NewMessageCard
