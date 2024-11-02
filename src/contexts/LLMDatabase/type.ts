import type { LLM } from 'src/modules/database/entities'

export type LLMDatabaseContextType = {
  initializing?: boolean
  llms: LLM[]
  reload: () => Promise<LLM[]>
}
