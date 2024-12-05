import Monaco from '@monaco-editor/react'
import type { FileSystemAPI } from '@webcontainer/api'
import { useAppState } from 'src/states/app'

import { initEditor } from '../modules/monaco'

interface EditorProps {
  fs: FileSystemAPI
  path: string
}

export function Editor(props: EditorProps) {
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  return (
    <Monaco
      path={props.path}
      theme={isDarkTheme ? 'vs-dark' : 'vs-light'}
      options={{ readOnly: true, padding: { top: 10 } }}
      onMount={(editor, monaco) => initEditor(editor, monaco, props.fs, props.path)}
      onChange={(value) => props.fs.writeFile(props.path, value || '', 'utf-8')}
    />
  )
}
