import { useContext } from 'react'
import { Thread } from 'src/components/shadcn/ui/assistant-ui/thread'
import { LocalLLMContext } from 'src/modules/llm/provider'

export default function ThreadPage() {
  const localLLm = useContext(LocalLLMContext)
  return (
    <div className="tw-h-full tw-h-screen">
      <Thread hideInput={Object.values(localLLm.initializing || {}).some(Boolean)} />
    </div>
  )
}
