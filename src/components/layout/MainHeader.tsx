import { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import { Label } from 'src/lib/shadcn/ui/label'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from 'src/lib/shadcn/ui/tooltip'
import LoadingButton from 'src/components/atoms/LoadingButton'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useAppState } from 'src/states/app'
import { getRouteURL } from 'src/utils/routes'
import ExportButton from 'src/lib/kokonutui/export-button'
import { useExportSession } from 'src/hooks/mutations/use-export-session'
import { useImportSession } from 'src/hooks/mutations/use-import-session'
import { logError } from 'src/utils/logger'

export function MainHeader() {
  const { t } = useTranslation('tooltips')
  const location = useLocation()
  const setTheme = useAppState((state) => state.setTheme)
  const theme = useAppState((state) => state.theme)
  const { exportSession } = useExportSession()
  const { loading: importing, importSession } = useImportSession()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const handleExportSession = useCallback(async () => {
    try {
      await exportSession()
      return true
    } catch (error) {
      logError('Export Session', error)
      return false
    }
  }, [exportSession])

  const handleImportSession = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0]

        if (!file) {
          return
        }

        const json = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
              const fileContent = e.target?.result as string
              resolve(JSON.parse(fileContent))
            } catch (error) {
              reject(error)
            }
          }

          reader.onerror = (error) => {
            reject(error)
          }

          reader.readAsText(file)
        })
        await importSession(json as Record<string, object[]>)
      } catch (error) {
        logError('Import Session', error)
        return false
      }
    },
    [importSession],
  )

  const title = useMemo(() => {
    if (location.pathname.includes(getRouteURL('whiteboard'))) {
      return t('whiteboard')
    } else if (location.pathname.includes(getRouteURL('application'))) {
      return t('apllication')
    }
  }, [location.pathname, t])

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Label>{title}</Label>
      </div>
      <div className="flex items-center pl-4 pr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <LoadingButton
                loading={importing}
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                <LazyIcon size={18} name={'import'} />
                <input
                  key={`${Date.now()}`}
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportSession}
                  className="hidden"
                />
              </LoadingButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('import')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <ExportButton onProcess={handleExportSession} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('export')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button disabled={importing} onClick={handleChangeTheme} variant="ghost">
                <LazyIcon size={18} name={theme === 'dark' ? 'moon' : 'sun'} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('theme')}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant={'link'}>
                <a
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href="https://github.com/zrg-team/NoLLMChat"
                >
                  <LazyIcon size={18} name="github" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>https://github.com/zrg-team/NoLLMChat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
