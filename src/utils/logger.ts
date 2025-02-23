import chalk from 'chalk'
import dayjs from 'dayjs'
import { isDev } from 'src/constants/dev'

const log = isDev ? console.log : undefined
const debug = isDev ? console.debug : undefined
const warn = console.warn
const error = console.error

const group = console.group
const groupEnd = console.groupEnd

export const logInfo = (key: string, ...args: unknown[]) => {
  group(chalk.blueBright(`🔵 INFO: ${key} [${dayjs().format('DD-MM-YYYY HH:mm:ss')}]`))
  log?.(...args)
  groupEnd()
}

export const logError = (key: string, ...args: unknown[]) => {
  group(chalk.redBright(`🔴 ERROR: ${key} [${dayjs().format('DD-MM-YYYY HH:mm:ss')}]`))
  error?.(...args)
  groupEnd()
}

export const logWarn = (key: string, ...args: unknown[]) => {
  group(chalk.yellowBright(`🔶 WARN: ${key} [${dayjs().format('DD-MM-YYYY HH:mm:ss')}]`))
  warn?.(...args)
  groupEnd()
}

export const logDebug = (key: string, ...args: unknown[]) => {
  group(chalk.greenBright(`⚪ DEBUG: ${key} [${dayjs().format('DD-MM-YYYY HH:mm:ss')}]`))
  debug?.(...args)
  groupEnd()
}

export const logSilent = (key: string, ...args: unknown[]) => {
  group(chalk.whiteBright(`⚫ SILENT: ${key} [${dayjs().format('DD:MM HH:mm:ss')}]`))
  log?.(...args)
  groupEnd()
}
