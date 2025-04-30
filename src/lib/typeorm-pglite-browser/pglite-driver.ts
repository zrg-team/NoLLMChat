import { PGlite, PGliteOptions } from '@electric-sql/pglite'
import { PGlitePool } from 'src/lib/pglite-pool'
import { PGliteInstance } from './pglite-instance'

export class PGliteDriver {
  constructor(options?: PGliteOptions, pgLiteInstance?: PGlite) {
    if (pgLiteInstance) {
      PGliteInstance.setPGLite(pgLiteInstance)
    } else if (options) {
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
