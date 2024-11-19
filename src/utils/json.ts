export const safeParseJSON = (
  jsonString: string,
  tryOptions?: string[],
): ReturnType<typeof JSON.parse> => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.warn('[ManualFunctionCalling]', jsonString, error)
    if (tryOptions?.includes('retryWithMissingBracket')) {
      tryOptions = tryOptions.filter((item) => item === 'retryWithMissingBracket')
      return safeParseJSON(`${jsonString}}`, tryOptions)
    }
    return
  }
}
