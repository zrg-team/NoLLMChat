import { memo, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import CreateLLMCard from 'src/components/molecules/CreateLLMCard'
import { useWorkspaceState } from '../state/workspace'
import { useAppState } from 'src/states/app'
import { LLMInfoCard } from 'src/components/molecules/LLMInfoCard/LLMInfoCard'
import { EmbeddingInfoCard } from 'src/components/molecules/EmbeddingInfoCard/EmbeddingInfoCard'
import { LLM } from 'src/services/database/types'
import { Label } from 'src/lib/shadcn/ui/label'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { useUpdatePrompt } from '../hooks/use-update-prompt'
import { Input } from 'src/lib/shadcn/ui/input'
import { Button } from 'src/lib/shadcn/ui/button'
import { useCreateOrUpdateMCP } from '../hooks/use-create-or-update-mcp'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from 'src/lib/shadcn/ui/alert'

interface CopilotProps {
  createOrUpdateLLM: (llm: LLM) => Promise<void>
  loadCurrentModel: () => Promise<void>
}

const GeneralInfo = memo((props: CopilotProps) => {
  const { t } = useTranslation('components')
  const { loadCurrentModel, createOrUpdateLLM } = props

  const llm = useWorkspaceState(useShallow((state) => state.llm))
  const llmStatus = useWorkspaceState(useShallow((state) => state.llmStatus))
  const llmProgress = useWorkspaceState(useShallow((state) => state.llmProgress))
  const theme = useAppState(useShallow((state) => state.theme))
  const embedding = useWorkspaceState(useShallow((state) => state.embedding))
  const prompts = useWorkspaceState(useShallow((state) => state.prompts))
  const mcps = useWorkspaceState(useShallow((state) => state.mcps))

  const { updatePrompt, loading: updatingPrompt } = useUpdatePrompt()
  const {
    param: mcpParams,
    setParam: setMCPParam,
    loading: creatingMCP,
    createOrUpdateMCP,
  } = useCreateOrUpdateMCP()

  const embeddingComponent = useMemo(() => {
    return (
      <div className="p-4">
        <EmbeddingInfoCard
          className="w-full h-auto !bg-inherit !text-current"
          embedding={embedding}
        />
      </div>
    )
  }, [embedding])

  const llmComponent = useMemo(() => {
    if (llm) {
      return (
        <div className="p-4">
          <LLMInfoCard
            llm={llm}
            status={llmStatus}
            progress={llmProgress}
            loadCurrentModel={loadCurrentModel}
            onUpdate={createOrUpdateLLM}
            className="w-full h-auto !bg-inherit !text-current"
          />
        </div>
      )
    }
    return (
      <div className="p-4">
        <CreateLLMCard
          className="w-full h-auto !bg-inherit !text-current"
          onCreated={createOrUpdateLLM}
        />
      </div>
    )
  }, [llm, theme, llmStatus, llmProgress, loadCurrentModel, createOrUpdateLLM])

  const promptsComponent = useMemo(() => {
    return (
      <>
        {Object.entries(prompts).map(([key, value], index) => (
          <div key={key} className="flex flex-col space-y-1.5 p-4">
            <Label className="mb-2" htmlFor={key}>
              {key}
            </Label>
            <Textarea
              disabled={updatingPrompt}
              defaultValue={value.content || ''}
              key={`${value.updated_at || value.created_at || index}`}
              onBlur={(e) => updatePrompt(value, { content: e.target.value || '' })}
              className="h-28 !text-foreground"
            />
          </div>
        ))}
      </>
    )
  }, [prompts, updatePrompt, updatingPrompt])

  const mcpComponent = useMemo(() => {
    return (
      <div className="p-4">
        <Alert>
          <AlertTitle>{t('mcp.title')}</AlertTitle>
          <AlertDescription>
            {t('mcp.description.intro')}
            <p> * {t('mcp.description.list.1')}</p>
            <p> * {t('mcp.description.list.2')}</p>
            <p> * {t('mcp.description.list.3')}</p>
          </AlertDescription>
          <Label className="mb-2">{t('mcp.list')}</Label>
          {mcps.map((mcp) => (
            <div key={mcp.id} className="flex flex-col space-y-1.5 mt-4 border p-2 rounded-md">
              <Label htmlFor={mcp.id}>{mcp.key}</Label>
              <Label className="text-sm opacity-60" htmlFor={mcp.id}>
                {mcp.url}
              </Label>
            </div>
          ))}
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
      </div>
    )
  }, [mcpParams, setMCPParam, creatingMCP, mcps, createOrUpdateMCP])

  return (
    <div
      className="w-full h-full flex flex-col border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md"
    >
      {llmComponent}
      {embeddingComponent}
      {promptsComponent}
      {mcpComponent}
    </div>
  )
})

export default GeneralInfo
