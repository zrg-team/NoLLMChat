import { FC, PropsWithChildren, memo } from 'react'

import 'src/i18n'
import 'src/css/global.css'

import { AppRoute } from 'src/routes'
import { FileSystemProvider } from 'src/modules/file-system/provider'
import { RuntimeProvider } from 'src/modules/runtime/provider'
import { LocalLLMProvider } from 'src/modules/llm/provider'
import { LocalEmbeddingMProvider } from 'src/modules/embedding/provider'
import { DatabaseProvider } from 'src/modules/database/provider'

export const App: FC<PropsWithChildren> = memo(() => {
  return (
    <FileSystemProvider>
      <DatabaseProvider>
        <LocalEmbeddingMProvider>
          <LocalLLMProvider>
            <RuntimeProvider>
              <AppRoute />
            </RuntimeProvider>
          </LocalLLMProvider>
        </LocalEmbeddingMProvider>
      </DatabaseProvider>
    </FileSystemProvider>
  )
})
