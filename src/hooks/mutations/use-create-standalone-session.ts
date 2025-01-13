import { useCallback, useState } from 'react'
import { Connection, Node } from '@xyflow/react'
import { getRepository } from 'src/services/database'
import { useSessionState } from 'src/states/session'
import {
  AppEntityNames,
  FlowNodeTypeEnum,
  flowNodeTypeToEntity,
  Session,
  SessionStatusEnum,
  SessionTypeEnum,
} from 'src/services/database/types'
import { EntityType } from 'src/utils/orm-type'
import { DefaultNodeData } from 'src/utils/flow-node'
import { useNavigate } from 'react-router-dom'
import { getRouteURL } from 'src/utils/routes'

export const useCreateStandaloneSession = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const currentSession = useSessionState((state) => state.currentSession)
  const getLatestApplications = useSessionState((state) => state.getLatestApplications)

  const cloneNode = useCallback(
    async (
      newSession: Session,
      node: Node<DefaultNodeData>,
      newEntityIDMap: Map<string, string>,
      newFlowNodeIDMap: Map<string, string>,
    ) => {
      const entity = node.data?.entity
      let entityName = node.type ? flowNodeTypeToEntity[node.type as FlowNodeTypeEnum] : undefined
      if (
        entityName &&
        entity &&
        node &&
        typeof entity === 'object' &&
        'id' in entity &&
        !newEntityIDMap.has(`${entity.id}`) &&
        !newFlowNodeIDMap.has(`${node.id}`)
      ) {
        entityName = entityName as AppEntityNames
        const cloneEntity = await getRepository(entityName).save({
          ...entity,
          ...(entity && typeof entity === 'object' && 'session_id' in entity
            ? { session_id: newSession.id }
            : {}),
        } as EntityType<unknown>)
        newEntityIDMap.set(`${entity.id}`, cloneEntity.id)
        const currentFlowNode = await getRepository('FlowNode').findOne({
          where: {
            id: node.data.flowNode.id,
          },
        })
        const cloneFlowNode = await getRepository('FlowNode').save({
          ...(currentFlowNode || node.data.flowNode),
          session_id: newSession.id,
          id: undefined,
          source_type: entityName,
          source_id: cloneEntity.id,
        })
        newFlowNodeIDMap.set(`${node.id}`, cloneFlowNode.id)
        return {
          entityName,
          entity: cloneEntity,
          node: cloneFlowNode,
        }
      } else if (!newFlowNodeIDMap.has(`${node.id}`)) {
        const currentFlowNode = await getRepository('FlowNode').findOne({
          where: {
            id: node.data.flowNode.id,
          },
        })
        const cloneFlowNode = await getRepository('FlowNode').save({
          ...(currentFlowNode || node.data.flowNode),
          node_type: node.type as FlowNodeTypeEnum,
          session_id: newSession.id,
          id: undefined,
        })
        newFlowNodeIDMap.set(`${node.id}`, cloneFlowNode.id)
        return {
          node: cloneFlowNode,
        }
      }
    },
    [],
  )

  const createStandaloneSession = useCallback(
    async (
      node: Node<DefaultNodeData>,
      options: {
        name?: string
        connections: {
          node: Node<DefaultNodeData>
          connections: Connection[]
          connectedNodes?: Node<DefaultNodeData>[]
        }[]
      },
    ) => {
      try {
        if (!currentSession) {
          throw new Error('No current session')
        }
        setLoading(true)
        const standaloneSession = await getRepository('Session').save({
          type: SessionTypeEnum.StandaloneApp,
          name: options.name || (currentSession?.name ? `${currentSession.name}` : 'Standalone'),
          status: SessionStatusEnum.Started,
          passphrase: currentSession.passphrase,
        })
        if (!standaloneSession) {
          throw new Error('Failed create standalone session')
        }
        const newEntityIDMap = new Map<string, string>()
        const newFlowNodeIDMap = new Map<string, string>()
        // Clone node
        const mainNodeInfo = await cloneNode(
          standaloneSession,
          node,
          newEntityIDMap,
          newFlowNodeIDMap,
        )
        if (!mainNodeInfo) {
          throw new Error('Failed to clone main node')
        }
        await getRepository('Session').update(standaloneSession.id, {
          main_node_id: mainNodeInfo.node.id,
          main_source_id: mainNodeInfo?.entity ? mainNodeInfo.entity.id : undefined,
          main_source_type: mainNodeInfo.entityName ? mainNodeInfo.entityName : undefined,
        })
        // Clone connected nodes
        for (const { node, connectedNodes } of options.connections) {
          await cloneNode(standaloneSession, node, newEntityIDMap, newFlowNodeIDMap)
          // Clone Connected Nodes
          if (connectedNodes) {
            for (const connectedNode of connectedNodes) {
              await cloneNode(standaloneSession, connectedNode, newEntityIDMap, newFlowNodeIDMap)
            }
          }
        }
        // Clone connections
        for (const { connections } of options.connections) {
          for (const connection of connections) {
            const sourceId = newFlowNodeIDMap.get(`${connection.source}`)
            const targetId = newFlowNodeIDMap.get(`${connection.target}`)
            if (!sourceId || !targetId) {
              throw new Error('Failed to get connected flow node id')
            }
            await getRepository('FlowEdge').save({
              source: sourceId,
              target: targetId,
              sourceHandle: connection.sourceHandle,
              targetHandle: connection.targetHandle,
              session_id: standaloneSession.id,
            })
          }
        }
        getLatestApplications()

        navigate(getRouteURL('application', { applicationId: standaloneSession.id }))
        return true
      } finally {
        setLoading(false)
      }
    },
    [cloneNode, currentSession, getLatestApplications, navigate],
  )

  return {
    loading,
    createStandaloneSession,
  }
}
