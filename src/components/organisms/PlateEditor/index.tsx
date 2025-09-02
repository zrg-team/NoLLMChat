'use client'

import { lazy, Suspense } from 'react'
import type { BaseMessage } from '@langchain/core/messages'
import { Value } from '@udecode/plate-common'

// Dynamically import the PlateEditor to reduce initial bundle size
const PlateEditorDynamic = lazy(() => import('./PlateEditorOriginal'))

export default function PlateEditor(props: {
  selected?: boolean
  hideDragIcon?: boolean
  enableHistoryControl?: boolean
  onValueChange?: (value: Value) => void
  defaultValue?: unknown
  copilotStream?: (
    message: string | BaseMessage[],
    onMessageUpdate: (chunk: string) => void,
  ) => void
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">
          Loading editor...
        </div>
      }
    >
      <PlateEditorDynamic {...props} />
    </Suspense>
  )
}
