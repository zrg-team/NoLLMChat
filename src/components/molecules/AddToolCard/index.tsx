import { memo } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { Textarea } from 'src/lib/shadcn/ui/textarea'

const AddToolCard = memo(() => {
  const { t } = useTranslation('components')
  return (
    <div>
      <Card className="tw-mw-full">
        <CardHeader>
          <CardTitle>{t('add_tool_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="tw-flex tw-flex-col tw-space-y-1.5">
            <Label htmlFor="name">{t('add_tool_card.tool_name')}</Label>
            <Input id="name" placeholder={t('add_tool_card.name_placeholder')} />
          </div>
          <div className="tw-flex tw-flex-col tw-space-y-1.5 tw-mt-3">
            <Label htmlFor="name">{t('add_tool_card.tool_description')}</Label>
            <Textarea placeholder={t('add_tool_card.description_placeholder')} />
          </div>
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button className="tw-w-full">{t('add_tool_card.create')}</Button>
        </CardFooter>
      </Card>
    </div>
  )
})

export default AddToolCard
