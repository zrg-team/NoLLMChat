import { init, listenForMessages } from 'src/utils/worker-base'
import { logDebug, logInfo } from 'src/utils/logger'

import { MessagePayload } from './type'
import { handleWebLLM, SERVICE_NAME } from './webllm.worker'

async function handlePayload(data: MessagePayload) {
  logDebug(`[${SERVICE_NAME}][LLM worker received message]`, data, data.type)
  return handleWebLLM(data)
}

// Listen for messages from the main thread
listenForMessages<MessagePayload>(SERVICE_NAME, handlePayload, { timeout: 10000000 })

logInfo('Local LLM worker initialized')

init(SERVICE_NAME)
