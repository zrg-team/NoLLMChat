import { MainVSLiteAppProvider } from '../contexts/main'
import { Dock } from './Dock'

export function VSLiteApp() {
  return (
    <MainVSLiteAppProvider>
      <Dock />
    </MainVSLiteAppProvider>
  )
}
