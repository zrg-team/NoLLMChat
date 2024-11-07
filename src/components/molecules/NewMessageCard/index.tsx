import { useCallback, memo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'

const NewMessageCard = memo(
  ({
    disabled,
    loading,
    onSubmit,
  }: {
    disabled?: boolean
    loading?: boolean
    onSubmit: (input: string) => void
  }) => {
    const [input, setInput] = useState('')

    const { t } = useTranslation('components')

    const handleOnchange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value)
    }, [])
    const hanldeSubmit = async () => {
      onSubmit(input)
    }
    return (
      <Card className="tw-w-64">
        <CardHeader>
          <CardTitle>{t('add_message_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="tw-grid tw-w-full tw-gap-1.5">
            <Textarea
              onChange={handleOnchange}
              disabled={disabled}
              placeholder={t('add_message_card.placeholder')}
            />
          </div>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button
            onClick={hanldeSubmit}
            disabled={!input?.length || disabled}
            className="tw-w-full"
          >
            {loading ? (
              <LazyIcon name="loader-circle" className="tw-animate-spin" />
            ) : (
              t('add_message_card.button')
            )}
          </Button>
        </CardFooter>
      </Card>
    )
  },
)

export default NewMessageCard
