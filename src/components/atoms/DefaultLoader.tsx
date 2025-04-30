import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import RetroGrid from 'src/lib/shadcn/ui/retro-grid'
import TypingAnimation from 'src/lib/shadcn/ui/typing-animation'
import Icon from 'src/assets/svgs/icon.svg?react'
import { cn } from 'src/lib/utils'
import { useAppState } from 'src/states/app'
import { MorphingText } from 'src/lib/shadcn/magicui/morphing-text'

import LazyIcon from './LazyIcon'

export const DefaultLoader = memo(
  ({
    className,
    blurBackground,
    noBackground,
    enableLogo,
    typing,
    text,
    simple,
    noText,
    morphing,
  }: {
    className?: string
    typing?: boolean
    morphing?: boolean
    text?: string
    enableLogo?: boolean
    noBackground?: boolean
    blurBackground?: boolean
    simple?: boolean
    noText?: boolean
  }) => {
    const theme = useAppState((state) => state.theme)
    const { t } = useTranslation('common')

    const renderLoaderBackground = () => {
      if (blurBackground) {
        return (
          <>
            <div className="absolute inset-0 backdrop-blur-sm" />
          </>
        )
      }

      if (noBackground) {
        return null
      }

      return (
        <>
          <RetroGrid />
        </>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultText = useMemo(() => text ?? t('loading'), [t])

    const textComponent = useMemo(() => {
      if (noText) {
        return undefined
      }
      return morphing ? (
        <MorphingText
          texts={[defaultText, t('almost_there'), t('a_bit_more')]}
          className="text-6xl font-bold text-black dark:text-white mt-4 w-screen mb-28"
        />
      ) : typing ? (
        <TypingAnimation
          className="text-4xl font-bold text-black dark:text-white mb-32"
          text={defaultText}
          repeat
          repeatDelay={500}
        />
      ) : (
        <div className="text-4xl font-bold text-black dark:text-white mb-32">{defaultText}</div>
      )
    }, [noText, defaultText])

    if (simple) {
      return (
        <div
          className={cn('h-full w-ful !rounded-none flex justify-center items-center', className)}
        >
          <LazyIcon name="loader-circle" className="animate-spin" />
        </div>
      )
    }
    return (
      <div
        className={cn(
          'relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl',
          className,
        )}
      >
        {renderLoaderBackground()}
        <div className="flex flex-col items-center gap-2 z-10">
          {enableLogo ? (
            <Icon className={cn('w-24 h-24', theme === 'dark' ? 'fill-white' : 'fill-black')} />
          ) : undefined}
          {textComponent}
        </div>
      </div>
    )
  },
)
