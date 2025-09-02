import { BaseNodeHandler, FlowExecutionContext } from 'src/services/flow-machine/types'
import type { FlowNode } from 'src/services/database/types'
import {
  FlowNodePlaceholder,
  FlowNodeTypeEnum,
  FlowNodePlaceholderTypeEnum,
  VectorDatabase,
  VectorDatabaseStorageEnum,
  Prompt,
  CSVData,
  JSONData,
  JSONLData,
} from 'src/services/database/types'
import { BaseMessage, SystemMessage } from '@langchain/core/messages'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from '@langchain/core/documents'
import { getStorageDataSource } from 'src/utils/vector-storage'
import { embeddingHandler } from 'src/handlers/embedding-handler'
import { logError, logWarn } from 'src/utils/logger'

interface NodeDataWithEntity {
  entity?: unknown
}

interface PlaceholderResult {
  placeholder: FlowNodePlaceholder
  injectedMessages: BaseMessage[]
  vectorContext: Document[]
}

export class PlaceholderNodeHandler extends BaseNodeHandler<PlaceholderResult, void> {
  nodeType = FlowNodeTypeEnum.PlaceHolder

  /**
   * Prepare phase - process placeholder based on type (VECTOR_DATABASE_RETREIVER)
   * Following handlePlaceholders logic from use-create-message.ts
   */
  async prepare(node: FlowNode, context: FlowExecutionContext): Promise<PlaceholderResult> {
    const nodeData = node.data as NodeDataWithEntity
    const placeholderRecord = nodeData?.entity as FlowNodePlaceholder

    if (!placeholderRecord) {
      throw new Error(`No Placeholder entity found for node: ${node.id}`)
    }

    const injectedMessages: BaseMessage[] = []
    const vectorContext: Document[] = []

    switch (placeholderRecord.placeholder_type) {
      case FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER: {
        const sourceNodes = context.getConnectedNodes(node.id, 'source')
        const allNodes = context.getConnectedNodes(node.id)

        const vectorNodeInAll = allNodes.find(
          (n) => n.node_type === FlowNodeTypeEnum.VectorDatabase,
        )
        const promptNodeInAll = allNodes.find((n) => n.node_type === FlowNodeTypeEnum.Prompt)

        let connectedNodes = sourceNodes
        if (vectorNodeInAll || promptNodeInAll) {
          connectedNodes = allNodes
        }

        const vectorNode = connectedNodes.find(
          (n) => n.node_type === FlowNodeTypeEnum.VectorDatabase,
        )
        const vector = vectorNode
          ? ((vectorNode.data as NodeDataWithEntity)?.entity as VectorDatabase)
          : undefined

        const promptNode = connectedNodes.find((n) => n.node_type === FlowNodeTypeEnum.Prompt)
        const prompt = promptNode
          ? ((promptNode.data as NodeDataWithEntity)?.entity as Prompt)
          : undefined

        if (!prompt || !vector || !vectorNode) {
          logWarn(`⚠️ [PlaceholderHandler] Missing required connections:`, {
            hasPrompt: !!prompt,
            hasVector: !!vector,
            hasVectorNode: !!vectorNode,
          })
          break
        }

        // Extract metadata parameters (following exact logic from use-create-message.ts)
        const k = placeholderRecord.metadata?.k ? +placeholderRecord.metadata?.k : 1
        let minimalScore = placeholderRecord.metadata?.minimalScore
          ? +placeholderRecord.metadata?.minimalScore
          : undefined
        if (minimalScore && minimalScore > 1) {
          minimalScore = minimalScore / 100
        }

        // Get user message content from session state
        const humanMessageContent = (context.getState('humanMessageContent') ||
          context.getState('userInput')) as string

        if (!humanMessageContent) {
          logWarn(
            `⚠️ [PlaceholderHandler] No humanMessageContent or userInput found in context state`,
          )
          break
        }

        // Initialize documents array for similarity search results
        const documents: Array<[Document, number]> = []

        // Handle different vector storage types (exact logic from use-create-message.ts)

        if (vector.storage === VectorDatabaseStorageEnum.DataNode) {
          // Get connected data source nodes
          const dataConnectedNodes = context.getConnectedNodes(vectorNode.id, 'target')

          const dataSourceNode = dataConnectedNodes.find(
            (n) =>
              n.node_type &&
              [FlowNodeTypeEnum.JSONLData, FlowNodeTypeEnum.CSVData].includes(
                n.node_type as FlowNodeTypeEnum,
              ),
          )
          const dataSource = (dataSourceNode?.data as NodeDataWithEntity)?.entity as
            | CSVData
            | JSONData
            | JSONLData

          if (!dataSource) {
            logWarn(`⚠️ [PlaceholderHandler] No data source found for DataNode storage`)
            break
          }

          // Get embedding entity and confirmPassphrase function from context
          const embeddingEntity = context.getState('embeddingEntity') as
            | FlowNodePlaceholder
            | undefined

          try {
            // Use embedding handler for similarity search

            const searchResults = await embeddingHandler.similaritySearchWithScore(
              embeddingEntity,
              {
                database: {
                  databaseId: vector.id,
                  dataSourceId: dataSource.id,
                  dataSourceType: getStorageDataSource(dataSource),
                },
              },
              humanMessageContent,
              k,
            )

            if (searchResults) {
              documents.push(...searchResults)
            }
          } catch (error) {
            logError(`❌ [PlaceholderHandler] Similarity search failed:`, error)
          }
        } else {
          // Handle other storage types (Database, IndexedDB)
          const embeddingEntity = context.getState('embeddingEntity') as
            | FlowNodePlaceholder
            | undefined
          // const confirmPassphrase = context.getState('confirmPassphrase') as
          //   | (() => Promise<void>)
          //   | undefined

          try {
            // Use embedding handler for similarity search
            const searchResults = await embeddingHandler.similaritySearchWithScore(
              embeddingEntity,
              {
                database: {
                  databaseId: vector.id,
                },
              },
              humanMessageContent,
              k,
            )

            if (searchResults) {
              documents.push(...searchResults)
            }
          } catch (error) {
            logError(`❌ [PlaceholderHandler] Similarity search failed:`, error)
          }
        }

        if (!documents.length) {
          logWarn(`⚠️ [PlaceholderHandler] No documents found, skipping message injection`)
          break
        }

        // Create prompt template (exact logic from use-create-message.ts)
        const template = new PromptTemplate({
          template: prompt.content,
          inputVariables: ['context'],
        })

        // Format context content with score filtering
        const filteredDocs = !minimalScore
          ? documents
          : documents.filter(([, score]) => score >= minimalScore)

        const contextContent = filteredDocs.map(([doc]) => doc.pageContent).join('\n')

        // Create and add AI message with formatted context
        const formattedMessage = await template.format({
          context: contextContent,
        })

        injectedMessages.push(new SystemMessage(formattedMessage))

        // Store vector context for potential use by other nodes
        vectorContext.push(...documents.map(([doc]) => doc))

        break
      }

      default:
        logWarn(
          `⚠️ [PlaceholderHandler] Unsupported placeholder type: ${placeholderRecord.placeholder_type}`,
        )
    }

    const result: PlaceholderResult = {
      placeholder: placeholderRecord,
      injectedMessages,
      vectorContext,
    }

    // Store injected messages in context state (following use-create-message.ts pattern)
    if (injectedMessages.length > 0) {
      const existingMessages = (context.getState('injectedMessages') as BaseMessage[]) || []
      const updatedMessages = [...existingMessages, ...injectedMessages]
      context.setState('injectedMessages', updatedMessages)
    }

    // Store vector context for potential access by ThreadNode
    if (vectorContext.length > 0) {
      context.setState('vectorContext', vectorContext)
    }

    return result
  }

  /**
   * Execute phase - no action needed for placeholder nodes
   */
  async execute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // Placeholder nodes don't need to execute anything, they just prepare context during prepare phase
  }

  validate(_node: FlowNode): boolean {
    const nodeData = _node.data as NodeDataWithEntity | undefined
    const placeholderRecord = nodeData?.entity as FlowNodePlaceholder | undefined

    // Validate that we have a placeholder entity with required fields
    const isValid = Boolean(
      placeholderRecord?.id &&
        placeholderRecord?.placeholder_type &&
        placeholderRecord.placeholder_type ===
          FlowNodePlaceholderTypeEnum.VECTOR_DATABASE_RETREIVER,
    )
    return isValid
  }

  async onBeforeExecute(_node: FlowNode, _context: FlowExecutionContext): Promise<void> {
    // No setup needed before execution
  }

  async onAfterExecute(
    _node: FlowNode,
    _result: PlaceholderResult,
    _context: FlowExecutionContext,
  ): Promise<void> {
    // No cleanup needed after execution
  }
}
