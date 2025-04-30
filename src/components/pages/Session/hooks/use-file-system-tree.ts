import type { FileSystemTree } from '@webcontainer/api'
import { useCallback, useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import {
  FileSystemTreeChange,
  parseFileSystemTree,
} from 'src/services/web-container/utils/file-tree'
import { useSessionState } from 'src/states/session'
import { useWorkspaceState } from 'src/components/pages/Session/state/workspace'
import fs, { MOUNT_INFO } from 'src/services/filesystem'
import { logDebug, logInfo, logWarn } from 'src/utils/logger'
import { loadAllSourceFiles } from 'src/utils/load-all-source-files'
import { useIndexCodeVectorDB } from 'src/hooks/use-index-code-vector-db'
import { msToTime } from 'src/utils/time-format'

export const useFileSystemTree = () => {
  const currentSession = useSessionState((state) => state.currentSession)
  const fileSystemTree = useWorkspaceState(useShallow((state) => state.fileSystemTree))
  const setFileSystemTree = useWorkspaceState((state) => state.setFileSystemTree)
  const updateFileSystemTree = useWorkspaceState((state) => state.updateFileSystemTree)
  const codeVectorDatabase = useWorkspaceState((state) => state.codeVectorDatabaseInstance)
  const contextVectorDatabase = useWorkspaceState((state) => state.contextVectorDatabaseInstance)
  const { indexVectorDB } = useIndexCodeVectorDB()

  const codeVectorDatabaseRef = useRef(codeVectorDatabase)
  const contextVectorDatabaseRef = useRef(contextVectorDatabase)
  codeVectorDatabaseRef.current = codeVectorDatabase
  contextVectorDatabaseRef.current = contextVectorDatabase

  const updateCodeContainerData = useCallback(
    async (id: string, _data: FileSystemTree, changes: FileSystemTreeChange[]) => {
      if (!codeVectorDatabaseRef.current || !contextVectorDatabaseRef.current) {
        return
      }
      const start = Date.now()
      const deletePaths: string[] = []
      const updateContent: { source: string; content: string }[] = []
      await Promise.all(
        changes.map(async (change) => {
          if (change.type === 'delete') {
            deletePaths.push(change.path)
            return fs.promises
              .unlink(`${MOUNT_INFO.home}/${id}/${change.path}`.replace(/\/\//g, ''))
              .catch((err) => {
                logWarn('[UpdateCodeContainerData] delete file error', err)
              })
          }
          const finalPath = change.path.split('/').slice(0, -1)
          if (finalPath?.length) {
            const dirPath = `${MOUNT_INFO.home}/${id}/${finalPath.join('/')}`.replace(/\/\//g, '')
            await fs.promises.mkdir(dirPath, { recursive: true }).catch((err) => {
              logWarn(`[UpdateCodeContainerData] create or update path error ${dirPath}`, err)
            })
          }
          updateContent.push({
            source: change.path,
            content: change.content.toString(),
          })
          return fs.promises
            .writeFile(
              `${MOUNT_INFO.home}/${id}/${change.path}`.replace(/\/\//g, ''),
              change.content,
            )
            .catch((err) => {
              logWarn(
                `[UpdateCodeContainerData] write file error ${change.type}: ${change.path}`,
                err,
              )
            })
        }),
      )
      logDebug(`[UpdateCodeContainerData] Update file system tree took ${Date.now() - start}ms`)

      await indexVectorDB({
        vectorStore: codeVectorDatabaseRef.current,
        input: updateContent.map((doc) => ({
          content: doc.content,
          file: doc.source,
          metadata: {
            session_id: id,
          },
        })),
        deleteFilter:
          deletePaths?.length || updateContent?.length
            ? {
                source: [
                  ...deletePaths,
                  ...(updateContent?.map((doc) => doc.source.replace(/\/\//g, '')) || []),
                ].filter(Boolean),
              }
            : undefined,
      })
      await indexVectorDB({
        vectorStore: contextVectorDatabaseRef.current,
        input: updateContent.map((doc) => ({
          content: doc.source,
          file: doc.source,
          metadata: {
            session_id: id,
            source: doc.source,
            type: 'PATH',
          },
        })),
        deleteFilter:
          deletePaths?.length || updateContent?.length
            ? {
                source: [
                  ...deletePaths,
                  ...(updateContent?.map((doc) => doc.source.replace(/\/\//g, '')) || []),
                ].filter(Boolean),
              }
            : undefined,
      })
    },
    [],
  )

  const updateCodeContainerFile = useCallback(
    async (changes: FileSystemTreeChange[]) => {
      if (!currentSession) {
        return
      }
      const tree = await updateFileSystemTree(changes)
      return updateCodeContainerData(currentSession.id, tree, changes)
    },
    [updateCodeContainerData, updateFileSystemTree],
  )

  const init = useCallback(async () => {
    if (!currentSession) {
      return
    }
    const start = Date.now()
    const sessionId = currentSession.id
    if (!(await fs.promises.exists(`${MOUNT_INFO.home}/${sessionId}`))) {
      await fs.promises.mkdir(`${MOUNT_INFO.home}/${sessionId}`, { recursive: true })
    }
    const sourcePath = `${MOUNT_INFO.home}/${sessionId}/`
    const documents = await loadAllSourceFiles({
      path: sourcePath,
    })
    logInfo(`[FileSystemTree] Init Load all source files took ${msToTime(Date.now() - start)}`)
    setFileSystemTree(
      parseFileSystemTree(
        documents.map((doc) => ({
          file: doc.source.replace(sourcePath, ''),
          content: doc.content,
        })),
      ),
    )
  }, [currentSession])

  useEffect(() => {
    init()
  }, [init])

  return {
    fileSystemTree,
    updateCodeContainerFile,
    updateCodeContainerData,
  }
}
