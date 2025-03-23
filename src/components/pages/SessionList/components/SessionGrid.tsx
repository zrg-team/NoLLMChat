import NewSessionItem from './NewSessionItem'
import SessionItem, { SessionItemProps } from './SessionItem'

import { Session } from 'src/services/database/types'

type SessionGridProps = {
  sessions: Session[]
  onNewItem: () => void
} & SessionItemProps

export default function SessionGrid({ sessions, onDelete, onClick, onNewItem }: SessionGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      {sessions.map((session) => (
        <SessionItem key={session.id} session={session} onClick={onClick} onDelete={onDelete} />
      ))}
      <NewSessionItem onClick={onNewItem} />
    </div>
  )
}
