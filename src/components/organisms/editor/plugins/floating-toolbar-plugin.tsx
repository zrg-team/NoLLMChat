'use client'

import { createPlatePlugin } from '@udecode/plate-common/react'

import { FloatingToolbar } from 'src/lib/plate-ui/ui/floating-toolbar'
import { FloatingToolbarButtons } from 'src/lib/plate-ui/ui/floating-toolbar-buttons'

export const FloatingToolbarPlugin = createPlatePlugin({
  key: 'floating-toolbar',
  render: {
    afterEditable: () => (
      <FloatingToolbar>
        <FloatingToolbarButtons />
      </FloatingToolbar>
    ),
  },
})
