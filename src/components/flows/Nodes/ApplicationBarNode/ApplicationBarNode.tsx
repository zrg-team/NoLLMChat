import { memo } from 'react'

import { Separator } from 'src/lib/shadcn/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/lib/shadcn/ui/tooltip'
import { Dock, DockIcon } from 'src/lib/shadcn/ui/dock'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { FlowNodeTypeEnum } from 'src/services/database/types'
import { NodeProps } from '@xyflow/react'

import { useActions } from './hooks/use-actions'
import { useToast } from 'src/lib/hooks/use-toast'

const DATA = {
  applications: [
    {
      key: FlowNodeTypeEnum.EditorApp,
      icon: 'notebook-text' as const,
      label: 'application_bar.note',
    },
    {
      key: FlowNodeTypeEnum.VSLiteApp,
      icon: 'square-terminal' as const,
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
  old: [
    {
      key: FlowNodeTypeEnum.CodeContainerApp,
      icon: 'file-code-2' as const,
      label: 'application_bar.code_editor',
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
        {DATA.applications.map((item) => (
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
        <Separator orientation="vertical" className="h-full" />
        {DATA.old.map((item) => (
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
