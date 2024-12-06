import {
  PretrainedOptions,
  FeatureExtractionPipeline,
  FeatureExtractionPipelineOptions,
  pipeline,
} from '@huggingface/transformers'
import { init, listenForMessages, type BaseMessagePayload } from 'src/utils/worker-base'
import { logDebug, logInfo } from 'src/utils/logger'

let pipe: FeatureExtractionPipeline | undefined

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

async function handlePayload(data: MessagePayload) {
  switch (data.type) {
    case 'load': {
      const [model, options] = data.payload
      logDebug('Loading model:', model, options)
      if (!pipe || pipe.model.name !== model) {
        pipe = await pipeline('feature-extraction', model, options)
      }
      return true
    }
    case 'embedding': {
      if (!pipe) {
        throw new Error('Pipe is not ready yet.')
      }
      logDebug('Embedding:', data.payload)
      const [strings, options] = data.payload
      const result = await pipe(strings, options)
      return result.tolist()
    }
    default:
      throw new Error('Invalid operation')
  }
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload)

logInfo('Embedding worker initialized')

init()
