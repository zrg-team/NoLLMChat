import { memo, useCallback } from 'react'
import { Node, Connection, useReactFlow } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import LoadingButton from 'src/components/atoms/LoadingButton'
import { useCreateStandaloneSession } from 'src/hooks/mutations/use-create-standalone-session'
import { useDeleteNodeFlow } from 'src/hooks/flows/mutations/use-delete-node-flow'
import { useToast } from 'src/lib/hooks/use-toast'
import { Button } from 'src/lib/shadcn/ui/button'
import { cn } from 'src/lib/utils'
import { DefaultNodeData, DefaultNodeProps } from 'src/utils/flow-node'
import { EntityType } from 'src/utils/orm-type'
import { logError } from 'src/utils/logger'
import { useModal } from '@ebay/nice-modal-react'
import CreateStandaloneApplicationDialog from 'src/components/molecules/dialogs/CreateStandaloneApplicationDialog'

export const NodeHeader = memo(
  ({
    id,
    className,
    enableToStandalone,
    getLinkedConnections,
  }: {
    id: string
    className?: string
    enableToStandalone?: boolean
    getLinkedConnections?: (id: string) => {
      node: Node<DefaultNodeProps<{ entity: EntityType<unknown> }>['data']>
      connections: Connection[]
      connectedNodes?: Node<DefaultNodeProps<{ entity: EntityType<unknown> }>['data']>[]
    }[]
  }) => {
    const { t } = useTranslation('common')
    const { getNode } = useReactFlow<Node<DefaultNodeData>>()
    const { loading: deleting, deleteNodeFlow } = useDeleteNodeFlow()
    const { createStandaloneSession } = useCreateStandaloneSession()
    const { toast } = useToast()
    const createStandaloneApplicationDialog = useModal(CreateStandaloneApplicationDialog)

    const handleDelete = useCallback(async () => {
      try {
        await deleteNodeFlow(id)
        toast({
          description: t('deleted'),
        })
      } catch {
        toast({
          description: t('errors.delete_failed'),
          variant: 'destructive',
        })
      }
    }, [deleteNodeFlow, id, toast, t])

    const cloneStandaloneSession = useCallback(
      async (name?: string) => {
        try {
          const currentNode = getNode(id)
          if (!currentNode) {
            throw new Error('No current node')
          }
          const connections = getLinkedConnections?.(id) || []
          await createStandaloneSession(currentNode, { name, connections })
          toast({
            description: t('standalone_session_created'),
          })
        } catch (error) {
          logError(error)
          toast({
            description: t('errors.create_standalone_session_failed'),
            variant: 'destructive',
          })
        }
      },
      [getNode, id, getLinkedConnections, createStandaloneSession, toast, t],
    )

    const handleCreateStandaloneApplication = useCallback(() => {
      createStandaloneApplicationDialog.show({
        cloneStandaloneSession,
      })
    }, [cloneStandaloneSession, createStandaloneApplicationDialog])

    return (
      <div className={cn('flex absolute z-[51] right-0 top-0 h-10', className)}>
        {enableToStandalone ? (
          <Button
            className="!rounded-none !px-2"
            onClick={handleCreateStandaloneApplication}
            variant="ghost"
          >
            <LazyIcon name="package-plus" size={16} />
          </Button>
        ) : undefined}
        <LoadingButton
          loading={deleting}
          className="!rounded-none !px-2"
          onClick={handleDelete}
          variant="ghost"
        >
          <LazyIcon name="trash-2" size={16} />
        </LoadingButton>
      </div>
    )
  },
)
