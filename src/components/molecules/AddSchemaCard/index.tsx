import { memo, useState } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Button } from 'src/lib/shadcn/ui/button'
import { useTranslation } from 'react-i18next'
import { useCreateSchema } from 'src/hooks/mutations/use-create-schema'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { toast } from 'src/lib/hooks/use-toast'

import { SchemaItemType } from './Field/type'
import FieldList from './Field/FieldList'

const AddSchemaCard = memo((props: Omit<NodeProps, 'data'>) => {
  const { t } = useTranslation('components')
  const { id } = props
  const node = useInternalNode(id)

  const [data, setData] = useState<SchemaItemType[]>([])

  const { createSchema, loading } = useCreateSchema()

  const handleSubmit = async () => {
    if (node && data?.length) {
      try {
        await createSchema(node, data)
      } catch (error) {
        toast({
          title: `${error}`,
        })
      }
    }
  }
  return (
    <div>
      <Card className="tw-max-w-lg">
        <CardHeader>
          <CardTitle>{t('add_schema_card.title')}</CardTitle>
        </CardHeader>
        <CardContent className="tw-min-w-96">
          <FieldList setData={setData} data={data} />
        </CardContent>
        <CardFooter className="tw-flex tw-justify-between">
          <Button disabled={loading || !data?.length} onClick={handleSubmit} className="tw-w-full">
            {loading ? (
              <LazyIcon name="loader-circle" className="tw-animate-spin" />
            ) : (
              t('add_schema_card.create')
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
})

export default AddSchemaCard
