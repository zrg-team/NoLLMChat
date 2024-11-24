import chalk from 'chalk'
import { isDev } from 'src/constants/dev'

const log = console.log

const stringify = (...args: unknown[]) =>
  args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join('\n')

export const logInfo = (...args: unknown[]) =>
  isDev ? log(chalk.blueBright(stringify(...args))) : undefined

export const logError = (...args: unknown[]) =>
  isDev ? log(chalk.redBright(stringify(...args))) : undefined

export const logWarn = (...args: unknown[]) =>
  isDev ? log(chalk.yellowBright(stringify(...args))) : undefined

export const logDebug = (...args: unknown[]) =>
  isDev ? log(chalk.greenBright(stringify(...args))) : undefined

export const logSilent = (...args: unknown[]) =>
  isDev ? log(chalk.whiteBright(stringify(...args))) : undefined
