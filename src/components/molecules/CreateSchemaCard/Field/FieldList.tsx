// import { z } from 'zod'
import { memo, useCallback } from 'react'
import { SchemaItemType } from './type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'
import { Card } from 'src/lib/shadcn/ui/card'
import NewOrUpdateField from './NewOrUpdateField'
import { cn } from 'src/lib/utils'

const FieldList = memo(
  ({
    data,
    setData,
    className = '',
  }: {
    className?: string
    data: SchemaItemType[]
    setData?: (func: (data: SchemaItemType[]) => SchemaItemType[]) => void
  }) => {
    const noop = useCallback(() => {}, [])
    const setFieldData = setData || noop
    return (
      <Accordion type="single" collapsible className="mb-4">
        {data.map((row) => {
          return (
            <AccordionItem key={row.id || 'new'} value={`${row.id}`}>
              <AccordionTrigger>{row.name}</AccordionTrigger>
              <AccordionContent>
                <NewOrUpdateField setData={setFieldData} data={data} id={row.id} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
        {setData ? (
          <Card className={cn('p-2 mt-4', className)}>
            <NewOrUpdateField setData={setFieldData} data={data} />
          </Card>
        ) : undefined}
      </Accordion>
    )
  },
)

export default FieldList
