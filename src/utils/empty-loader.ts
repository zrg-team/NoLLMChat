import { BaseDocumentLoader } from '@langchain/core/document_loaders/base'
import { Document } from '@langchain/core/documents'
import { getEnv } from '@langchain/core/utils/env'
/**
 * A class that extends the `BaseDocumentLoader` class. It represents a
 * document loader that loads documents from a text file. The `load()`
 * method is implemented to read the text from the file or blob, parse it
 * using the `parse()` method, and create a `Document` instance for each
 * parsed page. The metadata includes the source of the text (file path or
 * blob) and, if there are multiple pages, the line number of each page.
 * @example
 * ```typescript
 * const loader = new TextLoader("src/document_loaders/example_data/example.txt");
 * const docs = await loader.load();
 * ```
 */
export class EmptyLoader extends BaseDocumentLoader {
  filePathOrBlob: string | Blob
  constructor(filePathOrBlob: string | Blob) {
    super()
    Object.defineProperty(this, 'filePathOrBlob', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: filePathOrBlob,
    })
  }
  /**
   * A protected method that takes a `raw` string as a parameter and returns
   * a promise that resolves to an array containing the raw text as a single
   * element.
   * @param raw The raw text to be parsed.
   * @returns A promise that resolves to an array containing the raw text as a single element.
   */
  async parse(raw: string) {
    return [raw]
  }
  /**
   * A method that loads the text file or blob and returns a promise that
   * resolves to an array of `Document` instances. It reads the text from
   * the file or blob using the `readFile` function from the
   * `node:fs/promises` module or the `text()` method of the blob. It then
   * parses the text using the `parse()` method and creates a `Document`
   * instance for each parsed page. The metadata includes the source of the
   * text (file path or blob) and, if there are multiple pages, the line
   * number of each page.
   * @returns A promise that resolves to an array of `Document` instances.
   */
  async load() {
    return [
      new Document({
        pageContent: 'CONTENT IS HIDE',
        metadata: {
          source: this.filePathOrBlob,
        },
      }),
    ]
  }
  /**
   * A static method that imports the `readFile` function from the
   * `node:fs/promises` module. It is used to dynamically import the
   * function when needed. If the import fails, it throws an error
   * indicating that the `fs/promises` module is not available in the
   * current environment.
   * @returns A promise that resolves to an object containing the `readFile` function from the `node:fs/promises` module.
   */
  static async imports() {
    try {
      const fs = await import('src/services/filesystem/index')
      return { readFile: fs.default.promises.readFile }
    } catch (e) {
      console.error(e)
      throw new Error(
        `Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`,
      )
    }
  }
}
