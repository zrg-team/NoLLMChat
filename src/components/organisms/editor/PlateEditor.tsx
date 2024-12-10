'use client'

import { useCallback, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { BaseMessage } from '@langchain/core/messages'

import { Plate } from '@udecode/plate-common/react'

import { useCreateEditor } from 'src/components/organisms/editor/use-create-editor'
import { Editor, EditorContainer } from 'src/lib/plate-ui/ui/editor'
import { Value } from '@udecode/plate-common'
import { cn } from 'src/lib/utils'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'

export default function PlateEditor({
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
  usePreventPitchZoom(editorRef)

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
