import { Buffer } from 'buffer'
import localforage from 'localforage'

/* eslint-disable no-var, @typescript-eslint/no-explicit-any */
var window = {} as any
/* eslint-enable no-var, @typescript-eslint/no-explicit-any */
window.global = window
window.Buffer = Buffer
self.window = window
// @ts-expect-error - This is legacy
self.Buffer = Buffer
const databaseStore = localforage.createInstance({
  name: 'local_db',
  version: 1.0,
  description: 'Your SQL database for chat',
  driver: localforage.INDEXEDDB,
})
window.localforage = databaseStore
