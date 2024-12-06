// PRODUCTION DEBUG: open console and run `localStorage.setItem('__DEBUG__', 'true')`
export const isDev = (() => {
  if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
    return true
  }
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return window.localStorage.getItem('__DEBUG__') === 'true'
  }
  return false
})()

export const DATABASE_LOG_CONFIG = isDev
  ? {
      logging: ['query', 'error', 'warn', 'error', 'migration', 'info'] as const,
      logger: 'advanced-console' as const,
    }
  : {
      logging: ['error', 'migration'] as const,
      logger: 'debug' as const,
    }
