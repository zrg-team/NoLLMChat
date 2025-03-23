'use client'

import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { ShineBorder } from 'src/lib/shadcn/ui/shine-border'
import { cn } from 'src/lib/utils'

export type SessionItemProps = {
  onClick?: () => void
}
export default function NewSessionItem({ onClick }: SessionItemProps) {
  const { t } = useTranslation('sidebar')
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group',
        'p-4 rounded-xl',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-800',
        'hover:border-zinc-300 dark:hover:border-zinc-700',
        'transition-all duration-200',
        'cursor-pointer relative overflow-hidden',
      )}
      onClick={() => onClick?.()}
    >
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      <div className="flex justify-between gap-1">
        <div className="flex gap-3">
          <div
            className={cn(
              'relative w-[32px] h-[32px] rounded-lg overflow-hidden mt-1',
              'transition-colors duration-200',
              'group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700',
            )}
          >
            <LazyIcon name="plus" width={32} height={32} />
          </div>
          <div className="flex-1 flex items-center">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 overflow-hidden text-ellipsis max-h-5 max-w-full">
              {t('new_session')}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
