import { memo, useCallback, useMemo, useRef } from 'react'
import Monaco from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'

import { useAppState } from 'src/states/app'
import { cn } from 'src/lib/utils'

interface EditorProps {
  content: string
  className?: string
  language?: string
  setContent: (content: string) => void
  options?: monaco.editor.IStandaloneEditorConstructionOptions
}

export type Editor = monaco.editor.IStandaloneCodeEditor
export type Monaco = typeof monaco

const CodeEditor = memo(
  ({ content, language, setContent, className, options: inputOptions }: EditorProps) => {
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
          setContent(value || '')
        }, 500) as unknown as number
      },
      [setContent],
    )
    const handleMount = useCallback(
      (editor: Editor) => {
        editor.setValue(content)
        return content
      },
      [content],
    )
    const options = useMemo<monaco.editor.IStandaloneEditorConstructionOptions>(
      () => ({
        readOnly: false,
        padding: { top: 10 },
        tabSize: 2,
        ...inputOptions,
      }),
      [inputOptions],
    )
    return (
      <Monaco
        className={cn('nodrag nowheel', className)}
        theme={isDarkTheme ? 'vs-dark' : 'vs-light'}
        options={options}
        onMount={handleMount}
        onChange={handleOnChange}
        language={language}
      />
    )
  },
)

export default CodeEditor
