import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import { AppEntityNames, EntityArrayTypes, TABLE_NAMES } from 'src/services/database/types'
import { useSessionState } from 'src/states/session'
import { METADATA_KEY } from 'src/constants/import-export'
import { generateUUID } from 'src/utils/uuid'

export const useExportSession = () => {
  const currentSession = useSessionState((state) => state.currentSession)

  const exportSession = useCallback(async () => {
    if (!currentSession?.id) {
      return
    }

    const items: Partial<Record<AppEntityNames, EntityArrayTypes>> = {}
    const ids: Record<string, string> = {}

    const allTablesExceptSession = Object.keys(TABLE_NAMES).filter(
      (key) => key !== 'Session',
    ) as AppEntityNames[]
    await Promise.all(
      allTablesExceptSession.map((key) => {
        return getRepository(key)
          .find({
            where: { session_id: currentSession.id },
          })
          .then((result) => {
            result.map((item) => {
              ids[item.id] = item.id
            })
            items[key as AppEntityNames] = result as EntityArrayTypes
          })
      }),
    )
    Object.keys(ids).forEach((key) => {
      ids[key] = `[ID_${generateUUID()}]`
    })
    let jsonString = JSON.stringify({
      [METADATA_KEY]: {
        key: currentSession.id,
        session: Object.entries(currentSession).reduce(
          (acc: Record<string, unknown>, [key, value]) => {
            if (typeof value !== 'object' || value === null) {
              acc[key] = value
            }
            if (value === undefined) {
              acc[key] = null
            }
            return acc
          },
          {},
        ),
        ids: Object.keys(ids),
      },
      ...items,
    })
    Object.keys(ids).forEach((key) => {
      jsonString = jsonString.replace(new RegExp(key, 'g'), ids[key])
    })
    jsonString = jsonString.replace(new RegExp(currentSession.id, 'g'), '[SESSION_ID]')

    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentSession.name}_${new Date()}.json`
    a.click()
  }, [currentSession])

  return { exportSession }
}
