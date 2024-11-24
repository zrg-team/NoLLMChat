/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { EventEmitter } from 'eventemitter3'
import { PGliteInstance } from './pglite-instance'
import { Results } from '@electric-sql/pglite'

type ConnectCallback = (error: unknown, client: PGlitePool | null, done: Function) => void
type QueryCallback = (error: unknown, results: Results<unknown> | null) => void

export class PGlitePool extends EventEmitter {
  constructor() {
    super()
  }

  private doneCallback() {}

  async connect(callback: ConnectCallback) {
    try {
      await PGliteInstance.getInstance()
      callback(null, this, this.doneCallback)
    } catch (error) {
      callback(error, null, this.doneCallback)
    }
  }

  async query(sqlQuery: string, queryParameters?: never[], callback?: QueryCallback) {
    const pgliteInstance = await PGliteInstance.getInstance()
    let cb = callback
    let params = queryParameters

    if (typeof queryParameters === 'function') {
      cb = queryParameters
      params = undefined
    }

    return pgliteInstance
      .query(sqlQuery, params)
      .then((results) => {
        if (cb) {
          cb(null, results)
        }
        return results
      })
      .catch((error) => {
        if (cb) {
          cb(error, null)
        }
        throw error
      })
  }

  end(errorCallback: Function) {
    PGliteInstance.close()
      .then(() => errorCallback(null))
      .catch((error) => errorCallback(error))
  }
}
