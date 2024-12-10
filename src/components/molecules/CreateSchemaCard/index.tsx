import { memo, useState } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { useTranslation } from 'react-i18next'
import { useCreateSchema } from 'src/hooks/flows/mutations/use-create-schema'
import { toast } from 'src/lib/hooks/use-toast'
import LoadingButton from 'src/components/atoms/LoadingButton'

import { SchemaItemType } from './Field/type'
import FieldList from './Field/FieldList'

const CreateSchemaCard = memo((props: NodeProps) => {
  const { t } = useTranslation('components')
  const { id } = props
  const node = useInternalNode(id)

  const [data, setData] = useState<SchemaItemType[]>([])

  const { createSchema, loading } = useCreateSchema()

  const handleSubmit = async () => {
    if (node && data?.length) {
      try {
        await createSchema(node, data)
        setData([])
      } catch (error) {
        toast({
          variant: 'destructive',
          title: `${error}`,
        })
      }
    }
  }
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{t('add_schema_card.title')}</CardTitle>
      </CardHeader>
      <CardContent className="min-w-96">
        <FieldList setData={setData} data={data} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <LoadingButton
          loading={loading}
          disabled={!data?.length}
          onClick={handleSubmit}
          className="w-full"
        >
          {t('add_schema_card.create')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
})

export default CreateSchemaCard
