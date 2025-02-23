import { configure, InMemory, fs } from '@zenfs/core'
import { IndexedDB } from '@zenfs/dom'
import { logDebug, logError } from 'src/utils/logger'

configure({
  mounts: {
    '/tmp': InMemory,
    '/home': IndexedDB,
  },
})
  .then(() => {
    logDebug('Filesystem configured')
  })
  .catch((error) => {
    logError('Filesystem configuration error', error)
  })

export default fs
