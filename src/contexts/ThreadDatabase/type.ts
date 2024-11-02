import type { Thread } from 'src/modules/database/entities'

export type ThreadMDatabaseContextType = {
  initializing?: boolean
  threads: Thread[]
  reload: (model?: string) => Promise<Thread[]>
}
