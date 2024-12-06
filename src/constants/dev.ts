// PRODUCTION DEBUG: open console and run `localStorage.setItem('__DEBUG__', 'true')`
export const isDev = import.meta.env.DEV || localStorage.getItem('__DEBUG__') === 'true'

export const DATABASE_LOG_CONFIG = isDev
  ? {
      logging: ['query', 'error', 'warn', 'error', 'migration', 'info'] as const,
      logger: 'advanced-console' as const,
    }
  : {
      logging: ['error', 'migration'] as const,
      logger: 'debug' as const,
    }
