export function msToTime(ms: number, fixed: number = 2) {
  const seconds = (ms / 1000).toFixed(fixed)
  const minutes = (ms / (1000 * 60)).toFixed(fixed)
  const hours = (ms / (1000 * 60 * 60)).toFixed(fixed)
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(fixed)
  if (+seconds < 60) {
    return `${seconds} seconds`
  } else if (+minutes < 60) {
    return `${minutes} mins`
  } else if (+hours < 24) {
    return `${hours} hours`
  }
  return `${days} days`
}
