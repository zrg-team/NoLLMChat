'use client'

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { toDOMNode, useEditorRef } from '@udecode/plate-common/react'
import { ExternalLink } from 'lucide-react'
import { useToast } from 'src/lib/hooks/use-toast'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu'
import { ToolbarButton } from './toolbar'

export function ExportToolbarButton({ ...props }: DropdownMenuProps) {
  const { t } = useTranslation('common')
  const { toast } = useToast()
  const editor = useEditorRef()
  const openState = useOpenState()

  const getCanvas = async () => {
    const { default: html2canvas } = await import('html2canvas')

    const style = document.createElement('style')
    document.head.append(style)
    style.sheet?.insertRule('body > div:last-child img { display: inline-block !important; }')

    const canvas = await html2canvas(toDOMNode(editor, editor)!)
    style.remove()

    return canvas
  }

  const downloadFile = (href: string, filename: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', href)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.append(element)
    element.click()
    element.remove()
  }

  const copyMarkdown = async () => {
    if (
      'markdown' in editor.api &&
      typeof editor.api.markdown === 'object' &&
      editor.api.markdown &&
      'serialize' in editor.api.markdown &&
      typeof editor.api.markdown.serialize === 'function'
    ) {
      const content = editor.api.markdown.serialize()
      navigator.clipboard.writeText(content)
      toast({
        description: t('copied'),
      })
    }
  }

  const exportToPdf = async () => {
    const canvas = await getCanvas()

    const PDFLib = await import('pdf-lib')
    const pdfDoc = await PDFLib.PDFDocument.create()
    const page = pdfDoc.addPage([canvas.width, canvas.height])
    const imageEmbed = await pdfDoc.embedPng(canvas.toDataURL('PNG'))
    const { height, width } = imageEmbed.scale(1)
    page.drawImage(imageEmbed, {
      height,
      width,
      x: 0,
      y: 0,
    })
    const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true })

    downloadFile(pdfBase64, 'plate.pdf')
  }

  const exportToImage = async () => {
    const canvas = await getCanvas()
    downloadFile(canvas.toDataURL('image/png'), 'plate.png')
  }

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Export" isDropdown>
          <ExternalLink className="size-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={copyMarkdown}>Copy as Markdown</DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToPdf}>Export as PDF</DropdownMenuItem>
          <DropdownMenuItem onSelect={exportToImage}>Export as Image</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
