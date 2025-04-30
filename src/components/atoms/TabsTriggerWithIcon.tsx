import { TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import { cn } from 'src/lib/utils'

import LazyIcon, { type IconNames } from 'src/components/atoms/LazyIcon'
import { memo } from 'react'

export const TabsTriggerWithIcon = memo(
  ({
    mode,
    icon,
    name,
    theme,
  }: {
    mode: string
    name: string
    icon: IconNames
    theme?: string
  }) => {
    const isDarkTheme = theme === 'dark'

    const focustStyle = isDarkTheme ? 'text-background' : 'text-primary'
    const unfocustStyle = isDarkTheme ? 'text-background/30' : 'text-primary/20'
    return (
      <TabsTrigger
        value={name}
        className="flex items-center justify-center relative !bg-transparent"
      >
        <LazyIcon
          name={icon}
          className={cn('w-5 h-5', mode === name ? focustStyle : unfocustStyle)}
        />
      </TabsTrigger>
    )
  },
  (pre, next) => pre.mode === next.mode && pre.theme === next.theme,
)
