import { memo, useMemo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { NodeHeader } from 'src/components/molecules/NodeHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/lib/shadcn/ui/accordion'

import { JSONLDataNodeProps } from './type'
import { Card, CardContent, CardHeader } from 'src/lib/shadcn/ui/card'
import { decodeLine, decodeSplitter } from 'src/utils/string-data'
import { Label } from 'src/lib/shadcn/ui/label'
import LazyIcon from 'src/components/atoms/LazyIcon'

export const JSONLDataNode = memo((props: JSONLDataNodeProps) => {
  const { id, data, isConnectable } = props
  const MAX_SHOW = 10

  const jsonl = useMemo(() => {
    if (!data?.entity) {
      return {
        headers: [],
        rows: [],
      }
    }

    return {
      headers: decodeSplitter(data.entity.headers || ''),
      rows: decodeLine(data.entity.jsonl)
        .slice(0, MAX_SHOW)
        .map((row) => JSON.parse(row)),
    }
  }, [data?.entity])

  return (
    <div className="tw-min-w-80">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <NodeHeader id={id} />
        <Card className="tw-min-w-32 tw-min-h-16">
          <CardHeader className="!tw-p-2">
            <div className="tw-pt-2 tw-flex !tw-flex-row">
              <LazyIcon name="file-json" className="tw-mr-2" />
              <Label className="!tw-font-medium tw-leading-none tw-tracking-tight tw-pr-8">
                JSONL Data
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {jsonl?.rows?.map((row, index) => {
                return (
                  <AccordionItem key={`${index}`} value={`${index}`}>
                    <AccordionTrigger>{`${row.content}`.substring(0, 32)}...</AccordionTrigger>
                    <AccordionContent>
                      <pre>{row.content}</pre>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={isConnectable} />
    </div>
  )
})
