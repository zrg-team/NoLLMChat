import { configure, InMemory, fs } from '@zenfs/core'
import { IndexedDB } from '@zenfs/dom'
import { logDebug, logError } from 'src/utils/logger'

export const MOUNT_INFO = {
  home: '/home',
  tmp: '/tmp',
}
const MOUNTS = {
  [MOUNT_INFO.tmp]: InMemory,
  [MOUNT_INFO.home]: IndexedDB,
}
configure({
  mounts: MOUNTS,
})
  .then(() => {
    logDebug('Filesystem configured')
  })
  .catch((error) => {
    logError('Filesystem configuration error', error)
  })

export default fs
