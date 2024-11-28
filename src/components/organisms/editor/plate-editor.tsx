'use client'

import { useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BaseMessage } from '@langchain/core/messages'

import { Plate } from '@udecode/plate-common/react'

import { useCreateEditor } from 'src/components/organisms/editor/use-create-editor'
import { Editor, EditorContainer } from 'src/lib/plate-ui/ui/editor'
import { Value } from '@udecode/plate-common'

export default function PlateEditor({
  defaultValue,
  onValueChange,
  copilotStream,
}: {
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

  const hanldeOnChange = useCallback(
    ({ value }: { value: Value }) => {
      onValueChange?.(value)
    },
    [onValueChange],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onValueChange={hanldeOnChange}>
        <EditorContainer>
          <Editor variant="fullWidth" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  )
}
