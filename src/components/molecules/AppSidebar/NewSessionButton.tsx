'use client'

import LazyIcon from 'src/components/atoms/LazyIcon'
import { SidebarMenuButton } from 'src/lib/shadcn/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { cn } from 'src/lib/utils'
import SparklesText from 'src/lib/shadcn/ui/sparkles-text'

interface NewSessionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
}

export default function NewSessionButton({ className, onClick }: NewSessionButtonProps) {
  const { t } = useTranslation('sidebar')
  return (
    <SidebarMenuButton className={cn(className, 'tw-w-full')} onClick={onClick}>
      <LazyIcon name="frame" />
      <SparklesText text={t('new_session')} className="text-sm" sparklesCount={3} />
    </SidebarMenuButton>
  )
}
