import type { PretrainedOptions, FeatureExtractionPipelineOptions } from '@huggingface/transformers'
import { Embeddings, type EmbeddingsParams } from '@langchain/core/embeddings'
import { chunkArray } from '@langchain/core/utils/chunk_array'
import { sendToWorker, WOKER_INIT_MESSAGE_ID } from 'src/utils/worker-base'
import { nanoid } from 'nanoid'
import { getEmptyPromise } from 'src/utils/promise'
import { logWarn } from 'src/utils/logger'

import { worker } from '../worker'

export interface WorkerEmbeddingsParams extends EmbeddingsParams {
  modelName: string
  model: string

  timeout?: number

  batchSize?: number

  stripNewLines?: boolean

  pretrainedOptions?: PretrainedOptions

  pipelineOptions?: FeatureExtractionPipelineOptions
}

export class WorkerEmbeddings extends Embeddings implements WorkerEmbeddingsParams {
  ready = false

  modelName = 'Xenova/all-MiniLM-L6-v2'

  model = 'Xenova/all-MiniLM-L6-v2'

  batchSize = 512

  stripNewLines = true

  timeout?: number

  pretrainedOptions?: PretrainedOptions

  pipelineOptions?: FeatureExtractionPipelineOptions

  EMBEDDING_LOAD_MESSAGE_ID = 'EMBEDDING_LOAD_MESSAGE_ID'

  refProcesses: Map<
    string,
    [promise: Promise<unknown>, (data: unknown) => void, (reason?: unknown) => void]
  > = new Map()

  constructor(fields?: Partial<WorkerEmbeddingsParams>) {
    super(fields ?? {})

    this.modelName = fields?.model ?? fields?.modelName ?? this.model
    this.model = this.modelName
    this.stripNewLines = fields?.stripNewLines ?? this.stripNewLines
    this.timeout = fields?.timeout
    this.pretrainedOptions = fields?.pretrainedOptions ?? {}
    this.pipelineOptions = {
      pooling: 'mean',
      normalize: true,
      ...fields?.pipelineOptions,
    }
    this.initWorker()
  }

  initWorker = () => {
    sendToWorker(worker, 'load', this.EMBEDDING_LOAD_MESSAGE_ID, [
      this.model,
      this.pretrainedOptions,
    ])
    worker.addEventListener('message', this.handleMessages)
    const promiseInfo = getEmptyPromise()
    this.refProcesses.set(this.EMBEDDING_LOAD_MESSAGE_ID, [
      promiseInfo.promise,
      promiseInfo.resolve,
      promiseInfo.reject,
    ])
    return promiseInfo.promise
  }

  handleMessages = (event: MessageEvent<{ messageId: string; type: string; payload: unknown }>) => {
    const messageId = event.data.messageId
    if (messageId === WOKER_INIT_MESSAGE_ID) {
      // inited
    } else if (event.data.type === 'complete' || event.data.type === 'error') {
      const [, resolve, reject] = this.refProcesses.get(messageId) || []
      if (event.data.type === 'complete') {
        resolve?.(event.data.payload)
      } else {
        reject?.(new Error(JSON.stringify(event.data.payload)))
      }
      if (messageId === this.EMBEDDING_LOAD_MESSAGE_ID) {
        this.ready = !!event.data.payload
      }
      this.refProcesses.delete(messageId)
    } else if (event.data.type === 'started') {
      // do nothing
    } else if (event.data.type === 'inprogress') {
      // do nothing
    } else {
      logWarn('Unknown message type', event.data)
    }
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const batches = chunkArray(
      this.stripNewLines ? texts.map((t) => t.replace(/\n/g, ' ')) : texts,
      this.batchSize,
    )

    const batchRequests = batches.map((batch) => this.runEmbedding(batch))
    const batchResponses = await Promise.all(batchRequests)
    const embeddings: number[][] = []

    for (let i = 0; i < batchResponses.length; i += 1) {
      const batchResponse = batchResponses[i]
      for (let j = 0; j < batchResponse.length; j += 1) {
        embeddings.push(batchResponse[j])
      }
    }

    return embeddings
  }

  async embedQuery(text: string): Promise<number[]> {
    const data = await this.runEmbedding([this.stripNewLines ? text.replace(/\n/g, ' ') : text])
    return data[0]
  }

  private runEmbedding = async (texts: string[]) => {
    if (!worker) {
      throw new Error('MISSING WORKER')
    }
    const initProcess = this.refProcesses.get(this.EMBEDDING_LOAD_MESSAGE_ID)
    if (initProcess?.[0]) {
      await initProcess?.[0]
    }
    if (!this.ready) {
      throw new Error('WORKER NOT READY YET')
    }
    return this.caller.call(async () => {
      const messageId = nanoid()
      const promiseInfo = getEmptyPromise(() => {
        sendToWorker(worker, 'embedding', messageId, [texts, this.pipelineOptions])
      })
      this.refProcesses.set(messageId, [
        promiseInfo.promise,
        promiseInfo.resolve,
        promiseInfo.reject,
      ])
      return promiseInfo.promise.then((result) => {
        return result as number[][]
      })
    })
  }
}
