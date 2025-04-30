import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { SidebarTrigger } from 'src/lib/shadcn/ui//sidebar'
import AppIcon from 'src/assets/svgs/icon.svg?react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from 'src/lib/shadcn/ui/tooltip'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'
import { useAppState } from 'src/states/app'
import { Label } from 'src/lib/shadcn/ui/label'

export function MainHeader() {
  const { t } = useTranslation('common')
  const setTheme = useAppState((state) => state.setTheme)
  const theme = useAppState((state) => state.theme)

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger>
          <AppIcon className={'w-5 h-5'} />
        </SidebarTrigger>
        <Label className="text-lg font-bold">{t('app_name')}</Label>
      </div>
      <div className="flex items-center pl-4 pr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={handleChangeTheme} variant="ghost">
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
