import { FC, PropsWithChildren, memo } from 'react'

import 'src/i18n'
import 'src/css/global.css'
import '@xyflow/react/dist/style.css'

import { AppRoute } from 'src/routes'
import { FileSystemProvider } from 'src/modules/file-system/provider'
import { LocalLLMProvider } from 'src/modules/llm/provider'
import { LocalEmbeddingMProvider } from 'src/modules/embedding/provider'
import { DatabaseProvider } from 'src/modules/database/provider'
import { LLMDatabaseProviderProvider } from 'src/contexts/LLMDatabase/LLMDatabaseProvider'
import { ThreadDatabaseProviderProvider } from 'src/contexts/ThreadDatabase/ThreadDatabaseProvider'

export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <FileSystemProvider>
      <DatabaseProvider>
        <LocalEmbeddingMProvider>
          <LocalLLMProvider>
            <LLMDatabaseProviderProvider>
              <ThreadDatabaseProviderProvider>
                <AppRoute />
              </ThreadDatabaseProviderProvider>
            </LLMDatabaseProviderProvider>
          </LocalLLMProvider>
        </LocalEmbeddingMProvider>
      </DatabaseProvider>
    </FileSystemProvider>
  )
})
