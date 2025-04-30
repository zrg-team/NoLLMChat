'use client'

import { motion } from 'motion/react'
import { cn } from 'src/lib/utils'
import { Session } from 'src/services/database/types'
import date from 'dayjs'
import LazyIcon from 'src/components/atoms/LazyIcon'

export type SessionItemProps = {
  onClick: (product: Session) => void
  onDelete: (product: Session) => void
}
export default function SessionItem({
  session,
  onClick,
  onDelete,
}: { session: Session } & SessionItemProps) {
  return (
    <motion.div
      key={session.id}
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
        'cursor-pointer',
      )}
      onClick={() => onClick(session)}
    >
      <div className="flex justify-between gap-1">
        <div className="flex gap-3">
          <div
            className={cn(
              'relative w-[32px] h-[32px] rounded-lg overflow-hidden mt-1',
              'transition-colors duration-200',
              'group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700',
            )}
          >
            <LazyIcon name="computer" className="w-full h-full text-primary/50" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 overflow-hidden text-ellipsis max-h-5 max-w-full">
              {session.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span>{date(session.updated_at).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="h-full pt-2">
          <LazyIcon
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDelete(session)
            }}
            size={16}
            className="!z-50"
            name="trash-2"
          />
        </div>
      </div>
    </motion.div>
  )
}
