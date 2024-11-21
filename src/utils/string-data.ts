export const encodeSplitter = (strings?: string[]) => {
  if (!strings) return ''

  return strings.join('|⥊|')
}

export const decodeSplitter = (strings?: string) => {
  if (!strings) return []

  return strings.split('|⥊|')
}

export const encodeLine = (strings?: string[]) => {
  if (!strings) return ''

  return strings.join('|⥌|')
}

export const decodeLine = (strings?: string) => {
  if (!strings) return []

  return strings.split('|⥌|')
}

export const encodeCSVData = (headers: string[], data: string[][]) => {
  return {
    headers: encodeSplitter(headers),
    data: encodeLine(data.map((row) => encodeSplitter(row))),
  }
}

export const decodeCSVData = <T extends Record<string, unknown>>(
  headerString: string,
  data: string,
) => {
  const headers = decodeSplitter(headerString)
  const rows = decodeLine(data).reduce((acc: Record<string, unknown>[], row) => {
    const rowValues = decodeSplitter(row)
    return rowValues.length === headers.length
      ? [
          ...acc,
          headers.reduce((acc, header, index) => ({ ...acc, [header]: rowValues[index] }), {}),
        ]
      : acc
  }, [])

  return {
    headers,
    rows: rows as T[],
  }
}
