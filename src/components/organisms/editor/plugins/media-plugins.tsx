'use client'

import { CaptionPlugin } from '@udecode/plate-caption/react'
import { ImagePlugin, PlaceholderPlugin } from '@udecode/plate-media/react'

import { ImagePreview } from 'src/lib/plate-ui/ui/image-preview'

export const mediaPlugins = [
  ImagePlugin.extend({
    options: { disableUploadInsert: true },
    render: { afterEditable: ImagePreview },
  }),
  CaptionPlugin.configure({
    options: {
      plugins: [ImagePlugin],
    },
  }),
  PlaceholderPlugin.configure({
    options: { disableEmptyPlaceholder: true },
    render: { afterEditable: null },
  }),
] as const
