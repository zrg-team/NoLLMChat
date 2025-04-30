import { Document } from '@langchain/core/documents'
import { DirectoryLoader, UnknownHandling } from 'langchain/document_loaders/fs/directory'
import fs from 'src/services/filesystem'

export class LocalDirectoryLoader extends DirectoryLoader {
  constructor(...args: ConstructorParameters<typeof DirectoryLoader>) {
    super(...args)
  }

  public async load(options?: {
    fileSizeLimit?: number
    simplifyCodeContentSize?: number
    simplifyMaxLength?: number
  }): Promise<Document[]> {
    const files = await fs.promises.readdir(this.directoryPath, { withFileTypes: true })

    const documents: Document[] = []

    for (const file of files) {
      const fullPath = this.resolve(this.directoryPath, file.name)
      const loaderFactory = this.loaders[this.extname(file.name)]
      if (file.isDirectory()) {
        if (this.recursive) {
          const loader = new LocalDirectoryLoader(
            fullPath,
            this.loaders,
            this.recursive,
            this.unknown,
          )
          documents.push(...(await loader.load(options)))
        }
      } else if (loaderFactory) {
        const fileLoader = loaderFactory(fullPath)
        documents.push(...(await fileLoader.load()))
      } else {
        switch (this.unknown) {
          case UnknownHandling.Ignore:
            break
          case UnknownHandling.Warn:
            console.warn(`Unknown file type: ${file.name}`)
            break
          case UnknownHandling.Error:
            throw new Error(`Unknown file type: ${file.name}`)
          default:
            throw new Error(`Unknown unknown handling: ${this.unknown}`)
        }
      }
    }

    return documents
  }

  getFileSize(fullPath: string) {
    const stats = fs.statSync(fullPath)
    return stats.size
  }

  extname(filePath: string) {
    return `.${filePath.split('.').pop()}`
  }

  resolve(directoryPath: string, fileName: string) {
    return `/${directoryPath.split('/').filter(Boolean).join('/')}/${fileName}`
  }
}
