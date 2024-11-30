'use client'

import { useCallback, useRef, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BaseMessage } from '@langchain/core/messages'

import { Plate } from '@udecode/plate-common/react'

import { useCreateEditor } from 'src/components/organisms/editor/use-create-editor'
import { Editor, EditorContainer } from 'src/lib/plate-ui/ui/editor'
import { Value } from '@udecode/plate-common'
import { cn } from 'src/lib/utils'

export default function PlateEditor({
  selected,
  defaultValue,
  onValueChange,
  copilotStream,
}: {
  selected?: boolean
  onValueChange?: (value: Value) => void
  defaultValue?: unknown
  copilotStream?: (
    message: string | BaseMessage[],
    onMessageUpdate: (chunk: string) => void,
  ) => void
}) {
  const editor = useCreateEditor({
    defaultValue: defaultValue as Value,
    copilotStream,
  })

  const handleOnChange = useCallback(
    ({ value }: { value: Value }) => {
      onValueChange?.(value)
    },
    [onValueChange],
  )

  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }

    const editorElement = editorRef.current
    if (editorElement) {
      editorElement.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [selected])

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onValueChange={handleOnChange}>
        <EditorContainer>
          <div ref={editorRef}>
            <Editor variant="fullWidth" className={cn('nodrag nowheel')} />
          </div>
        </EditorContainer>
      </Plate>
    </DndProvider>
  )
}
