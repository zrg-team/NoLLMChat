import { memo, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import CreateLLMCard from 'src/components/molecules/CreateLLMCard'
import { useWorkspaceState } from '../state/workspace'
import { LLMInfoCard } from 'src/components/molecules/LLMInfoCard/LLMInfoCard'
import { EmbeddingInfoCard } from 'src/components/molecules/EmbeddingInfoCard/EmbeddingInfoCard'
import { LLM } from 'src/services/database/types'
import { Label } from 'src/lib/shadcn/ui/label'
import { Textarea } from 'src/lib/shadcn/ui/textarea'
import { useUpdatePrompt } from '../hooks/use-update-prompt'

interface GeneralInfoProps {
  createOrUpdateLLM: (llm: LLM) => Promise<void>
  loadCurrentModel: () => Promise<void>
}

const GeneralInfo = memo((props: GeneralInfoProps) => {
  const { loadCurrentModel, createOrUpdateLLM } = props

  const llm = useWorkspaceState(useShallow((state) => state.llm))
  const llmStatus = useWorkspaceState(useShallow((state) => state.llmStatus))
  const llmProgress = useWorkspaceState(useShallow((state) => state.llmProgress))
  const embedding = useWorkspaceState(useShallow((state) => state.embedding))
  const prompts = useWorkspaceState(useShallow((state) => state.prompts))

  const { updatePrompt, loading: updatingPrompt } = useUpdatePrompt()

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
  }, [llm, llmStatus, llmProgress, loadCurrentModel, createOrUpdateLLM])

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

  return (
    <div
      className="w-full h-full flex flex-col border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md"
    >
      {llmComponent}
      {embeddingComponent}
      {promptsComponent}
    </div>
  )
})

export default GeneralInfo
