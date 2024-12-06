import type { FileSystemTree } from '@webcontainer/api'
import { MainVSLiteAppProvider } from '../contexts/main'
import { Dock } from './Dock'

export function VSLiteApp({ fileSystemTree }: { fileSystemTree?: FileSystemTree }) {
  return (
    <MainVSLiteAppProvider fileSystemTree={fileSystemTree}>
      <Dock />
    </MainVSLiteAppProvider>
  )
}
