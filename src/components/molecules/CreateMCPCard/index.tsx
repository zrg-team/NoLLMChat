import { memo } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { useToast } from 'src/lib/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import { Mcp, Thread } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'

import MCPForm from './MCPForm'
import { useCreateMcp } from 'src/hooks/flows/mutations/use-create-mcp'
import { Label } from 'src/lib/shadcn/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'src/lib/shadcn/ui/collapsible'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { MarkdownViewer } from '../MarkdownViewer'
import { Separator } from 'src/lib/plate-ui/ui/separator'

const CreateMCPCard = memo(
  (
    props: Omit<NodeProps, 'data'> & {
      data?: { ready?: boolean }
      thread?: Thread
      setDialog?: (value: boolean) => void
    },
  ) => {
    const { id, setDialog } = props

    const { t } = useTranslation('components')
    const { toast } = useToast()
    const node = useInternalNode(id)
    const { createMcp, loading } = useCreateMcp()

    const handleSubmit = async (data: Partial<Mcp>) => {
      if (node) {
        try {
          if (!data?.url || !data?.key) {
            throw new Error('MCP data is missing')
          }
          await createMcp(node, data)
          setDialog?.(false)
        } catch (error) {
          toast({
            variant: 'destructive',
            title: `${error}`,
          })
        }
      }
    }

    return (
      <Card className="mw-full">
        <CardHeader>
          <CardTitle>{t('add_mcp_card.title')}</CardTitle>
        </CardHeader>
        <CardContent className="max-w-lg nodrag nowheel">
          <MCPForm onSubmit={handleSubmit} loading={loading} />
          <Separator className="mt-4 mb-2" />
          <Label className="text-lg">{t('add_mcp_card.faq')}</Label>
          <Separator className="mb-4 mt-2" />
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('add_mcp_card.note.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('add_mcp_card.note.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('add_mcp_card.filesystem.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('add_mcp_card.filesystem.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('add_mcp_card.memory.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('add_mcp_card.memory.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('add_mcp_card.playwright.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('add_mcp_card.playwright.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('add_mcp_card.figma.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('add_mcp_card.figma.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
        </CardContent>
      </Card>
    )
  },
)

export default CreateMCPCard
