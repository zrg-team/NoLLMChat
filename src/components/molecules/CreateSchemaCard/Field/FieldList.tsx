// import { z } from 'zod'
import { memo } from 'react'
import { SchemaItemType } from './type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'
import { Card } from 'src/lib/shadcn/ui/card'
import NewOrUpdateField from './NewOrUpdateField'

const FieldList = memo(
  ({
    data,
    setData,
  }: {
    data: SchemaItemType[]
    setData: (func: (data: SchemaItemType[]) => SchemaItemType[]) => void
  }) => {
    return (
      <Accordion type="single" collapsible>
        {data.map((row) => {
          return (
            <AccordionItem key={row.id || 'new'} value={`${row.id}`}>
              <AccordionTrigger>{row.name}</AccordionTrigger>
              <AccordionContent>
                <NewOrUpdateField setData={setData} data={data} id={row.id} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
        <Card className="p-2 mt-4">
          <NewOrUpdateField setData={setData} data={data} />
        </Card>
      </Accordion>
    )
  },
)

export default FieldList
