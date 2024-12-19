'use client'

import { useEditorRef, useEditorSelector, withRef } from '@udecode/plate-common/react'
import LazyIcon from 'src/components/atoms/LazyIcon'

import { ToolbarButton } from './toolbar'

export const RedoToolbarButton = withRef<typeof ToolbarButton>((props, ref) => {
  const editor = useEditorRef()
  const disabled = useEditorSelector((editor) => editor.history.redos.length === 0, [])

  return (
    <ToolbarButton
      ref={ref}
      disabled={disabled}
      onClick={() => editor.redo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip="Redo"
      {...props}
    >
      <LazyIcon name="redo-2" />
    </ToolbarButton>
  )
})

export const UndoToolbarButton = withRef<typeof ToolbarButton>((props, ref) => {
  const editor = useEditorRef()
  const disabled = useEditorSelector((editor) => editor.history.undos.length === 0, [])

  return (
    <ToolbarButton
      ref={ref}
      disabled={disabled}
      onClick={() => editor.undo()}
      onMouseDown={(e) => e.preventDefault()}
      tooltip="Undo"
      {...props}
    >
      <LazyIcon name="undo-2" />
    </ToolbarButton>
  )
})
