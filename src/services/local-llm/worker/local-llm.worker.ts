import { init, listenForMessages } from 'src/utils/worker-base'
import { logDebug, logInfo } from 'src/utils/logger'

import { MessagePayload } from './type'
import { handleWebLLM } from './webllm.worker'
import { handleWllama } from './wllama.worker'

async function handlePayload(data: MessagePayload) {
  logDebug('[LLM worker received message]', data, data.type)
  if (data.provider === 'webllm') {
    return handleWebLLM(data)
  } else if (data.provider === 'wllama') {
    return handleWllama(data)
  }
  throw new Error('NOT_IMPLEMENTED')
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(handlePayload, { timeout: 10000000 })

logInfo('Local LLM worker initialized')

init()
