import chunk from 'lodash/chunk'
import {
  PretrainedOptions,
  FeatureExtractionPipeline,
  FeatureExtractionPipelineOptions,
  pipeline,
  layer_norm,
} from '@huggingface/transformers'
import { init, listenForMessages, type BaseMessagePayload } from 'src/utils/worker-base'
import { logDebug, logInfo, logWarn } from 'src/utils/logger'

let extractor: FeatureExtractionPipeline | undefined
const SERVICE_NAME = 'EMBEDDING_WORKER'
const DEFAULT_DIM = 768

type MessagePayload = (
  | {
      type: 'embedding'
      payload: [string[], FeatureExtractionPipelineOptions]
    }
  | {
      type: 'load'
      payload: [string, PretrainedOptions]
    }
) &
  BaseMessagePayload

let processing: ReturnType<typeof handleIndexProgress> | undefined

async function handleIndexProgress(
  chunk: string[],
  options: FeatureExtractionPipelineOptions,
  actions?: { splitRetry?: boolean },
): Promise<number[][]> {
  if (!extractor) {
    throw new Error('Pipe is not ready yet.')
  }
  try {
    let embeddings = await extractor(chunk, options)
    embeddings = layer_norm(embeddings, [embeddings.dims[1]])
      .slice(null, [0, DEFAULT_DIM])
      .normalize(2, -1)
    const result = (await embeddings.tolist()).map((item: number[]) => {
      if (item?.length < DEFAULT_DIM || item.some((i) => isNaN(i))) {
        logWarn(`[${SERVICE_NAME}] NaN values detected in embeddings:`, chunk)
        return new Array(DEFAULT_DIM).fill(0.0)
      }
      return item
    })
    return result
  } catch (error) {
    logWarn(`[${SERVICE_NAME}] Error processing chunk:`, chunk, error)
    if (!actions?.splitRetry) {
      const subResults: number[][] = []
      for (const str of chunk) {
        subResults.push(...(await handleIndexProgress([str], options, { splitRetry: true })))
      }
      return subResults
    }
    return chunk.map(() => new Array(DEFAULT_DIM).fill(0.0))
  }
}

async function handleIndex(chunk: string[], options: FeatureExtractionPipelineOptions) {
  if (!extractor) {
    throw new Error('Pipe is not ready yet.')
  }
  if (processing) {
    await processing
    await new Promise((resolve) => setTimeout(resolve, 100))
    logDebug(`[${SERVICE_NAME}] Waiting for previous processing to finish`)
  }
  processing = handleIndexProgress(chunk, options)
  return processing
}

async function handlePayload(data: MessagePayload) {
  logDebug(`[${SERVICE_NAME}][Embedding worker received message]`, data, data.type)
  switch (data.type) {
    case 'load': {
      const [model, options] = data.payload
      logDebug(`[${SERVICE_NAME}] Loading model:`, model, options, extractor?.model)
      if (!extractor || extractor.model.name !== model) {
        extractor = await pipeline('feature-extraction', model, {
          ...options,
          device: 'webgpu',
        })
      }
      return true
    }
    case 'embedding': {
      if (!extractor) {
        throw new Error('Pipe is not ready yet.')
      }
      logDebug(`[${SERVICE_NAME}] Embedding:`, data.payload)
      const [strings, options] = data.payload
      const chunks = chunk(strings, 20)
      const result: ReturnType<Awaited<ReturnType<typeof extractor>>['tolist']> = []
      for (const chunk of chunks) {
        logDebug(`[${SERVICE_NAME}] Processing chunk:`, chunk)
        const embeddings = await handleIndex(chunk, options)
        result.push(...embeddings)
      }
      return result
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(SERVICE_NAME, handlePayload)

logInfo(`[${SERVICE_NAME}] Embedding worker initialized`)

init(SERVICE_NAME)
