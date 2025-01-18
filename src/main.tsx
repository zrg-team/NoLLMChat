import { StrictMode } from 'react'
import { scan } from 'react-scan'
import { createRoot } from 'react-dom/client'

import { isDev } from 'src/constants/dev.ts';
import { App } from 'src/App.tsx'

if (typeof window !== 'undefined') {
  scan({
    enabled: isDev,
    log: false,
    showToolbar: true,
  });
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
