import { memo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { useTranslation } from 'react-i18next'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { Button } from 'src/lib/shadcn/ui/button'
import { getSourceBase, SOURCE_BASES } from 'src/services/web-container/source-bases'
import { cn } from 'src/lib/utils'

const CreateSourcebaseCard = memo(
  ({
    className,
    onUpdateSourceBase,
  }: {
    className?: string
    onUpdateSourceBase: (data: Awaited<ReturnType<typeof getSourceBase>>) => void
  }) => {
    const { t } = useTranslation('components')
    const [sourcebase, setSourcebase] = useState<string>()
    return (
      <Card className={cn('mw-full', className)}>
        <CardHeader className="p-4">
          <CardTitle>{t('add_source_base.title')}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-center w-full h-full flex-col">
            <Select onValueChange={(value) => setSourcebase(value)}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder={t('add_source_base.source_base_select_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_BASES.map((key) => {
                  return (
                    <SelectItem key={`${key}`} value={`${key}`}>
                      {t(`add_source_base.sourcebases.${key.toLowerCase()}`)}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              onClick={async () =>
                sourcebase && onUpdateSourceBase(await getSourceBase(sourcebase))
              }
            >
              {t('add_source_base.update_source')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  },
)

export default CreateSourcebaseCard
