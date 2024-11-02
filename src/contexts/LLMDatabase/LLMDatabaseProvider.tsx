import { useCallback, useEffect, useMemo, useState } from 'react'
import { getRepository } from 'src/modules/database'
import type { LLM } from 'src/modules/database/entities'

import { LLMDatabaseContextProvider } from './context'
import { LLMDatabaseContextType } from './type'

export interface JNScreenDocumentProviderProps {
  children: React.ReactNode
}

const LLMDatabaseProviderProvider: React.FC<JNScreenDocumentProviderProps> = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [llms, setLLMs] = useState<LLM[]>()

  const reload = useCallback(() => {
    const LLMRepository = getRepository<LLM>('LLM')
    return LLMRepository
        .find({
          take: 10,
          order: {
            updated_at: 'DESC',
          },
        })
        .then((data) => {
          console.log('llms', data)
          setLLMs(data)
          setInitializing(false)
          return data
        })
  }, [])
  useEffect(() => {
    reload()
  }, [reload])

  const contextValue = useMemo<LLMDatabaseContextType>(
    () => ({
      llms: llms || [],
      initializing,
      reload,
    }),
    [initializing, llms, reload],
  )

  return <LLMDatabaseContextProvider value={contextValue}>{children}</LLMDatabaseContextProvider>
}

LLMDatabaseProviderProvider.displayName = 'LLMDatabaseProviderProvider'

export { LLMDatabaseProviderProvider }
