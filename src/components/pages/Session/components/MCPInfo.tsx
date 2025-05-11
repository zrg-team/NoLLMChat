import { memo, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Label } from 'src/lib/shadcn/ui/label'
import { useWorkspaceState } from '../state/workspace'
import { Input } from 'src/lib/shadcn/ui/input'
import { Button } from 'src/lib/shadcn/ui/button'
import { useCreateOrUpdateMCP } from '../hooks/use-create-or-update-mcp'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from 'src/lib/shadcn/ui/collapsible'
import { MarkdownViewer } from 'src/components/molecules/MarkdownViewer'
import LazyIcon from 'src/components/atoms/LazyIcon'

const MCPInfo = memo(() => {
  const { t } = useTranslation('components')
  const mcps = useWorkspaceState(useShallow((state) => state.mcps))

  const {
    param: mcpParams,
    setParam: setMCPParam,
    loading: creatingMCP,
    createOrUpdateMCP,
  } = useCreateOrUpdateMCP()

  const mcpComponent = useMemo(() => {
    return (
      <div className="p-4 flex gap-4 flex-col">
        <Alert>
          <AlertTitle>{t('mcp.list')}</AlertTitle>
          {mcps.map((mcp) => (
            <div key={mcp.id} className="flex flex-col space-y-1.5 mt-4 border p-2 rounded-md">
              <Label htmlFor={mcp.id}>{mcp.key}</Label>
              <Label className="text-sm opacity-60" htmlFor={mcp.id}>
                {mcp.url}
              </Label>
            </div>
          ))}
          {!mcps?.length ? (
            <Label className="text-sm opacity-60">{t('mcp.list_empty')}</Label>
          ) : null}
        </Alert>

        <Alert>
          <AlertTitle>{t('mcp.create_or_update_title')}</AlertTitle>
          <AlertDescription>{t('mcp.description.intro')}</AlertDescription>
          <div className="mt-4">
            <Label className="mb-2">{t('mcp.key')}</Label>
            <Input
              disabled={creatingMCP}
              value={mcpParams.key || ''}
              onChange={(e) => setMCPParam((pre) => ({ ...pre, key: e.target.value || '' }))}
              className="!text-foreground"
            />
            <Label className="mb-2">{t('mcp.url')}</Label>
            <Input
              disabled={creatingMCP}
              value={mcpParams.url || ''}
              onChange={(e) => setMCPParam((pre) => ({ ...pre, url: e.target.value || '' }))}
              className="!text-foreground"
            />
            <Button
              disabled={creatingMCP}
              onClick={() => {
                if (mcpParams.key && mcpParams.url) {
                  createOrUpdateMCP({
                    key: mcpParams.key,
                    url: mcpParams.url,
                  })
                }
              }}
              className="mt-2"
            >
              {t('mcp.create_or_update')}
            </Button>
          </div>
        </Alert>

        <Alert>
          <AlertTitle>{t('mcp.faq')}</AlertTitle>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('mcp.note.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('mcp.note.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('mcp.filesystem.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('mcp.filesystem.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('mcp.memory.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('mcp.memory.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('mcp.playwright.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('mcp.playwright.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible asChild className="group/collapsible">
            <div>
              <CollapsibleTrigger asChild>
                <div className="flex justify-between py-2">
                  <div>
                    <Label>{t('mcp.figma.title')}</Label>
                  </div>
                  <div>
                    <LazyIcon name="chevron-down" className="h-4 w-4" />
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <MarkdownViewer source={t('mcp.figma.detail')} />
              </CollapsibleContent>
            </div>
          </Collapsible>
        </Alert>
      </div>
    )
  }, [t, mcps, creatingMCP, mcpParams.key, mcpParams.url, setMCPParam, createOrUpdateMCP])

  return (
    <div
      className="w-full h-full flex flex-col border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md"
    >
      {mcpComponent}
    </div>
  )
})

export default MCPInfo
