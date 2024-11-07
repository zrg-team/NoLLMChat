import '@zodui/react/index.css'
import { z } from 'zod'
import { memo, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { List, ListRef } from '@zodui/react'

const AddToolCard = memo(() => {
  const { t } = useTranslation('components')
  const listRef = useRef<ListRef | null>(null)
  return (
    <div>
      <Card className="tw-mw-full">
        <CardHeader>
          <CardTitle>{t('add_prompt_card.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <List
            ref={listRef}
            model={z.object({
              foo: z.string().optional(),
              bar: z.number().describe('This is my description'),
              list: z.array(z.string()).optional(),
            })}
          />
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button className="tw-w-full">t('add_prompt_card.button')</Button>
        </CardFooter>
      </Card>
    </div>
  )
})

export default AddToolCard
