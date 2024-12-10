import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedGridPattern from 'src/lib/shadcn/ui/animated-grid-pattern'
import FlickeringGrid from 'src/lib/shadcn/ui/flickering-grid'
import Meteors from 'src/lib/shadcn/ui/meteors'
import RetroGrid from 'src/lib/shadcn/ui/retro-grid'
import TypingAnimation from 'src/lib/shadcn/ui/typing-animation'
import { cn } from 'src/lib/utils'

export const DefaultLoader = memo(
  ({
    className,
    gridPattern,
    flickeringGrid,
    typing,
    text,
  }: {
    className?: string
    gridPattern?: boolean
    flickeringGrid?: boolean
    typing?: boolean
    text?: string
  }) => {
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
        <div className="flex flex-row items-center gap-2">
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
