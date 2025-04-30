import fs from 'src/services/filesystem'
import { logError } from './logger'

const resolve = (directoryPath: string, fileName: string) => {
  return `/${directoryPath.split('/').filter(Boolean).join('/')}/${fileName}`
}

export const loadAllSourceFiles = async ({
  path,
  recursive = true,
}: {
  path: string
  recursive?: boolean
}): Promise<{ source: string; content: string }[]> => {
  const files = await fs.promises.readdir(path, { withFileTypes: true })

  const documents: { source: string; content: string }[] = []

  for (const file of files) {
    const fullPath = resolve(path, file.name)
    if (file.isDirectory()) {
      if (recursive) {
        documents.push(
          ...(await loadAllSourceFiles({
            path: fullPath,
          })),
        )
      }
    } else {
      const file = await fs.promises.readFile(fullPath).catch((err) => {
        logError(`[LoadAllSourceFiles] Error reading file ${fullPath}:`, err)
        return null
      })
      documents.push({
        source: fullPath,
        content: file ? file.toString() : '',
      })
    }
  }

  return documents
}
