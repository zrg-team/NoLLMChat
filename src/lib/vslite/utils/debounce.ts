// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce<T extends Function>(cb: T, wait = 150) {
  let h: number
  const callable = (...args: unknown[]) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  return <T>(<unknown>callable)
}
