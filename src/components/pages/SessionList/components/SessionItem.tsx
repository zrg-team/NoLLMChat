'use client'

import { motion } from 'motion/react'
import { cn } from 'src/lib/utils'
import { FlowNodeTypeEnum, Session } from 'src/services/database/types'
import date from 'dayjs'
import LazyIcon from 'src/components/atoms/LazyIcon'

import VisualStudioCodeSvg from 'src/assets/svgs/visual-studio-code.svg?react'
import plateEditorIcon from 'src/assets/images/plate-editor.png'

export type SessionItemProps = {
  onClick: (product: Session) => void
  onDelete: (product: Session) => void
}
export default function SessionItem({
  session,
  onClick,
  onDelete,
}: { session: Session } & SessionItemProps) {
  let icon: JSX.Element | undefined
  if (!session?.main_node) {
    icon = <LazyIcon name="layout-grid" width={32} height={32} />
  } else if (session.main_node.node_type === FlowNodeTypeEnum.EditorApp) {
    icon = <img src={plateEditorIcon} alt="Editor App" className="w-[32px] h-[32px] rounded-md" />
  } else if (session.main_node.node_type === FlowNodeTypeEnum.VSLiteApp) {
    icon = <VisualStudioCodeSvg width={32} height={32} />
  } else {
    icon = <LazyIcon name="message-circle-more" width={32} height={32} />
  }
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
            {icon}
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
