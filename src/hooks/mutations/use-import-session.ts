import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { METADATA_KEY } from 'src/constants/import-export'
import { getRepository } from 'src/services/database/database'
import { AppEntityNames, Session, SessionTypeEnum, TABLE_NAMES } from 'src/services/database/types'
import { getRouteURL } from 'src/utils/routes'
import { generateUUID } from 'src/utils/uuid'

export const useImportSession = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const transformData = useCallback(
    <T extends object>(
      item: Partial<T>,
      {
        idMap,
        newSessionId,
        replaceItem,
      }: { idMap: Record<string, string>; newSessionId?: string; replaceItem?: Partial<T> },
    ): T => {
      const inner = item as Record<string, unknown>
      return {
        ...Object.keys(inner).reduce((acc: Record<string, unknown>, k) => {
          if (inner[k] && typeof inner[k] === 'string' && idMap[inner[k]]) {
            acc[k] = idMap[inner[k]]
          } else if (k === 'session_id' && newSessionId) {
            acc[k] = newSessionId
          } else {
            acc[k] = inner[k]
          }
          return acc
        }, {}),
        ...(replaceItem || {}),
      } as T
    },
    [],
  )

  const importSession = useCallback(
    async (json: Record<string, object[]>) => {
      try {
        setLoading(true)
        const allTablesExceptMetadata = Object.keys(TABLE_NAMES).filter(
          (key) => key !== METADATA_KEY,
        ) as AppEntityNames[]

        if (!Object.keys(json[METADATA_KEY]).length || typeof json[METADATA_KEY] !== 'object') {
          throw new Error('Missing Metadata')
        }
        if (!('session' in json[METADATA_KEY]) || !json[METADATA_KEY].session) {
          throw new Error('Missing Session Metadata')
        }
        const session = json[METADATA_KEY].session
        if (!('ids' in json[METADATA_KEY])) {
          throw new Error('Missing Session ID')
        }
        const ids = json[METADATA_KEY].ids as string[]
        const idMap: Record<string, string> = ids.reduce((acc: Record<string, string>, id) => {
          acc[id] = generateUUID()
          return acc
        }, {})

        const dataKeys = Object.keys(json).filter((key) => key !== METADATA_KEY)

        const isValid = dataKeys.every((key) =>
          allTablesExceptMetadata.includes(key as AppEntityNames),
        )
        if (!isValid) {
          throw new Error('Invalid JSON keys')
        }
        const isValidValues = dataKeys.every((key) => Array.isArray(json[key]))
        if (!isValidValues) {
          throw new Error('Invalid JSON values')
        }
        dataKeys.forEach((key) => {
          json[key].forEach((item) => {
            if ('session_id' in item && item.session_id !== '[SESSION_ID]') {
              throw new Error('Invalid JSON values')
            }
          })
        })

        // All checks passed. Insert to database. key is entity name, value is array of entities
        const newSession = await getRepository('Session').save(
          transformData<Session>(session, {
            idMap,
            newSessionId: '',
            replaceItem: { id: undefined },
          }),
        )
        if (!newSession) {
          throw new Error('Failed to import session')
        }
        await Promise.all(
          allTablesExceptMetadata.map((key) => {
            const data = json[key]
            if (!data || !data.length) {
              return Promise.resolve()
            }
            const records = data.map((item) =>
              transformData(item, { idMap, newSessionId: newSession.id }),
            )
            return getRepository(key).save(records)
          }),
        )

        if (newSession.type === SessionTypeEnum.Whiteboard) {
          navigate(getRouteURL('whiteboard', { sessionId: newSession.id }))
        } else if (newSession.type === SessionTypeEnum.StandaloneApp) {
          navigate(getRouteURL('application', { applicationId: newSession.id }))
        }
      } finally {
        setLoading(false)
      }
    },
    [navigate, transformData],
  )

  return { loading, importSession }
}
