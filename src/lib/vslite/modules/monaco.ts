// import { AutoTypings, LocalStorageCache } from 'monaco-editor-auto-typings/custom-editor'

import type * as monaco from 'monaco-editor'
import type { FileSystemAPI } from '@webcontainer/api'
import { logWarn } from 'src/utils/logger'

export type Editor = monaco.editor.IStandaloneCodeEditor
export type Monaco = typeof monaco

// const sourceCache = new LocalStorageCache()

export async function initEditor(editor: Editor, _monaco: Monaco, fs: FileSystemAPI, path: string) {
  // Augment
  // AutoTypings.create(editor, { monaco, sourceCache, fileRootPath: './' })
  // Load file
  let contents = ''
  try {
    contents = await fs.readFile(path, 'utf-8')
  } catch (e) {
    logWarn(e)
    // File not found
  }
  editor.setValue(contents)
  return contents
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getIconFromFileName(_name: string) {
  // TODO
  return 'file-code'
}
