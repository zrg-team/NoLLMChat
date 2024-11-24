import { PGliteOptions } from '@electric-sql/pglite'
import { PGlitePool } from './pglite-pool'
import { PGliteInstance } from './pglite-instance'

export class PGliteDriver {
  constructor(options?: PGliteOptions) {
    if (options) {
      PGliteInstance.setOptions(options)
    }
  }

  public get driver() {
    return class {
      static Pool = PGlitePool
      static pool = PGlitePool
    }
  }
}
