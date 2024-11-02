import { useCallback, useEffect, useMemo, useState } from 'react'
import { getRepository } from 'src/modules/database'
import type { Thread } from 'src/modules/database/entities'

import { ThreadDatabaseContextProvider } from './context'
import { ThreadMDatabaseContextType } from './type'

export interface JNScreenDocumentProviderProps {
  children: React.ReactNode
}

const ThreadDatabaseProviderProvider: React.FC<JNScreenDocumentProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [threads, setThreads] = useState<Thread[]>()

  const reload = useCallback((_model?: string) => {
    const threadRepository = getRepository<Thread>('Thread')
    return threadRepository
        .find({
          take: 1000,
          order: {
            updated_at: 'DESC',
          },
        })
        .then((data) => {
          setThreads(data)
          setInitializing(false)
          return data
        })
  }, [])
  useEffect(() => {
    reload()
  }, [reload])

  const contextValue = useMemo<ThreadMDatabaseContextType>(
    () => ({
      threads: threads || [],
      initializing,
      reload,
    }),
    [initializing, threads, reload],
  )

  return <ThreadDatabaseContextProvider value={contextValue}>{children}</ThreadDatabaseContextProvider>
}

ThreadDatabaseProviderProvider.displayName = 'ThreadDatabaseProviderProvider'

export { ThreadDatabaseProviderProvider }
