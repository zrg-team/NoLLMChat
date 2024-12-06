import Monaco from '@monaco-editor/react'
import type { FileSystemAPI } from '@webcontainer/api'
import { useAppState } from 'src/states/app'

import { initEditor } from '../modules/monaco'
import { useMainVSLiteAppContext } from '../contexts/main'

interface EditorProps {
  fs: FileSystemAPI
  path: string
}

export const EditorInner = (props: EditorProps) => {
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  return (
    <Monaco
      path={props.path}
      className="nodrag nowheel"
      theme={isDarkTheme ? 'vs-dark' : 'vs-light'}
      options={{ readOnly: false, padding: { top: 10 }, tabSize: 2 }}
      onMount={(editor, monaco) => {
        console.log('>')
        return initEditor(editor, monaco, props.fs, props.path)
      }}
      onChange={(value) => {
        return props.fs.writeFile(props.path, value || '', 'utf-8')
      }}
    />
  )
}

export const Editor = (props: EditorProps) => {
  const { container } = useMainVSLiteAppContext()
  if (!container) {
    return
  }
  return <EditorInner fs={props.fs} path={props.path} />
}
