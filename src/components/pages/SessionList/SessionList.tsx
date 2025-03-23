'use client'

import { useCallback, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useModal } from '@ebay/nice-modal-react'
import SessionGrid from 'src/components/pages/SessionList/components/SessionGrid'

import { useSessionState } from 'src/states/session'
import { Session, SessionTypeEnum } from 'src/services/database/types'
import { getRouteURL } from 'src/utils/routes'
import DeleteSessionDialog from 'src/components/dialogs/DeleteSessionDialog'
import CreateSessionDialog from 'src/components/dialogs/CreateSessionDialog'

export default function SourceList() {
  const getSessions = useSessionState((state) => state.getSessions)
  const sessions = useSessionState(useShallow((state) => state.sessions))
  const deleteSessionDialog = useModal(DeleteSessionDialog)
  const createSessionDialog = useModal(CreateSessionDialog)
  const navigate = useNavigate()
  useLayoutEffect(() => {
    getSessions()
  }, [getSessions])

  const handleOpenSession = useCallback((session: Session) => {
    if (session.type === SessionTypeEnum.Whiteboard) {
      navigate(getRouteURL('whiteboard', { sessionId: session.id }))
    } else {
      navigate(getRouteURL('application', { applicationId: session.id }))
    }
  }, [])

  const handleDeleteSession = useCallback(
    (session: Session) => {
      deleteSessionDialog.show({
        id: session.id,
      })
    },
    [deleteSessionDialog],
  )

  const handleNewItem = useCallback(async () => {
    try {
      const sessionId = await createSessionDialog.show({})
      if (sessionId && typeof sessionId === 'string') {
        navigate(getRouteURL('whiteboard', { sessionId: sessionId }))
      }
    } catch {
      // ignore
    }
  }, [navigate])

  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-950 relative">
      <div className="mx-auto px-4 pt-6 pb-6 z-10">
        <SessionGrid
          sessions={sessions}
          onClick={handleOpenSession}
          onDelete={handleDeleteSession}
          onNewItem={handleNewItem}
        />
      </div>
    </div>
  )
}
