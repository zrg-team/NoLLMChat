import chalk from 'chalk'
import dayjs from 'dayjs'
import { isDev } from 'src/constants/dev'

const log = isDev ? console.log : undefined
const debug = isDev ? console.debug : undefined
const warn = console.warn
const error = console.error

const group = console.group
const groupEnd = console.groupEnd

const logBase = (
  prefix: string,
  colorFunc: (...text: unknown[]) => string,
  logFunc: typeof log | typeof debug | typeof warn | typeof error,
  ...args: unknown[]
) => {
  const [key, ...rest] = args
  const isKeyString = typeof key === 'string'
  const messageKey = isKeyString ? key : ''

  group(colorFunc(`${prefix} ${messageKey}[${dayjs().format('DD-MM-YYYY HH:mm:ss')}]`))
  logFunc?.(...(!isKeyString ? args : rest))
  groupEnd()
}

export const logInfo = (...args: unknown[]) => {
  logBase('🔵 INFO:', chalk.blueBright, log, ...args)
}

export const logError = (...args: unknown[]) => {
  logBase('🔴 ERROR:', chalk.redBright, error, ...args)
}

export const logWarn = (...args: unknown[]) => {
  logBase('🔶 WARN:', chalk.yellowBright, warn, ...args)
}

export const logDebug = (...args: unknown[]) => {
  logBase('⚪ DEBUG:', chalk.greenBright, debug, ...args)
}

export const logSilent = (...args: unknown[]) => {
  logBase('⚫ SILENT:', chalk.whiteBright, log, ...args)
}
