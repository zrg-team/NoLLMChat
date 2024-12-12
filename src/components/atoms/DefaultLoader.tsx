import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedGridPattern from 'src/lib/shadcn/ui/animated-grid-pattern'
import FlickeringGrid from 'src/lib/shadcn/ui/flickering-grid'
import Meteors from 'src/lib/shadcn/ui/meteors'
import RetroGrid from 'src/lib/shadcn/ui/retro-grid'
import TypingAnimation from 'src/lib/shadcn/ui/typing-animation'
import Logo from 'src/assets/svgs/logo.svg?react'
import { cn } from 'src/lib/utils'
import { useAppState } from 'src/states/app'

export const DefaultLoader = memo(
  ({
    className,
    gridPattern,
    flickeringGrid,
    enableLogo,
    typing,
    text,
  }: {
    className?: string
    gridPattern?: boolean
    flickeringGrid?: boolean
    typing?: boolean
    text?: string
    enableLogo?: boolean
  }) => {
    const theme = useAppState((state) => state.theme)
    const { t } = useTranslation('common')

    const renderLoader = () => {
      if (gridPattern) {
        return <AnimatedGridPattern className="absolute" />
      }

      if (flickeringGrid) {
        return <FlickeringGrid className="absolute" gridGap={30} squareSize={2} />
      }

      return (
        <>
          <RetroGrid />
          <Meteors number={25} />
        </>
      )
    }
    return (
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl',
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2">
          {enableLogo ? (
            <Logo className={cn('w-52 h-52', theme === 'dark' ? 'fill-white' : 'fill-black')} />
          ) : undefined}
          {typing ? (
            <TypingAnimation
              className="text-4xl font-bold text-black dark:text-white mb-32"
              text={text ?? t('loading')}
              repeat
              repeatDelay={500}
            />
          ) : (
            <div className="text-4xl font-bold text-black dark:text-white mb-32">
              {text ?? t('loading')}
            </div>
          )}
        </div>
        {renderLoader()}
      </div>
    )
  },
)
