'use client'

import LazyIcon, { IconNames } from 'src/components/atoms/LazyIcon'
import { SidebarMenuButton } from 'src/lib/shadcn/ui/sidebar'
import { cn } from 'src/lib/utils'
import SparklesText from 'src/lib/shadcn/ui/sparkles-text'

interface NewSessionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  text: string
  icon: IconNames
  bold?: boolean
  sparkles?: boolean
}

export default function NewSessionButton({
  icon,
  sparkles,
  bold,
  text,
  className,
  onClick,
}: NewSessionButtonProps) {
  return (
    <SidebarMenuButton className={cn(className, 'tw-w-full')} onClick={onClick}>
      <LazyIcon name={icon} />
      <SparklesText
        text={text}
        sparklesCount={sparkles ? 3 : 0}
        className={cn('text-sm', bold ? 'font-bold' : 'font-normal')}
      />
    </SidebarMenuButton>
  )
}
