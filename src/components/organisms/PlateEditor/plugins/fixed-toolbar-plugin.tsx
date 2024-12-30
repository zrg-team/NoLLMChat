'use client'

import { createPlatePlugin } from '@udecode/plate-common/react'

import { FixedToolbar } from 'src/lib/plate-ui/ui/fixed-toolbar'
import { FixedToolbarButtons } from 'src/lib/plate-ui/ui/fixed-toolbar-buttons'

export const createFixedToolbarPlugin = ({
  hideDragIcon,
  enableHistoryControl,
}: {
  hideDragIcon?: boolean
  enableHistoryControl?: boolean
}) =>
  createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons
            hideDragIcon={hideDragIcon}
            enableHistoryControl={enableHistoryControl}
          />
        </FixedToolbar>
      ),
    },
  })

export const FixedToolbarPlugin = createPlatePlugin({
  key: 'fixed-toolbar',
  render: {
    beforeEditable: () => (
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
    ),
  },
})
