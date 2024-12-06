import { logWarn } from './logger'

export const safeParseJSON = (
  jsonString: string,
  tryOptions?: string[],
): ReturnType<typeof JSON.parse> => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    logWarn('[ManualFunctionCalling]', jsonString, error)
    if (tryOptions?.includes('retryWithMissingBracket')) {
      tryOptions = tryOptions.filter((item) => item === 'retryWithMissingBracket')
      return safeParseJSON(`${jsonString}}`, tryOptions)
    }
    return
  }
}
