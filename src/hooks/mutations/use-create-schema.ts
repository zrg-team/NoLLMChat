import { Node } from '@xyflow/react'
import { useCallback, useState } from 'react'
import { SchemaItemType } from 'src/components/molecules/CreateSchemaCard/Field/type'
import { getRepository } from 'src/services/database'
import { FlowNodeTypeEnum, SchemaItem } from 'src/services/database/types'
import { useFlowState } from 'src/states/flow'
import { useSessionState } from 'src/states/session'
import { EntityType } from 'src/utils/orm-type'
import { generateUUID } from 'src/utils/uuid'

export const useCreateSchema = () => {
  const sessionId = useSessionState((state) => state.currentSession?.id)

  const [loading, setLoading] = useState(false)
  const createOrUpdateFlowNode = useFlowState((state) => state.createOrUpdateFlowNode)

  const toSchemaItem = useCallback(
    (
      schemaId: string,
      input: SchemaItemType[],
      result: EntityType<SchemaItem>[],
      parent?: string,
    ) => {
      if (!sessionId) {
        return
      }
      for (const item of input) {
        if (item.data?.length) {
          toSchemaItem(schemaId, item.data, result, item.id)
        } else {
          result.push({
            name: item.name,
            type: item.type,
            enum: item.enum ? JSON.stringify(item.enum) : '',
            required: item.required,
            description: item.description,
            id: item.id || generateUUID(),
            parent_id: parent,
            schema_id: schemaId,
            session_id: sessionId,
          })
        }
      }
      return result
    },
    [sessionId],
  )

  const createSchema = useCallback(
    async (source: Node, input: SchemaItemType[]) => {
      try {
        if (!source || !sessionId) {
          throw new Error('Source or Session not found')
        }
        setLoading(true)
        // This is node thead replaced with message node
        const initialX = source.position?.x || 0
        const initialY = (source.position?.y || 0) + (source.measured?.height || 0)

        const schema = await getRepository('Schema').save({
          name: 'Untitled Schema',
          session_id: sessionId,
        })
        if (!schema) {
          throw new Error('Failed to save schema')
        }

        const schemaItems = toSchemaItem(schema.id, input, [], undefined)
        if (!schemaItems?.length) {
          throw new Error('Failed to convert schema items')
        }
        await getRepository('SchemaItem').save(schemaItems)
        const promptNode = await createOrUpdateFlowNode({
          source_id: schema.id,
          source_type: 'Schema',
          node_type: FlowNodeTypeEnum.Schema,
          x: initialX,
          y: initialY + 20,
        })
        if (!promptNode) {
          throw new Error('Failed to save schema node')
        }
      } finally {
        setLoading(false)
      }
    },
    [sessionId, toSchemaItem, createOrUpdateFlowNode],
  )

  return {
    loading,
    createSchema,
  }
}
