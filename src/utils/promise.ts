export const getEmptyPromise = <T>(
  func?: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void,
  ) => unknown,
) => {
  let result: {
    resolve?: (value: T | PromiseLike<T>) => void
    reject?: (reason?: unknown) => void
    promise?: Promise<T>
  } = {}
  const promise = new Promise<T>((resolve, reject) => {
    // Translation
    result = {
      resolve,
      reject,
    }
    if (func) {
      return func(resolve, reject)
    }
  })
  result.promise = promise
  return result as {
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: unknown) => void
    promise: Promise<T>
  }
}
