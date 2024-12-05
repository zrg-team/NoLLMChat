// Isomorphic minimal debug package compatible with npm:debug
// TODO: Vite uses picomatch... we could borrow it

export const NS = 'vslite'

const CONFIG = globalThis.localStorage?.debug ? globalThis.localStorage?.debug : ''

const isEnabled = CONFIG.split(',').find((m: string) => m.startsWith(NS) || m === '*')

const Debug =
  (name: string) =>
  (...all: unknown[]) => {
    if (isEnabled) {
      console.debug(`[${NS}/${name}]`, ...all)
    }
  }

export default Debug
