import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import Monaco from '@monaco-editor/react'
import type { FileSystemAPI } from '@webcontainer/api'
import type * as monaco from 'monaco-editor'

import { useAppState } from 'src/states/app'
import { FileSystemTreeChange } from 'src/services/web-container/utils/file-tree'

import { initEditor } from '../modules/monaco'
import { useMainVSLiteAppContext } from '../contexts/main'
import { logError } from 'src/utils/logger'

interface EditorProps {
  fs: FileSystemAPI
  path: string
}

export type Editor = monaco.editor.IStandaloneCodeEditor
export type Monaco = typeof monaco

export const EditorInner = memo(
  (props: EditorProps & { onUpdateFileContent: (changes: FileSystemTreeChange[]) => void }) => {
    const { onUpdateFileContent, fs, path } = props
    const editorRef = useRef<Editor>()
    const fileChangeDebounceRef = useRef<number>()
    const currentContentRef = useRef<string>('')
    const isDarkTheme = useAppState((state) => state.theme === 'dark')

    const handleOnChange = useCallback(
      (value?: string) => {
        if (fileChangeDebounceRef.current) {
          clearTimeout(fileChangeDebounceRef.current)
        }
        if (currentContentRef.current === value) {
          return
        }
        fileChangeDebounceRef.current = setTimeout(() => {
          if (currentContentRef.current === value) {
            return
          }
          fileChangeDebounceRef.current = undefined
          currentContentRef.current = value || ''
          fs.writeFile(path, value || '', 'utf-8')
          onUpdateFileContent([{ path: path, content: value || '' }])
        }, 500) as unknown as number
      },
      [fs, path, onUpdateFileContent],
    )

    const handleMount = useCallback(
      (editor: Editor, monaco: Monaco) => {
        editorRef.current = editor
        return initEditor(editor, monaco, fs, path).then((content) => {
          currentContentRef.current = content
        })
      },
      [fs, path],
    )

    const options = useMemo(() => {
      return { readOnly: false, padding: { top: 10 }, tabSize: 2 }
    }, [])

    useEffect(() => {
      if (!fs || !path) {
        return
      }
      const handleWatch = (eventType: string) => {
        if (eventType === 'change') {
          fs.readFile(path, 'utf-8')
            .then((content) => {
              currentContentRef.current = content
              editorRef.current?.setValue(content)
            })
            .catch((err) => {
              logError(`[Editor] Failed to read file ${path}: ${err}`)
            })
        }
      }
      const watch = fs.watch(path, handleWatch)
      return () => {
        watch?.close()
        if (fileChangeDebounceRef.current) {
          clearTimeout(fileChangeDebounceRef.current)
        }
      }
    }, [fs, path])

    return (
      <Monaco
        path={path}
        className="nodrag nowheel"
        theme={isDarkTheme ? 'vs-dark' : 'vs-light'}
        options={options}
        onMount={handleMount}
        onChange={handleOnChange}
      />
    )
  },
)

export const Editor = (props: EditorProps) => {
  const { container, onUpdateFileContent } = useMainVSLiteAppContext()
  if (!container) {
    return
  }
  return <EditorInner fs={props.fs} path={props.path} onUpdateFileContent={onUpdateFileContent} />
}
