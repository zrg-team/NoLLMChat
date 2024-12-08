import chalk from 'chalk'
import { isDev } from 'src/constants/dev'

const log = console.log

const stringify = (...args: unknown[]) =>
  args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join('\n')

export const logInfo = (...args: unknown[]) =>
  isDev ? log(chalk.blueBright(stringify(...args))) : undefined

export const logError = (...args: unknown[]) => {
  log(chalk.redBright('ERROR:'))
  console.error(...args)
  log(chalk.redBright('-'.repeat(10)))
}

export const logWarn = (...args: unknown[]) => {
  log(chalk.yellowBright('WARN:'))
  console.warn(...args)
  log(chalk.yellowBright('-'.repeat(10)))
}

export const logDebug = (...args: unknown[]) =>
  isDev ? log(chalk.greenBright(stringify(...args))) : undefined

export const logSilent = (...args: unknown[]) =>
  isDev ? log(chalk.whiteBright(stringify(...args))) : undefined
