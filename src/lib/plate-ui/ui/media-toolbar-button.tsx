'use client'

import React, { useCallback, useState } from 'react'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { insertNodes, isUrl } from '@udecode/plate-common'
import { useEditorRef } from '@udecode/plate-common/react'
import { ImagePlugin } from '@udecode/plate-media/react'
import { ImageIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog'
import { useOpenState } from './dropdown-menu'
import { FloatingInput } from './input'
import { ToolbarSplitButton, ToolbarSplitButtonPrimary } from './toolbar'

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[]
    icon: React.ReactNode
    title: string
    tooltip: string
  }
> = {
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className="size-4" />,
    title: 'Insert Image',
    tooltip: 'Image',
  },
}

export function MediaToolbarButton({ nodeType }: DropdownMenuProps & { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType]

  const openState = useOpenState()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          setDialogOpen(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setDialogOpen(true)
          }
        }}
        pressed={openState.open}
        tooltip={currentConfig.tooltip}
      >
        <ToolbarSplitButtonPrimary>{currentConfig.icon}</ToolbarSplitButtonPrimary>
      </ToolbarSplitButton>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(value) => {
          setDialogOpen(value)
        }}
      >
        <AlertDialogContent className="gap-6">
          <MediaUrlDialogContent
            currentConfig={currentConfig}
            nodeType={nodeType}
            setOpen={setDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string]
  nodeType: string
  setOpen: (value: boolean) => void
}) {
  const editor = useEditorRef()
  const [url, setUrl] = useState('')

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) return

    setOpen(false)
    insertNodes(editor, {
      children: [{ text: '' }],
      name: undefined,
      type: nodeType,
      url,
    })
  }, [url, editor, nodeType, setOpen])

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <FloatingInput
          id="url"
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') embedMedia()
          }}
          label="URL"
          placeholder=""
          type="url"
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault()
            embedMedia()
          }}
        >
          Accept
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  )
}
