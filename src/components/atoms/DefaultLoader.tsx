import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import Meteors from 'src/lib/shadcn/ui/meteors'

import RetroGrid from 'src/lib/shadcn/ui/retro-grid'
import TypingAnimation from 'src/lib/shadcn/ui/typing-animation'

export const DefaultLoader = memo(() => {
  const { t } = useTranslation('common')

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="flex flex-row items-center gap-2">
        <TypingAnimation
          className="text-4xl font-bold text-black dark:text-white"
          text={t('loading')}
          repeat
          repeatDelay={500}
        />
      </div>
      <RetroGrid />
      <Meteors number={25} />
    </div>
  )
})
