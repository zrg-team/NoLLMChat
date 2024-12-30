'use client'

import { LinkPlugin } from '@udecode/plate-link/react'

import { LinkFloatingToolbar } from 'src/lib/plate-ui/ui/link-floating-toolbar'

export const linkPlugin = LinkPlugin.extend({
  render: { afterEditable: () => <LinkFloatingToolbar /> },
})
