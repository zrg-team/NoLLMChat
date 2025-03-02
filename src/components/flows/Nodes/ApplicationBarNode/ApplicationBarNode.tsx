import { memo } from 'react'

import { Separator } from 'src/lib/shadcn/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/lib/shadcn/ui/tooltip'
import { Dock, DockIcon } from 'src/lib/shadcn/ui/dock'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { NodeProps } from '@xyflow/react'
import VisualStudioCodeSvg from 'src/assets/svgs/visual-studio-code.svg?react'
import plateEditorIcon from 'src/assets/images/plate-editor.png'
import { useToast } from 'src/lib/hooks/use-toast'

import { useActions } from './hooks/use-actions'

const DATA = {
  applications: [
    {
      key: FlowNodeTypeEnum.EditorApp,
      image: plateEditorIcon,
      label: 'application_bar.editor',
    },
    {
      key: FlowNodeTypeEnum.VSLiteApp,
      icon: VisualStudioCodeSvg,
      label: 'application_bar.vslite',
    },
  ],
  shapes: [
    { key: FlowNodeTypeEnum.Shape, icon: 'square' as const, label: 'application_bar.square' },
    { key: FlowNodeTypeEnum.CircleShape, icon: 'circle' as const, label: 'application_bar.circle' },
    {
      key: FlowNodeTypeEnum.TriangleShape,
      icon: 'triangle' as const,
      label: 'application_bar.triangle',
    },
  ],
}

export const ApplicationBarNode = memo((props: NodeProps) => {
  const { t } = useTranslation('flows')
  const { toast } = useToast()
  const { loading, createNode } = useActions(props.id)
  const handleAddNode = async (nodeType: FlowNodeTypeEnum) => {
    try {
      if (loading) {
        return
      }
      await createNode(nodeType)
    } catch {
      toast({
        description: t('application_bar.errors.add_node_failed'),
        variant: 'destructive',
      })
    }
  }
  return (
    <TooltipProvider>
      <Dock direction="middle">
        {DATA.applications.map((item) => {
          const Icon = item.icon
          return (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger>
                  {Icon ? (
                    <Icon width={20} height={20} onClick={() => handleAddNode(item.key)} />
                  ) : undefined}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={t(item.label)}
                      className="w-8 h-8 rounded-md"
                      onClick={() => handleAddNode(item.key)}
                    />
                  ) : undefined}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(item.label)}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          )
        })}
        <Separator orientation="vertical" className="h-full" />
        {DATA.shapes.map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger>
                <LazyIcon onClick={() => handleAddNode(item.key)} name={item.icon} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(item.label)}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  )
})
